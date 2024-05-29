import express from "express";
import mainRoute from "./mainRoute";
import visitsRoute from "./visitsRoute";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.use(mainRoute);
router.use("/api/v1", authMiddleware, visitsRoute);

export default router;