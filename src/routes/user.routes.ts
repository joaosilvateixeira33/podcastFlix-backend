import { Router } from "express";
import * as UsersController from "../controllers/users-controller";

const routerUsers = Router();

routerUsers.get("/users/list", UsersController.listAllUsers);
routerUsers.get("/users/:id", UsersController.getById);
routerUsers.post("/users/create", UsersController.createUser);
routerUsers.delete("/users/:id", UsersController.deleteUser);
routerUsers.patch("/users/:id", UsersController.updateUser);

export default routerUsers;