const express = require("express");
const router = express.Router();
const {
  getVacancies,
  getVacancyCount,
  getAllVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} = require("../controllers/vacancyController");
const { protect } = require("../middleware/auth");

// Public
router.get("/", getVacancies);
router.get("/count", getVacancyCount);

// Admin protected
router.get("/all", protect, getAllVacancies);
router.post("/", protect, createVacancy);
router.put("/:id", protect, updateVacancy);
router.delete("/:id", protect, deleteVacancy);

module.exports = router;
