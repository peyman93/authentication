import { Hono } from "hono";
import {
  getAllUsers,
  insertNewUser,
  deleteUser,
} from "../controllers/authController";

const authRoute = new Hono();

authRoute.get("/", getAllUsers);

authRoute.post("/", insertNewUser);

authRoute.delete("/:id", deleteUser);

export default authRoute;
