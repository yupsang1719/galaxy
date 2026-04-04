const nodemailer = require("nodemailer");

const sendEnquiry = async (req, res) => {
  const { name, email, phone, message, enquiryType } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Galaxy Care Staffing - Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Enquiry from ${name} — ${enquiryType || "General"}`,
      html: `
        <h2>New Website Enquiry</h2>
        <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || "Not provided"}</td></tr>
          <tr><td><strong>Enquiry Type</strong></td><td>${enquiryType || "General"}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message}</td></tr>
        </table>
      `,
    });

    res.json({ success: true, message: "Your enquiry has been sent. We will be in touch shortly." });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send enquiry. Please try again." });
  }
};

module.exports = { sendEnquiry };
