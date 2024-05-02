const UserRole = require('../../models/UserManagement/UserRole');
const UserRolePermissionAssign = require('../../models/UserManagement/Permissions/RolePermissionAssign');

class UserRolePermissionHandleService{
    async assignPermission(roleId, permissionIds){
        try{
            const rolePermission = await UserRolePermissionAssign.findOne({user_role_id: roleId});
            if(rolePermission){
                rolePermission.permission_ids = permissionIds;
                await rolePermission.save();
                return rolePermission;
            }else{
                const newRolePermission = new UserRolePermissionAssign({
                    user_role_id: roleId,
                    permission_ids: permissionIds
                });
                await newRolePermission.save();
                return newRolePermission;
            }
        }catch(error){
            console.error(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }

    async getPermission(req, res){
        res.send('getPermission');
    }
}

module.exports = new UserRolePermissionHandleService();