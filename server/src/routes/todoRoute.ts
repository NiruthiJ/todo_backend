import express, { Request, Response } from "express";

const controller = require("../controller/todoController");

const router = express.Router();

router.post("/api/todos", controller.create);
router.get("/api/todos", controller.find);
router.get("/api/todos/:id", controller.find);
router.patch("/api/todos/:id", controller.update);
router.delete("/api/todos/:id", controller.delete);

export { router as todoRouter };
