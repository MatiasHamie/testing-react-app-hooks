import "@testing-library/jest-dom";
import { todoReducer } from "../../../components/08-useReducer/todoReducer";
// datos fijos para pruebas
import { initialTodos, nuevoTodo } from "../../fixtures/demoTodos";

describe("Pruebas en todoReducer", () => {
  test("Debe de retonar el state por defecto", () => {
    const state = todoReducer(initialTodos, {});

    expect(state).toEqual(initialTodos);
  });

  test("Debe agregar 1 TODO", () => {
    const action = {
      type: "add",
      payload: nuevoTodo,
    };

    const state = todoReducer(initialTodos, action);

    expect(state.length).toEqual(initialTodos.length + 1);
    expect(state).toEqual([...initialTodos, nuevoTodo]);
  });

  test("Debe borrar 1 TODO", () => {
    const action = {
      type: "delete",
      payload: 1,
    };

    const state = todoReducer(initialTodos, action);
    expect(state.find((todo) => todo.id === 1)).toBe(undefined);
  });

  test("Debe hacer el toggle de 1 TODO", () => {
    const action = {
      type: "toggle",
      payload: 1,
    };

    const state = todoReducer(initialTodos, action);
    expect(state.find((todo) => todo.id === 1).done).toBe(true);
  });
});
