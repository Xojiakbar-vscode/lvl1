const { User } = require("../models");
const { validateUser } = require("../validation/userValidation");
const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.loginUser = async (req, res) => {
    const { email, parol } = req.body;

    if (!email || !parol) {
        return res.status(400).send("Email va parol majburiy");
    }

    try {
        // Email tekshirish
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send("Email yoki parol noto‘g‘ri");
        }

        // Parolni solishtirish (user.password)
        const isPasswordValid = await bcrypt.compare(parol, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Email yoki parol noto‘g‘ri");
        }

        // JWT yaratish
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login muvaffaqiyatli!",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include:[{model: Customer, as: "customer"},
        {model: Car, as: "car"}
      ]
    });
    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User topilmadi");
    await user.update(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send("User topilmadi");

    const userDate = user.toJSON();

    await user.destroy();
    res.status(200).send(userDate);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.searchUser = async (req,res) =>{
    try{
        console.log("Query received:", req.query.query);

        const { query }= req.query;
       if (!query){
        return res.status(404).send("Search query is required");
       }
       const users = await User.findAll({
        where: {
        [Op.or]: [
          {name: {
            [Op.iLike]: `%${query}`
          }},
          {email: {[Op.iLike]: `%${query}`}},
        ],
        },
       });
       res.status(200).send(users);
    } catch (error){
      res.status(500).send(error.message);
    }
};