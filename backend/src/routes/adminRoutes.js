import express from "express";
const router = express.Router();

import { addStudent, getStudents } from "../controllers/adminController.js";

router.post("/add-student", addStudent);
router.get("/students", getStudents);

export default router;
