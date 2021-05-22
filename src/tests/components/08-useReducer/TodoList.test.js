import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { TodoList } from "../../../components/08-useReducer/TodoList";
import { initialTodos } from "../../fixtures/demoTodos";

describe("Pruebas en <TodoList />", () => {
  // simulo las funciones con jest
  // recordemos que no me interesa si se borra un todo o algo por el estilo
  // solo quiero ver como se renderiza y que se llama
  const handleDelete = jest.fn();
  const handleToggle = jest.fn();

  const wrapper = shallow(
    <TodoList
      todos={initialTodos}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  );

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe tener tantos <TodoListItem /> como el array de todos que se le envia", () => {
    expect(wrapper.find("TodoListItem").length).toBe(initialTodos.length);

    // Aca elijo 1 componente TodoListItem y me fijo que le este mandando 2 funciones
    // Por cualquier cosa, se comenta o alguien se olvida de mandar alguna de estas dos funciones al ListItem,
    // me avisa
    expect(wrapper.find("TodoListItem").at(0).prop("handleDelete")).toEqual(
      expect.any(Function) // espera cualquier funcion
    );
    expect(wrapper.find("TodoListItem").at(0).prop("handleToggle")).toEqual(
      expect.any(Function)
    );
  });
});
