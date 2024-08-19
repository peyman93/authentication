import { Hono } from "hono";
import { deleteUser, getAllUsers } from "../controllers/usersController";

const usersRoute = new Hono();

usersRoute.get("/", getAllUsers);

usersRoute.delete("/:id", deleteUser);

export default usersRoute;