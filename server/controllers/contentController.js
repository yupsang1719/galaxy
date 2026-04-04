const Content = require("../models/Content");

const getContent = async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) content = await Content.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateContent = async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) content = new Content({});

    const { hero, about, contact, testimonials, whyUs } = req.body;
    if (hero) content.hero = { ...content.hero, ...hero };
    if (about) content.about = { ...content.about, ...about };
    if (contact) content.contact = { ...content.contact, ...contact };
    if (testimonials !== undefined) content.testimonials = testimonials;
    if (whyUs !== undefined) content.whyUs = whyUs;

    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getContent, updateContent };
