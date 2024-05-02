const Permissions = require('../../models/UserManagement/Permissions/Permission');
const PermissionCategory = require('../../models/UserManagement/Permissions/PermissionCategory');
const PermissionGroup = require('../../models/UserManagement/Permissions/PermissionGroup');
const PermissionCheckBoxes = require('../../models/UserManagement/Permissions/PermissionCheckBoxes');
const RolePermissionAssign = require('../../models/UserManagement/Permissions/RolePermissionAssign');
const UserPermissionAssign = require('../../models/UserManagement/Permissions/UserPermissionAssign');
const {User} = require('../../models/UserManagement/User');

class UserPermissinHandleService {
    /**
     * get all permissions and response it with this format
     * 
     * @returns {Promise<void>}
     */
    async getAllUserPermissions() {
        try{
            const permissionCategories = await PermissionCategory.find();
            const permissionGroups = await PermissionGroup.find();
            const permissionCheckBoxes = await PermissionCheckBoxes.find();
            const permissions = await Permissions.find();

            const response = {
                permission_type: [

                ]
            }

            permissionCategories.forEach((permissionCategory) => {
                response.permission_type.push({
                    permission: permissionCategory.category,
                    category_id: permissionCategory._id,
                    permission_grp: []
                })
            })

            permissionGroups.forEach((permissionGroup) => {
                response.permission_type.forEach((permissionType) => {
                    if(permissionType.category_id.equals(permissionGroup.permission_category_id)){
                        permissionType.permission_grp.push({
                            group_name: permissionGroup.group,
                            group_id: permissionGroup._id,
                            permissions: []
                        })
                    }
                })
            });

            permissions.forEach((permission) => {
                response.permission_type.forEach((permissionType) => {
                    permissionType.permission_grp.forEach((permissionGroup) => {
                        if(permissionGroup.group_id.equals(permission.permission_group_id)){
                            permissionGroup.permissions.push({
                                name: permission.permission,
                                permission_id: permission._id,
                                permissions_checkboxs: []
                            })
                        }
                    })
                })
            })

            permissionCheckBoxes.forEach((permissionCheckBox) => {
                response.permission_type.forEach((permissionType) => {
                    permissionType.permission_grp.forEach((permissionGroup) => {
                        permissionGroup.permissions.forEach((permission) => {
                            if(permission.permission_id.equals(permissionCheckBox.permissionId)){
                                permission.permissions_checkboxs.push({
                                    permission_name: permissionCheckBox.permission_name,
                                    _id: permissionCheckBox._id
                                })
                            }
                        })
                    })
                })
            })
            
            return {data: [response], message: 'success'};
        }catch(error){
            console.error(error);
            throw new Error('Error occurred while getting user permissions');
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
    async assignPermissionToUser(userId, permission_ids) {
        try{
            const userPermissionAssign = await UserPermissionAssign.findOneAndUpdate({userId, permission_ids});

            if(!userPermissionAssign){
                const newUserPermissionAssign = new UserPermissionAssign({user_id: userId, permission_ids});
                await newUserPermissionAssign.save();
                return {message: "Permission assigned to user"}
            }

            return {message: "Permission assigned to user"}
        }catch(e){
            throw new Error('Error occurred while assigning permission to user');
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
    async updateUserParmissionAssign(data) {
        try{
            const permissionAssign = await UserPermissionAssign.findOneAndUpdate({user_id: data.id}, {permission_ids: data.ids}, {new: true, upsert: true});
            if(!permissionAssign){
                const newUserPermissionAssign = new UserPermissionAssign({user_id: data.user_id, permission_ids : req.body.permission_ids});
                await newUserPermissionAssign.save();
                return res.status(200).json({message: 'Permission assigned to user'});
            }

            return {message: 'Permission assigned to user'};
        }catch(_){
            console.error(_);
            throw new Error('Error occurred while updating user permission assign');
        }
    }

    /**
     * Get assigned user permission by user id.
     * 
     * @param req 
     * @param res 
     * @returns {Promise<void>} 
     */
    async getUserPermissionAssignByUserId(id) {
        try{
            const user = await User.findOne({_id: id});
            if(!user){
                throw new Error('User not found');
            }

            let response = {
                userpermissions: [],
                rolepermissions: []
            }

            const userPermissionAssign = await UserPermissionAssign.findOne({user_id: id});

            if(userPermissionAssign){
                response.userpermissions = userPermissionAssign.permission_ids;
            }
            
            // const userRole = user.user_role_id;
            // let rolePermissionAssign = await RolePermissionAssign.findOne({user_role_id: userRole});
            
            // if(rolePermissionAssign){
            //     response.rolepermissions = rolePermissionAssign.permission_ids;
            // }

            return response.userpermissions;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}

module.exports = new UserPermissinHandleService();