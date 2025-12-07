const { Admin } = require("../models");
const {validateAdmin} = require("../validation/adminValidation")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin)
            return res.status(400).json({ message: "Email allaqachon mavjud" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Admin muvaffaqiyatli ro'yxatdan o'tdi",
            admin: newAdmin,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Serverda xatolik yuz berdi" });
    }
};

exports.loginAdmin = async (req, res) => {
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("Email va parol majburiy");
    }

    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).send("Email yoki parol noto‘g‘ri");
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).send("Email yoki parol noto‘g‘ri");
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET ||  "secretkey", 
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login muvaffaqiyatli",
            token,
            admin: {
                id: admin.id,
                email: admin.email,
                admin_nomi: admin.admin_nomi,
            },
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};