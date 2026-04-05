import { Schema, model, Document } from "mongoose";
import { IBlog } from "../../types/blog.js";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    photo: {
      type: String,
      required: [true, "Featured image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Technology", "Education", "Lifestyle", "Events"],
    },
    author: {
      type: String,
      required: true,
      default: "Admin",
    },
    tags: [
      {
        type: String,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
