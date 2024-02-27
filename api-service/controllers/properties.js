const { propertyModel } = require("../models/propertiesModel");

exports.properties = {
  addProperty: async (req, res) => {
    console.log("add property", req.body);
    const { beds, baths, postedBy, imgPath, city, address, price, postedFor } =
      req.body;

    if (
      !beds ||
      !baths ||
      !postedBy ||
      !imgPath ||
      !city ||
      !address ||
      !price ||
      !postedFor
    ) {
      return res.status(400).json({ error: "All fields are required" });
    } else {
      const result = await propertyModel.addPropertyToDatabase({
        beds,
        baths,
        postedBy,
        imgPath,
        city,
        address,
        price,
        postedFor,
      });
      res.status(200).json(result);
    }
  },
  getProperties: async (req, res) => {
    console.log(req.body.sqlQuery);
    try {
      const result = await propertyModel.getPropertyFromDatabase(
        req.body.sqlQuery
      );
      console.log(result);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
};
