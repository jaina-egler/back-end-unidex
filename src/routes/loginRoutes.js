import express from "express";
import LoginController from "../controllers/LoginController.js";
import AuthMiddleware from "../middlewares/AuthMIddleware.js";

const routes = express.Router();

// all routes login

// it is need to be authenticated
routes.post("/login", LoginController.login);
routes.post("/create/login", AuthMiddleware, LoginController.createLogin);

export default routes;
