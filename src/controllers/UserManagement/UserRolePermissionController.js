const UserRolePermissionHandleService = require('../../services/UserManagement/RolePermissionHandleService');

class UserRolePermissionController{
    async assignPermission(req, res){
        try{
            const roleId = req.params.id;
            const permissionIds = req.body.permission_ids;
            const result = await UserRolePermissionHandleService.assignPermission(roleId, permissionIds);
            res.json({message: 'Permission assigned successfully', data: result});
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getPermission(req, res){
        res.send('getPermission');
    }
}

module.exports = new UserRolePermissionController();