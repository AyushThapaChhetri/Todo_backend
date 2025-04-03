import TodoRepository from "../repository/todo/todo.repository";

async function testReadTodo() {
  try {
    const findAllByUser = await TodoRepository.findAllByUser(1);
    console.log("Todo retreived", findAllByUser);
  } catch (error) {
    console.error("Error creating todo: ", error);
  }
}

testReadTodo();
