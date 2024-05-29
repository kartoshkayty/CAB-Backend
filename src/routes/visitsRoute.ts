import express from "express";
import VisitsController from "../controllers/visitsController";

const router = express.Router();

router.get("/visits/last", VisitsController.last);
router.get("/visits/year/:year", VisitsController.visitsYear);
router.get("/visits/all", VisitsController.all);
router.get("/visits/date/:date", VisitsController.findDate);

router.post("/visits/time", VisitsController.visitsTime)

export default router;