const UserPermissionAssign = require("../models/UserManagement/Permissions/UserPermissionAssign");
const permissionConfig = require("../configs/userPermisions.json");
const { Page } = require("puppeteer");

async function validateAllUserPermission(userId) {
  let permissionBluePrint = {
    user: {
      createUser: false,
      readUser: false,
      updateUser: false,
      deleteUser: false,
    },
    role: {
      createRole: false,
      readRole: false,
      updateRole: false,
      deleteRole: false,
    },
    permission: {
      createPermission: false,
      readPermission: false,
      updatePermission: false,
      deletePermission: false,
    },
    defect: {
      createDefect: false,
      readDefect: false,
      updateDefect: false,
      deleteDefect: false,
    },
    rim: {
      createRim: false,
      readRim: false,
      updateRim: false,
      deleteRim: false,
    },
  };

  const permissions = await UserPermissionAssign.findOne({
    user_id: userId,
  }).select("permission_ids -_id");

  if (permissions === null || permissions.length === 0) {
    return permissionBluePrint;
  }

  const permissionIds = await permissions.permission_ids.map((permission) =>
    permission.toString(),
  );

  const updatePermission = (permissionType, action, masterPermission) => {
    // const actionCapitalized = action.charAt(0).toUpperCase() + action.slice(1);
    if (permissionIds.includes(permissionConfig[masterPermission][action])) {
      permissionBluePrint[permissionType][
        `${action}${permissionType.charAt(0).toUpperCase() + permissionType.slice(1)}`
      ] = true;
    }
  };

  for (let action of ["create", "read", "update", "delete"]) {
    updatePermission("user", action, "USER MANAGEMENT");
    updatePermission("role", action, "ROLE MANAGEMENT");
    updatePermission("permission", action, "PERMISSION MANAGEMENT");
    updatePermission("defect", action, "DEFECT MANAGEMENT");
    updatePermission("rim", action, "RIM SIZE");
  }

  return permissionBluePrint;
}

async function validateUserPermission(userId) {
  let permissionBluePrint = {
    user: {
      createUser: false,
      readUser: false,
      updateUser: false,
      deleteUser: false,
    },
    role: {
      createRole: false,
      readRole: false,
      updateRole: false,
      deleteRole: false,
    },
  };

  const permissions = await UserPermissionAssign.findOne({
    user_id: userId,
  }).select("permission_ids -_id");
  const permissionIds = permissions.permission_ids.map((permission) =>
    permission.toString(),
  );

  const updatePermission = (permissionType, action, masterPermission) => {
    // const actionCapitalized = action.charAt(0).toUpperCase() + action.slice(1);
    if (permissionIds.includes(permissionConfig[masterPermission][action])) {
      permissionBluePrint[permissionType][
        `${action}${permissionType.charAt(0).toUpperCase() + permissionType.slice(1)}`
      ] = true;
    }
  };

  ["create", "read", "update", "delete"].forEach((action) => {
    updatePermission("user", action, "USER MANAGEMENT");
    updatePermission("role", action, "ROLE MANAGEMENT");
  });

  return permissionBluePrint;
}

exports.validateUserPermission = validateUserPermission;
exports.validateAllUserPermission = validateAllUserPermission;
