import { TodoService } from "../service/todo/todo.service";

async function testCreateTodo() {
  try {
    const todo = await TodoService.createTodo(1, {
      // Replace 1 with a valid user ID
      projectName: "Service Test",
      taskName: "Service Task",
      priority: "high",
      progressStatus: "progress",
    });
    console.log("Todo created:", todo);
  } catch (error) {
    console.error("Error creating todo:", error);
  }
}

testCreateTodo();
