import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add Task
const addTask = asyncHandler(async (req, res) => {
    const { description } = req.body;
    if (!description) throw new ApiError(400, "Description is required");

    const task = await Task.create({ description });

    res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

// List all tasks
const listTask = asyncHandler(async (req, res) => {
    const filter = req.query.status;
    const query = filter ? { status: filter } : {};
    const tasks = await Task.find(query);

    res.json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

// Update task description
const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) throw new ApiError(400, "Description is required");

    const task = await Task.findByIdAndUpdate(
        id,
        { description },
        { new: true } // return the updated document
    );

    if (!task) throw new ApiError(404, "Task not found");
    res.json(new ApiResponse(200, task, "Task updated successfully"));
});

// Change task status
const changeStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["todo", "in-progress", "done"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    const task = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    if (!task) throw new ApiError(404, "Task not found");
    res.json(new ApiResponse(200, task, `Task marked as ${status}`));
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new ApiError(404, "Task not found");
    res.json(new ApiResponse(200, task, "Task deleted successfully"));
});

export {
    addTask,
    listTask,
    updateTask,
    changeStatus,
    deleteTask
};
