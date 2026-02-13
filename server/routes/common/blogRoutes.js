const express = require("express");
const Blog = require("../../models/Blogi");

const router = express.Router();

// Fetch all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
});

// Fetch a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
});

// Create a new blog
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required!" });
    }

    const newBlog = new Blog({ title, content, author });
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
});

// Update a blog by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required!" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
});

// DELETE a blog by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
});

module.exports = router;
