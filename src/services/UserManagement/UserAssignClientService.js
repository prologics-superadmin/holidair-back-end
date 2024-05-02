const UserAssignClient = require('../../models/UserManagement/UserAssignClient');
const Customer = require('../../models/Customer/CustomerModel');



class UserAssignClientService {
  async createUserAssignClient(userId, clientId) {

   let coustermer=await Customer.findOne({code:clientId});

   const userAssignClient = new UserAssignClient({
      user_id: userId,
      client_id: coustermer.code
    });
    await userAssignClient.save();
    return userAssignClient;
  }

  async deleteUserAssignClient(id) {
    await UserAssignClient.findByIdAndDelete(id);

  }

  async getAllUserAssignClients(options, filters) {
    const { currentPageIndex = 1, dataPerPage = 10 } = options;
    const skip = (currentPageIndex - 1) * dataPerPage;

    const query = UserAssignClient.find(filters)
      .skip(skip)
      .limit(dataPerPage)
      .exec();

    const totalCount = UserAssignClient.countDocuments(filters).exec();

    const [userAssignClients, count] = await Promise.all([query, totalCount]);

    return { docs: userAssignClients, totalDocs: count };
  }
}

module.exports = new UserAssignClientService();
