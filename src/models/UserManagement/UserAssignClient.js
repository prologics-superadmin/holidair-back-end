const mongoose = require('mongoose');

const userAssignClientSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  client_id: {
    type: String,
    required: true
  },
  Created_at: {
    type: Date,
    default: Date.now
  },
  Updated_at: {
    type: Date,
    default: Date.now
  }
});

const UserAssignClient = mongoose.model('UserAssignClient', userAssignClientSchema);

module.exports = UserAssignClient;
