const { User, Tenant } = require("../models/dbSchemas");
const bcrypt = require("bcrypt");
const dbCRUD = {
  async createTenant(tenantData) {
    const newTenant = new Tenant({
      companyName: tenantData.companyName,
      createdAt: new Date(),
    });
    try {
      const savedTenant = await newTenant.save();
      const NewAdminUser = new User({
        username: tenantData.username,
        password: tenantData.password,
        role: "admin",
        companyId: savedTenant._id,
        fullName: tenantData.fullName,
        createdAt: new Date(),
        isGoogleUser: tenantData.isGoogleUser || false,
      });
      const savedUser = await NewAdminUser.save();
      await savedTenant.updateOne({ adminUserId: savedUser._id });
      return { savedUserId: savedUser._id, savedTenantId: savedTenant._id };
    } catch (err) {
      console.log(err);
      return "Failed to create tenant/Admin";
    }
  },
  async findUser(username, password) {
    try {
      const user = await User.findOne({
        username: username,
        isGoogleUser: false,
      });
      if (user) {
        console.log("i found user");
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          console.log(user);
          return {
            userID: user._id,
            userRole: user.role,
            fullName: user.fullName,
            companyId: user.companyId,
          };
        } else {
          return false;
        }
      } else return false;
    } catch (err) {
      console.log("Error from dbCRUD:", err);
      return false;
    }
  },
  async createUser(userData) {
    const newUser = new User({
      username: userData.username,
      password: userData.password,
      role: userData.role,
      companyId: userData.companyId,
      fullName: userData.fullName,
      createdAt: new Date(),
    });
    try {
      const savedUser = await newUser.save();
      return savedUser._id;
    } catch (err) {
      console.log(err);
      return "Failed to create user";
    }
  },
  async findOrCreateGoogleUser(username) {
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        console.log("i found user");
        return user;
      } else {
        const newUser = new User({
          username: username,
          role: "user",
          isGoogleUser: true,
          createdAt: new Date(),
        });
        const savedUser = await newUser.save();
        return savedUser;
      }
    } catch (err) {
      console.log("Error from dbCRUD:", err);
      return false;
    }
  },
};

module.exports = dbCRUD;
