import { Router } from "express";
import { blogDataCreate } from "../controllers/blog.controller";

const blogRoute = Router();

blogRoute.post("/", blogDataCreate);

export default blogRoute;
