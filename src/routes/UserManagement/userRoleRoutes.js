// routes/userRoleRoutes.js
const express = require('express');
const router = express.Router();
const UserRoleController = require('../../controllers/UserManagement/UserRoleController');

router.post('/', UserRoleController.createUserRole);
router.put('/update/:id', UserRoleController.updateUserRole);
router.post('/getAll', UserRoleController.getAllUserRoles);
router.delete('/:id', UserRoleController.deleteUserRole);
router.get('/:id', UserRoleController.getUserRole);

module.exports = router;