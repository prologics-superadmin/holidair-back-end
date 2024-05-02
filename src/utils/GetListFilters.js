function GetAllIds(data) {
  let ids = [];
  data.forEach(obj => {
    ids.push(obj._id); // Add _id of the current object
    if (obj.subUsers && obj.subUsers.length > 0) {
      // If subUsers array exists and is not empty, recursively call getAllIds
      ids = ids.concat(GetAllIds(obj.subUsers));
    }
  });
  return ids;
}

async function fetchCategories(model, search_key, search, parentUUID = "ROOT", visited = new Set()) {
  const query = { mapping: parentUUID, is_deleted: false };
  if (search) {
    query["$or"] = search_key.map(key => ({
      [key]: { $regex: search, $options: "i" }
    }));
  }
  const categories = await model.find(query);

  return await Promise.all(categories.map(async (category) => {
    if (visited.has(category.UUID)) {
      // If this category has already been visited, skip it
      return null;
    }
    visited.add(category.UUID);
    const subCategories = await fetchCategories(model, search_key, null, category.UUID, visited);
    return { ...category.toObject(), subCategories };
  }));
}

async function GetTreeFilters(model, data, search_key) {
  try {
    const search = data.search;
    return await fetchCategories(model, search_key, search);
  } catch (error) {
    throw error;
  }
}

async function fetchUsersTree(model, search_key, search, parentID = "ROOT", visited = new Set()) {
  const query = { mapping: parentID, is_deleted: false };
  if (search) {
    query["$or"] = search_key.map(key => ({
      [key]: { $regex: search, $options: "i" }
    }));
  }
  const usersLst = await model.find(query);

  return await Promise.all(usersLst.map(async (userData) => {
    if (visited.has(userData._id)) {
      // If this userData has already been visited, skip it
      return null;
    }
    visited.add(userData._id);
    const subUsers = await fetchUsersTree(model, search_key, null, userData._id, visited);
    return { ...userData.toObject(), subUsers };
  }));
}

async function GetListFilters(model, data, search_key) {
  const page = parseInt(data.currentPageIndex) || 1;
  const filters = data.filters || {};
  const search = data.search;
  const itemsPerPage = data.dataPerPage || 10;
  const skip = (page - 1) * itemsPerPage;
  const selectColumns = "UUID name street mobile discount";
  try {
    const query = { ...filters };
    if (search) {
      query["$or"] = search_key.map(key => ({
        [key]: { $regex: search, $options: "i" }
      }));
    }
    const result = await model.find(query)
      .select(selectColumns)
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });
    const count = await model.countDocuments(query);

    let response = {};

    if (count <= 0) {
      response = {
        data: [],
        dataCount: 0,
        currentPaginationIndex: page,
        dataPerPage: 20,
        message: "There are not matching records.",
      };
    } else {
      response = {
        data: result,
        dataCount: count,
        currentPaginationIndex: page,
        dataPerPage: itemsPerPage,
        message: "Data Returned.",
      };
    }

    return response;
  } catch (error) {
    throw error;
  }
}

async function GetTreeUsers(model, data, search_key, parentID = "ROOT") {
  try {
    const search = data.search;
    return await fetchUsersTree(model, search_key, search, parentID);
  } catch (error) {
    throw error;
  }
}


async function fetchDocTree(model, search_key, search, parentID = "ROOT", visited = new Set()) {
  const query = { mapping: parentID, is_deleted: false };
  if (search) {
    query["$or"] = search_key.map(key => ({
      [key]: { $regex: search, $options: "i" }
    }));
  }
  const usersLst = await model.find(query);

  return await Promise.all(usersLst.map(async (userData) => {
    if (visited.has(userData.UUID)) {
      // If this userData has already been visited, skip it
      return null;
    }
    visited.add(userData.UUID);
    const subCategories = await fetchDocTree(model, search_key, null, userData.UUID, visited);
    return { ...userData.toObject(), subCategories };
  }));
}

async function GetTreeForDoc(model, data, search_key, parentID = "ROOT") {
  try {
    const search = data.search;
    return await fetchDocTree(model, search_key, search, parentID);
  } catch (error) {
    throw error;
  }
}

async function getHierarchyUntilRoot(model, UUID) {
  const category = await model.findOne({ UUID });
  if (!category) return '';
  if (category.mapping === 'ROOT') return category.name;
  const parentHierarchy = await getHierarchyUntilRoot(model, category.mapping);
  return `${parentHierarchy} > ${category.name}`;
};

exports.getHierarchyUntilRoot = getHierarchyUntilRoot;
exports.GetListFilters = GetListFilters;
exports.GetTreeFilters = GetTreeFilters;
exports.GetTreeUsers = GetTreeUsers;
exports.GetTreeForDoc = GetTreeForDoc;
exports.GetAllIds = GetAllIds;
