const express = require("express");
const markdownIt = require("markdown-it");

const cors = require("cors");

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Allow CORS for the specified domain
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

// Markdown to HTML conversion endpoint
app.post("/convert", (req, res) => {
  try {
    const { markdown } = req.body;
    if (!markdown) throw new Error("Markdown text is required");

    // Convert Markdown to HTML
    const html = markdownIt().render(markdown);

    return res.status(200).json({ html });
  } catch (error) {
    return res.status(400).json({ error: error?.message || error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
