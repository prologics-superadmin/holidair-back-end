const { User } = require("../../models/UserManagement/User");
const AuthServices = require("../../services/UserManagement/AuthService");
const bcrypt = require("bcrypt");
const UserPermissionHandleService = require("../../services/UserManagement/UserPermissionHandleService");
const Role = require("../../models/UserManagement/UserRole");
const { GetTreeUsers, GetAllIds } = require("../../utils/GetListFilters");
const {
  validateAllUserPermission,
} = require("../../helpers/validateUserPermission");

const OTPService = require("../../services/UserManagement/OtpService"); // Update the path as per your project structure
const { generateUUID } = require("../../utils/generateUUID");
const UserRole = require("../../models/UserManagement/UserRole");

class UserController {
  async register(req, res) {
    try {
      // req.body.code = await generateUUID(User, "", 100, 1);
      const userData = req.body;
      const user = await AuthServices.newUser(userData);

      if (user) {
        await UserPermissionHandleService.updateUserParmissionAssign({
          id: user.user._id,
          ids: user.permissions,
        });
      }

      return res.status(200).json({
        message: "User successfully created.",
        id: user.user._id,
        permissions: user.permissions,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .json({ error: "Email and password are required." });

      const user = await User.findOne({ email: email });
      if (!user)
        return res.status(400).json({ error: "Invalid email or password." });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res.status(400).json({ error: "Invalid email or password." });

      const role_id = await Role.findOne({ _id: user.user_role_id });

      const token = user.generateAuthToken(role_id ? role_id.ID : "");

      return res.status(200).json({
        message: "Login successful.",
        token: token,
        role: role_id ? role_id.ID : "",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  }

  async logout(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.userId });
      user.islogin = false;
      await user.save();
      return res.status(200).json({ message: "Logout successful." });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error." });
    }
  }

  async getHierarchy(req, res) {
    try {
      let search_key = ["user_name", "email"];
      const list = await GetTreeUsers(User, req.body, search_key);
      res.status(200).json({
        data: list,
        dataCount: 0,
        currentPaginationIndex: 1,
        dataPerPage: 0,
        message: "Data Returned.",
      });
      // let search_key = ["name"];
      // const list = await GetListFilters(Location,req.body,search_key);
      // res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    const page = parseInt(req.body.currentPageIndex) || 1;
    const filters = req.body.filters || {};

    const itemsPerPage = req.body.dataPerPage;
    const skip = (page - 1) * itemsPerPage;

    try {
      let query = {};

      if (filters) {
        query = { ...filters };

        if (filters.address === "" || !filters.address) {
          delete query.address;
        } else {
          query.address = { $regex: filters.address, $options: "i" };
        }

        query.user_name = { $regex: filters.user_name || "", $options: "i" };

        if (
          (req.body.search !== null || req.body.search !== "") &&
          req.body.search
        ) {
          query.user_name = { $regex: req.body.search || "", $options: "i" };
        }
      }

      const customerRole = await UserRole.findOne({
        role: { $regex: "^customer$", $options: "i" },
      });
      if (customerRole) {
        query.user_role_id = { $ne: customerRole._id };
      }

      const users = await User.find(query).skip(skip).limit(itemsPerPage);

      // just for testing
      if (users.length) {
        // loop here just for testing
        const srch = await AuthServices.searchUser("660ccfc48788dfa581e6fd5e");
      }

      const totalUsersCount = await User.countDocuments(query);

      let response = {};

      if (users.length === 0) {
        response = {
          data: users,
          dataCount: totalUsersCount,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "There are not matching records.",
        };
      } else {
        response = {
          data: users,
          dataCount: totalUsersCount,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "Data returned",
        };
      }

      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getAllCustomer(req, res) {
    const page = parseInt(req.body.currentPageIndex) || 1;
    const filters = req.body.filters || {};

    const itemsPerPage = req.body.dataPerPage;
    const skip = (page - 1) * itemsPerPage;

    try {
      let query = {};
      const userRol = await UserRole.findOne({ role: "Customer" });

      if (filters) {
        // query = { ...filters };
        if (filters.First_Name && filters.First_Name !== "") {
          query.first_name = { $regex: filters.First_Name, $options: "i" };
        }
        if (filters.Last_Name && filters.Last_Name !== "") {
          query.last_name = { $regex: filters.Last_Name, $options: "i" };
        }
        if (filters.email && filters.email !== "") {
          query.email = { $regex: filters.email, $options: "i" };
        }

        query.user_role_id = userRol._id;
      }

      const users = await User.find(query)
        .select("-password")
        .select("-address")
        .select("-created_at")
        .select("-nic")
        .select("-user_role_id")
        .select("-updated_at")
        .select("-is_deleted")
        .select("-dob")
        .select("-__v")
        .skip(skip)
        .limit(itemsPerPage);

      const totalUsersCount = await User.countDocuments(query);

      let response = {};

      if (users.length === 0) {
        response = {
          data: users,
          dataCount: totalUsersCount,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "There are not matching records.",
        };
      } else {
        response = {
          data: users,
          dataCount: totalUsersCount,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "Data returned",
        };
      }

      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getUserById(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findById(id).populate({
        path: "user_role_id",
        select: "role _id", // Select only name and _id fields of the brand object
      });

      const permissions =
        await UserPermissionHandleService.getUserPermissionAssignByUserId(id);

      const subUsers = await GetTreeUsers(User, req.body, null, id);

      let response = {};

      if (permissions.length === 0) {
        response = {
          _id: user._id,
          user_name: user.user_name,
          email: user.email,
          address: user.address,
          user_role_id: user.user_role_id,
          permissions: [],
          phone_number: user.phone_number,
          shop_name: user.shop_name,
          area: user.area,
          is_deleted: user.is_deleted,
          code: user.code,
          subUsers,
          assign_territory: user.assign_territory,
          assign_warehouse: user.assign_warehouse,
          subUsers,
        };
      } else {
        response = {
          _id: user._id,
          user_name: user.user_name,
          email: user.email,
          EMP_number: user.EMP_number,
          address: user.address,
          user_role_id: user.user_role_id,
          pin: user.pin,
          phone_number: user.phone_number,
          permissions: permissions || [],
          is_deleted: user.is_deleted,
          code: user.code,
          subUsers,
          location: user.location,
          warehouse: user.warehouse,
          subUsers,
        };
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the user data
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
      if (updatedData.is_deleted) {
        const subUsers = await GetTreeUsers(User, {}, null, userId);
        const idlst = GetAllIds(subUsers);
        await AuthServices.updateBulkUserById(idlst, { is_deleted: true });
      }
      const user = await AuthServices.updateUserById(userId, updatedData);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getMe(req, res) {
    try {
      const user = await AuthServices.getUserById(req.user.userId);

      const userRole = await Role.findById(user.user_role_id);

      const response = {
        user_data: user,
        user_role: userRole.role,
        role_p: userRole.ID,
        // permissions: await validateAllUserPermission(req.user.userId),
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server error" });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      // Perform validation on userName if needed

      // Find the user by userName to retrieve their phone number
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const phoneNumber = user.phone_number; // Assuming phone_number is a field in your User model
      if (!phoneNumber) {
        return res
          .status(400)
          .json({ error: "Phone number not found for the user" });
      }

      OTPService.generateAndSendOTP(user._id, phoneNumber);

      return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      // Find the user by email to retrieve their user_id
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify OTP using user_id
      const isOTPValid = await OTPService.verifyOTP(user._id, otp);

      if (!isOTPValid) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, otp, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify OTP
      const isOTPValid = await OTPService.verifyOTP(user._id, otp);

      if (!isOTPValid) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Remove the OTP from the database
      await OTPService.removeOTP(user._id);

      return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async hiracySearch(req, res) {
    try {
      const { search } = req.body;

      // Perform a case-insensitive search for users with usernames matching the search term
      const users = await User.find({
        user_name: { $regex: search, $options: "i" },
      });
      console.log("-------------------------------------------" + 1, users);

      const getHierarchy = async (users, userId) => {
        let hierarchy = [];
        const filteredUsers = users.filter((user) => user.mapping === userId);

        for (const user of filteredUsers) {
          const childHierarchy = await getHierarchy(users, user._id);
          if (childHierarchy.length > 0) {
            hierarchy.push({
              ...user,
              children: childHierarchy,
            });
          } else {
            hierarchy.push(user);
          }
        }
        console.log(
          "-------------------------------------------" + 2,
          hierarchy
        );

        return hierarchy;
      };

      // Construct the hierarchical structure
      const hierarchicalUsers = await getHierarchy(users, null);
      console.log(
        "-------------------------------------------" + 3,
        hierarchicalUsers
      );

      return res.status(200).json({ users: hierarchicalUsers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
