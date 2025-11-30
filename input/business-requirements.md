# Task Manager Backend: Business Requirements

## System Overview

A backend service for personal task management. Users can register, authenticate, and manage their personal tasks with status and priority tracking.

## Core Features

### User Management
- User registration with username, email, and password
- User authentication (login)
- User profile management (view and update profile)

### Task Management
- Create tasks with title, description, status, and priority
- View tasks (list all tasks, view single task)
- Update tasks (modify title, description, status, priority)
- Delete tasks
- Filter tasks by status and priority
- Search tasks by title and description

## Task-Specific Business Rules

### Task Status
- Tasks have status with enum values: "todo", "in-progress", "done"
- Default status: "todo"

### Task Priority
- Tasks have priority with enum values: "low", "medium", "high"
- Default priority: "medium"

### Task Filtering
- Tasks can be filtered by status (query parameter: `status`)
- Tasks can be filtered by priority (query parameter: `priority`)
- Tasks can be searched by title and description (query parameter: `search`)

## Task Entity

### Fields
- Title (required)
- Description (optional)
- Status (required, enum: "todo" | "in-progress" | "done")
- Priority (required, enum: "low" | "medium" | "high")
- Owner (User relationship)

