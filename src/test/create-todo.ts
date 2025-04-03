import TodoRepository from "../repository/todo/todo.repository";

async function testCreateTodo() {
  try {
    const todo = await TodoRepository.create({
      projectName: "Test Project",
      taskName: "Test Task",
      priority: "medium",
      progressStatus: "todo",
      userId: 1, // Replace with a valid user ID from your User table
    });
    console.log("Todo created:", todo);
  } catch (error) {
    console.error("Error creating todo:", error);
  }
}

testCreateTodo();
