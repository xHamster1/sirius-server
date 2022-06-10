const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
  async registration(req, res, next) {
    const {login, password, role } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest("Неккоректный логин или пароль"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({login, role, password: hashPassword });
    const token = generateJwt(user.id, user.login, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const {login, password} = req.body
    const user = await User.findOne({where: {login}})
    if (!login) {
      return next(ApiError.internal('Администратора с таким логином не существует'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Пароль неверный'))
    }
    const token = generateJwt(user.id,user.login, user.role)
    return res.json({token})
  }

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("Не задан ID"));
    }
    res.json(id);
  }
}

module.exports = new UserController();
