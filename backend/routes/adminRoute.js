const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin ro‘yxatdan o‘tishi va tizimga kirishi
 */


/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     tags: [Admin]
 *     summary: Yangi admin yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin muvaffaqiyatli yaratildi
 *       400:
 *         description: Email mavjud yoki noto‘g‘ri ma'lumot
 */
router.post("/admin/register", adminController.registerAdmin);


/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: Admin tizimga kirishi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli login — token bilan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin tizimga muvaffaqiyatli kirdi
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     token:
 *                       type: string
 *       401:
 *         description: Email yoki parol noto‘g‘ri
 */
router.post("/admin/login", adminController.loginAdmin);


module.exports = router;
