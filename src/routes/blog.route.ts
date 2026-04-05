import { Router } from "express";
import { blogDataCreate } from "../controllers/blog.controller.js";

const blogRoute = Router();

blogRoute.post("/", blogDataCreate);

export default blogRoute;
