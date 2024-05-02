// routes/userPermissionRoutes.js
const express = require('express');
const router = express.Router();
const UserPermissionController = require('../../controllers/UserManagement/UserPermissionController');

// router.post('/', UserPermissionController.createUserPermission);
// router.post('/update', UserPermissionController.updateUserPermission);
router.get('/', UserPermissionController.getAllUserPermissions);
// router.get('/:userId', UserController.getUserById);
// router.patch('/:userId', UserController.updateUser);

router.post('/user-permission-assign', UserPermissionController.assignPermissionToUser);
router.put('/user-permission-assign/:id', UserPermissionController.updateUserParmissionAssign);
// router.delete('/user-permission-assign/:id', UserPermissionController.deleteUserPermissionAssign);
router.get('/user-permission-assign/:user_id', UserPermissionController.getUserPermissionAssignByUserId);

// router.post('/user-role-permission-assign', UserRolePermissionAssignController.createUserRolePermissionAssign);
// router.put('/user-role-permission-assign/:id', UserRolePermissionAssignController.updateUserRolePermissionAssign);
// router.delete('/user-role-permission-assign/:id', UserRolePermissionAssignController.deleteUserRolePermissionAssign);
// router.get('/user-role-permission-assign/:user_role_id', UserRolePermissionAssignController.getUserRolePermissionAssignByUserRoleId);


module.exports = router;