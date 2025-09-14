import { Router } from "express";
import {
  addTask,
  changeStatus,
  deleteTask,
  listTask,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router();

// Create a task
router.route("/").post(addTask);

// Get all tasks
router.route("/").get(listTask);

// Update a task by ID
router.route("/:id").put(updateTask);

// Change task status by ID
router.route("/:id/status").patch(changeStatus);

// Delete a task by ID
router.route("/:id").delete(deleteTask);

export default router;
