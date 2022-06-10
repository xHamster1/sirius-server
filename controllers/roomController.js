const uuid = require("uuid");
const path = require("path");
const { Room, RoomInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class RoomController {
  async create(req, res, next) {
    try {
      let { name, price, addressId, typeId, area, status, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const room = await Room.create({
        name,
        price,
        addressId,
        typeId,
        area,
        status,
        info,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          RoomInfo.create({
            title: i.title,
            description: i.description,
            roomId: room.id,
          })
        );
      }

      return res.json(room);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { area, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let room;
    if (!area && !typeId) {
      room = await Room.findAndCountAll({ limit, offset });
    }
    if (area && !typeId) {
      room = await Room.findAndCountAll({ where: { area }, limit, offset });
    }
    if (!area && typeId) {
      room = await Room.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (area && typeId) {
      room = await Room.findAndCountAll({
        where: { area, typeId },
        limit,
        offset,
      });
    }
    return res.json(room);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const room = await Room.findOne({
      where: { id },
      include: [{model: RoomInfo, as: 'info' }]
    });
    return res.json(room)
  }
}

module.exports = new RoomController();
