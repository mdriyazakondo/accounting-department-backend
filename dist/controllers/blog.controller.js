import Blog from "../models/blog/blog.js";
export const blogDataCreate = async (req, res) => {
    try {
        const { title, slug, content, photo, category, author, tags, isPublished, } = req.body;
        if (!title || !slug || !content || !photo || !category || !author) {
            res.status(400).json({
                message: "Please provide all required fields: title, slug, content, photo, category, and author.",
            });
            return;
        }
        const newBlog = await Blog.create({
            title,
            slug,
            content,
            photo,
            category,
            author,
            tags: tags || [],
            isPublished: isPublished ?? false,
            views: 0,
        });
        res.status(201).json({
            message: "Blog created successfully",
            data: newBlog,
        });
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000) {
            res.status(400).json({ message: "Title or Slug already exists!" });
            return;
        }
        console.error("Error creating blog:", error);
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
};
//# sourceMappingURL=blog.controller.js.map