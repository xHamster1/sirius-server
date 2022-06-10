const { Address } = require("../models/models");

class AddressController {
  async create(req, res) {
    const { name } = req.body;
    const address = await Address.create({ name });
    return res.json(address);
  }

  async getAll(req, res) {
    const addresses = await Address.findAll();
    return res.json(addresses);
  }
}

module.exports = new AddressController();
