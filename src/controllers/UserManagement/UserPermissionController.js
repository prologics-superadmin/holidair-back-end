const UserPermissionAssign = require('../../models/UserManagement/Permissions/UserPermissionAssign');
const PermissionCategory = require('../../models/UserManagement/Permissions/PermissionCategory');
const permissionGroup = require('../../models/UserManagement/Permissions/PermissionGroup');
const Permissions = require('../../models/UserManagement/Permissions/Permission');
const permission_checkboxes = require('../../models/UserManagement/Permissions/PermissionCheckBoxes');
const UserPermissionHandleService = require('../../services/UserManagement/UserPermissionHandleService');

class UserPermissionController {
    /**
     * get all permissions and response it with this format
     * 
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getAllUserPermissions(req, res) {
        try{
            const permission = await UserPermissionHandleService.getAllUserPermissions();
            
            await res.json(permission);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    /**
     * Assign new permissions to user.
     * request = {userId : string, permission_ids : Array<string>}
     * 
     * @param  req 
     * @param  res 
     * @returns {Promise<void>} 
     */
    async assignPermissionToUser(req, res) {
        try{
            const assign = await UserPermissionHandleService.assignPermissionToUser(req.body.user_id, req.body.permission_ids);

            res.status(200).json(assign);
        }catch(e){
            res.status(500).json({message: 'Error in assignPermissionToUser'});
        }
    }

    /**
     * Update user permission assign.
     * request = {userId : string, permission_ids : Array<string>}
     * 
     * @param  req
     * @param  res
     * @returns {Promise<void>}
    */
    async updateUserParmissionAssign(req, res) {
        try{
            const data = {
                id: req.params.id,
                ids: req.body.permission_ids
            }

            const result = await UserPermissionHandleService.updateUserParmissionAssign(data);

            res.status(200).json(result);
        }catch(_){
            res.status(500).json({message: 'Error in updateUserParmissionAssign'});
        }
    }

    /**
     * Get assigned user permission by user id.
     * 
     * @param req 
     * @param res 
     * @returns {Promise<void>} 
     */
    async getUserPermissionAssignByUserId(req, res) {
        try{
            const userPermissionAssign = await UserPermissionAssign.findOne({user_id: req.params.user_id});
            if(!userPermissionAssign){
                return res.status(200).json({message: 'No permission assigned to user'});
            }

            const result = await UserPermissionHandleService.getUserPermissionAssignByUserId(req.params.user_id);

            res.status(200).json({message: 'Permission returned', data: result});
        }catch(_){
            console.error(_);
            res.status(500).json({message: 'Error in getUserPermissionAssignByUserId'});
        }
    }
}

module.exports = new UserPermissionController();