const UserRoleService = require('../../services/UserManagement/UserRoleService');

class UserRoleController {
    async createUserRole(req, res) {
        try{
            if(req.body.role == '' || req.body.role == null) return res.status(400).json({error: 'Role Name cannot be empty'});

            const result = await UserRoleService.create(req.body);

            res.json({message: 'User role created successfully', data: result});
        }catch(error){

        }
    }
    
    async updateUserRole(req, res) {
        try{
            if(req.body.role == '' || req.body.role == null) return res.status(400).json({error: 'Role Name cannot be empty'});

            const result = await UserRoleService.update(req.params.id, req.body);
            res.json({message: 'User role updated successfully', data: result});
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
    
    async getAllUserRoles(req, res) {
        try{
            const result = await UserRoleService.getAll(req.body);
            res.json(result);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
    
    async deleteUserRole(req, res) {
        // Delete a user role
    }
    
    async getUserRole(req, res) {
       try{
            const result = await UserRoleService.getById(req.params.id);
            res.json(result);
       }catch(error){
           res.status(500).json({error: error.message});
       }
    }
}

module.exports = new UserRoleController();