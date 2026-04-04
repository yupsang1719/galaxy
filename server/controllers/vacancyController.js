const Vacancy = require("../models/Vacancy");

// Public — get all active vacancies
const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(vacancies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Public — get count of active vacancies (for hero badge)
const getVacancyCount = async (req, res) => {
  try {
    const count = await Vacancy.countDocuments({ isActive: true });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin — get all vacancies including inactive
const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find().sort({ createdAt: -1 });
    res.json(vacancies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin — create vacancy
const createVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.create(req.body);
    res.status(201).json(vacancy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin — update vacancy
const updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vacancy) return res.status(404).json({ message: "Vacancy not found" });
    res.json(vacancy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin — delete vacancy
const deleteVacancy = async (req, res) => {
  try {
    await Vacancy.findByIdAndDelete(req.params.id);
    res.json({ message: "Vacancy deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getVacancies, getVacancyCount, getAllVacancies, createVacancy, updateVacancy, deleteVacancy };
