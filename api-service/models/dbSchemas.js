const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcrypt");
require("dotenv").config();
console.log("mongodb url:", process.env.MONGODB_URL);
const schema = mongoose.Schema;
const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("Failed to connect to database", err);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectToDB, 5000);
    });
};

process.env.adriHouse_test.trim() !== "true" && connectToDB();

const tenantSchema = new schema({
  companyName: String,
  adminUserId: {
    type: ObjectId,
    ref: "User",
  }, // Reference to the admin user
  createdAt: Date,
});

const Tenant = mongoose.model("Tenant", tenantSchema);

const userSchema = new schema({
  fullName: String,
  username: String,
  password: String,
  email: String,
  role: String, // Admin or regular user
  companyId: {
    type: ObjectId,
    ref: "Tenant",
  }, // Reference to the tenant they belong to
  createdAt: Date,
  isGoogleUser: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = {
  Tenant,
  User,
};
