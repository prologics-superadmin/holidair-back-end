const { User, validate } = require("../../models/UserManagement/User");
const mongoose = require("mongoose");
const RolePermissionAssign = require("../../models/UserManagement/Permissions/RolePermissionAssign");
const UserPermissionHandleService = require("./UserPermissionHandleService");
const bcrypt = require("bcrypt");
const UserRole = require("../../models/UserManagement/UserRole");

/**
 * @class AuthServices
 * All the user related services are defined here.
 *
 *
 * @method newUser
 */
class AuthServices {
  /**
   * @method newUser
   * Create and validate a new user or employee.
   *
   * @param userData
   * @returns {Promise<{user: User}>}
   */
  async newUser(userData) {
    try {
      // const { error } = validate(userData);
      // if (error) throw error.details[0].message;
      // Find the role based on user_role_id
      let userRol = await UserRole.findOne({ role: userData.user_role_id });

      if (userRol) {
      } else {
        userRol = await UserRole.create({
          role: "Customer",
          status: true,
        });
      }

      // Assign the found or newly created role's ID to userData.user_role_id
      userData.user_role_id = userRol._id;

      const isEmailExist = await User.findOne({ email: userData.email });
      if (isEmailExist) throw "Email already exists";

      const isUsernameExist = await User.findOne({
        user_name: userData.user_name,
      });
      if (isUsernameExist) throw "Username already exists";

      const encryptPassword = await bcrypt.hash(userData.password, 10);
      userData.password = encryptPassword;

      // let permissions = [];
      // const userRolePermissions = await RolePermissionAssign.findOne({
      //   user_role_id: userData.user_role_id,
      // });
      // if (userRolePermissions) permissions = userRolePermissions.permission_ids;

      const user = new User(userData);
      await user.save();

      return { user: user };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method getUserById
   * Get a user by its id.
   *
   * @param {string} userId
   * @returns {Promise<{user: User}>}
   */
  async getUserById(userId) {
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) throw "User not found.";
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update User by Id
   *
   * @param {string} id
   * @param {object} data
   * @returns {Promise<{message: string}>}
   */
  async updateUserById(id, data) {
    try {
      const user = await User.findByIdAndUpdate(id, data, { new: true });
      if (!user) throw "User not found";

      return { message: "User updated" };
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while updating user");
    }
  }

  async updateBulkUserById(idLst, data) {
    try {
      const users = await User.updateMany(
        { _id: { $in: idLst } },
        { $set: data }
      );
      if (!users) throw "Users not found";
      return { message: "Users updated" };
    } catch (error) {
      console.error(error);
      throw new Error("Error occurred while updating user");
    }
  }

  async searchUser(id) {
    const userChainlst = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId("660ccfc48788dfa581e6fd5e"),
        },
      }, // Match the starting user
      {
        $graphLookup: {
          from: "users", // Collection name
          startWith: "$_id", // Field to start with
          connectFromField: "_id", // Field to connect from
          connectToField: "mapping", // Field to connect to
          as: "userChain", // Output array field
          maxDepth: 10, // Set the maximum depth to prevent infinite loops
        },
      },
      {
        $project: {
          _id: 0,
          userChain: {
            $reduce: {
              input: "$userChain",
              initialValue: ["$_id"],
              in: { $concatArrays: ["$$value", ["$$this._id"]] },
            },
          },
        },
      },
    ]);

    console.log("userChainlst : ", userChainlst);
    return userChainlst;
    // const userChaind = await User.aggregate([
    //     { $match: { _id: "ObjectId(660ccfc48788dfa581e6fd5e)" } },
    //     {
    //         $graphLookup: {
    //             from: 'User',
    //             startWith: '$_id',
    //             connectFromField: '_id',
    //             connectToField: 'mapping',
    //             as: 'userChain',
    //             maxDepth: 10 // Set the maximum depth to prevent infinite loops
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 0,
    //             userChain: {
    //                 $reduce: {
    //                     input: '$userChain',
    //                     initialValue: [id],
    //                     in: { $concatArrays: ['$$value', ['$$this._id']] }
    //                 }
    //             }
    //         }
    //     }
    // ]);
    // console.log("userChaind : ", userChaind);
    // // if (userChain.length === 0 || !userChain[0].userChain) {
    // //   throw new Error("User not found");
    // // }

    // return userChain[0].userChain.join(" > ");
  }
}

module.exports = new AuthServices();
