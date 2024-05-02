// routes/userPermissionRoutes.js
const express = require('express');
const router = express.Router();
const UserRolePermissionController = require('../../controllers/UserManagement/UserRolePermissionController');
//role-permissions
// router.get('/', UserPermissionController.getAllUserPermissions);
// router.post('/role-permission-assign', UserPermissionController.assignPermissionToUser);
router.put('/:id', UserRolePermissionController.assignPermission);
router.get('/:id', UserRolePermissionController.getPermission);



module.exports = router;