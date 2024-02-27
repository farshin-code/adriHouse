const route = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middleWares/roles");
const companyRestricted = require("../middleWares/dbAccess");
const { customers } = require("../controllers/customers");
const { properties } = require("../controllers/properties");
const { rabbit } = require("../controllers/rabbit");
route.post("/createTenant", customers.createTenant);

route.post("/createUser", isAdmin, customers.createUser);

route.get("/users", isAdmin, customers.users);

route.post("/addProperty", isAuthenticated, properties.addProperty);

route.get("/testPublic", (req, res) => {
  res.send("testPublic route hit");
});
route.post("/getProperties", properties.getProperties);

route.post("/search", rabbit.send);
module.exports.APIroute = route;
