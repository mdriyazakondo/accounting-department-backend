import { Router } from "express";
import { registerUser } from "../controllers/checkAuth.controller";

const checkRoute = Router();

checkRoute.post("/", registerUser);

export default checkRoute;
