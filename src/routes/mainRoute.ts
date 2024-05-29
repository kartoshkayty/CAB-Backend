import express from "express";
import MainController from "../controllers/mainController";

const router = express.Router();

router.get("/", MainController.logVisit);

export default router;
