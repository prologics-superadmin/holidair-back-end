const {validateUserPermission} = require('../../../helpers/validateUserPermission');

async function verifyToken(req, res, next) {
  try {
    const userManagementPermissions = await validateUserPermission(req.user.userId);

    if (!userManagementPermissions.user.readUser) {
        return res.status(401).json({ message: "Permission denied"});
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Permission denied"});
  }
}

module.exports = verifyToken;
