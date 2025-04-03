import { TodoService } from "@app/service/todo/todo.service";
import { Request, Response } from "express";
import BaseController from "./contract/baseController.contract";

class _TodoController extends BaseController {
  async create(req: Request, res: Response) {
    const userId = req.user.id;
    const todo = await TodoService.createTodo(userId, req.body);

    // Convert BigInt id to string
    const serializedTodo = {
      ...todo,
      id: todo.id.toString(), // Convert BigInt to string
    };

    return super.postOk({
      message: "Todo Insert Successful",
      data: {
        serializedTodo,
      },
    });
  }

  async readAll(req: Request, res: Response) {
    const userId = req.user.id;
    const todos = await TodoService.getTodosByUser(userId);
    console.log("Todos before serialization:", todos);

    // Convert BigInt ids to strings for JSON compatibility
    const serializedTodos = todos.map((todo) => ({
      ...todo,
      id: todo.id.toString(),
    }));

    return super.getOk({
      message: "Todo Retrieved Successful",
      data: serializedTodos,
    });
  }

  async getById(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const id = BigInt(req.params.id);
    const todo = await TodoService.getTodoById(id, userId);
    return this.getOk({ message: "Todo retrieved successfully", data: todo });
  }

  async update(req: Request, res: Response) {
    const userId = (req.user as any).id;
    const id = BigInt(req.params.id);

    const todo = await TodoService.updateTodosByUser(id, userId, req.body);

    const serializedTodos = {
      ...todo,
      id: todo.id.toString(),
    };

    return super.getOk({
      message: "Todo Update Successful",
      data: serializedTodos,
    });
  }

  async delete(req: Request, res: Response) {
    const userId = (req.user as any).id;
    console.log(userId, " : user id");
    const id = BigInt(req.params.id);
    const result = await TodoService.deleteTodo(id, userId);
    return super.getOk({ message: result.message, data: {} });
  }
}

export const TodoController = new _TodoController();
