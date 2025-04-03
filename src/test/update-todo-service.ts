import { BadRequestError } from "../service/contract/errors/errors";
import { TodoService } from "../service/todo/todo.service";

async function testUpdateTodo() {
  try {
    const data = {
      id: BigInt(3), // Convert to BigInt since Prisma requires it
      projectName: "Updated Project 3",
      taskName: "Updated Task 3",
      priority: "low",
      progressStatus: "in-progress",
      startDate: "2025-04-05",
      endDate: "2025-04-10",
      hoursTime: "0",
      minutesTime: "0",
      secondsTime: "0",
      userId: 1,
    };

    const { id, userId, ...updateData } = data; // Extract id and userId separately

    const updatedTodo = await TodoService.updateTodosByUser(
      id,
      userId,
      updateData
    );
    console.log("Todo updated:", updatedTodo);
  } catch (error) {
    if (error instanceof BadRequestError) {
      console.error("Error updating todo:", error.message);
    }
  }
}

testUpdateTodo();
