const dbCRUD = require("./dbCRUD");
exports.customers = {
  async createTenant(req, res) {
    const { companyName, fullName, username, password } = req.body;

    try {
      const result = await dbCRUD.createTenant({
        companyName,
        fullName,
        username,
        password,
      });
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to create tenant");
    }
  },
  async createUser(req, res) {
    const { username, password, email, fullName } = req.body;

    try {
      const result = await dbCRUD.createUser({
        username,
        password,
        email,
        role: "user",
        fullName,
        companyId: req.session.user.companyId,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).send("Failed to create user");
    }
  },
  async users(req, res) {
    res.send("users route hit");
  },
};
