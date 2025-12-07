const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Yangi user yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User muvaffaqiyatli yaratildi
 *       400:
 *         description: Ma'lumot xato
 *       500:
 *         description: Server xatoligi
 */
router.post("/users", userController.createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: User login qilish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               parol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login muvaffaqiyatli
 *       400:
 *         description: Email yoki parol kiritilmadi
 *       401:
 *         description: Login ma'lumotlari noto'g'ri
 *       404:
 *         description: User topilmadi
 *       500:
 *         description: Server xatoligi
 */
router.post("/users/login", userController.loginUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Barcha userlarni olish
 *     responses:
 *       200:
 *         description: Userlar ro'yxati
 *       500:
 *         description: Server xatoligi
 */
router.get("/users", userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: ID orqali user ma'lumotlarini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User topildi
 *       404:
 *         description: User topilmadi
 *       500:
 *         description: Server xatoligi
 */
router.get("/users/:id", userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: ID orqali userni yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User yangilandi
 *       404:
 *         description: User topilmadi
 *       500:
 *         description: Server xatoligi
 */
router.put("/users/:id", userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: ID orqali userni o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User o'chirildi
 *       404:
 *         description: User topilmadi
 *       500:
 *         description: Server xatoligi
 */
router.delete("/users/:id", userController.deleteUser);

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     tags: [Users]
 *     summary: Userlarni name yoki email orqali qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidiruv matni
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 *       400:
 *         description: Qidiruv matni kiritilmagan
 *       500:
 *         description: Server xatoligi
 */
router.get("/users/search", userController.searchUser);

module.exports = router;
