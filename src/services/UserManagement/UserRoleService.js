const UserRole = require("../../models/UserManagement/UserRole");
const { User } = require("../../models/UserManagement/User");
const UserRolePermissionAssign = require("../../models/UserManagement/Permissions/RolePermissionAssign");

class UserRoleService {
  async create(userRole) {
    try {
      const newUserRole = new UserRole(userRole);
      await newUserRole.save();
      return newUserRole;
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      throw new Error("Failed to create user role."); // Throw a new error to propagate the error to the caller
    }
  }

  async update(id, data) {
    try {
      const updatedUserRole = await UserRole.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedUserRole) {
        throw new Error("User role not found");
      }
      return updatedUserRole;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while updating user role");
    }
  }

  async delete(id) {
    try {
      const userRole = await UserRole.findByIdAndDelete(id);
      if (!userRole) {
        throw new Error("User role not found");
      }
      return userRole;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while deleting user role");
    }
  }

  async getById(id) {
    try {
      const userRole = await UserRole.findById(id);
      if (!userRole) {
        throw new Error("User role not found");
      }

      let response = {
        _id: userRole._id,
        role: userRole.role,
        permissions: [],
      };

      const permissions = await UserRolePermissionAssign.findOne({
        user_role_id: id,
      });

      if (permissions) {
        response.permissions = permissions.permission_ids;
      }

      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while getting user role by id");
    }
  }

  async getAll(data) {
    const page = parseInt(data.currentPageIndex) || 1;
    const filters = data.filters || {};

    const itemsPerPage = data.dataPerPage;
    const skip = (page - 1) * itemsPerPage;

    try {
      let query = {};

      if (filters) {
        if (filters.role && filters.role !== "") {
          query.role = { $regex: filters.role, $options: "i" };
        }
      }

      if (data.search && data.search !== "") {
        query.role = { $regex: data.search, $options: "i" };
      }

      const result = await UserRole.find(query)
        .skip(skip)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 })
        .select("-createdAt, -updatedAt, -__v");
      const count = await UserRole.countDocuments(query);

      const refinedData = [];

      for (let item of result) {
        const user_count =
          (await User.countDocuments({ user_role_id: item._id })) || 0;

        refinedData.push({
          _id: item._id,
          name: item.role,
          "USER COUNT": user_count,
          priority: item.ID,
        });
      }

      let response = {};

      if (result.length === 0) {
        response = {
          data: [],
          dataCount: count,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "There are not matching records.",
        };
      } else {
        response = {
          data: refinedData,
          dataCount: count,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "Data returned",
        };
      }

      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while getting user roles");
    }
  }
}

module.exports = new UserRoleService();
