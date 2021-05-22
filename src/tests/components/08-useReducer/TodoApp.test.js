import React from "react";
import "@testing-library/jest-dom";
import { mount, shallow } from "enzyme";
import { TodoApp } from "../../../components/08-useReducer/TodoApp";
import { nuevoTodo } from "../../fixtures/demoTodos";
import { act } from "react-dom/test-utils";

describe("Pruebas en <TodoApp />", () => {
  const wrapper = shallow(<TodoApp />);

  // mockeando el localStorage
  Storage.prototype.setItem = jest.fn();

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de agregar un TODO", () => {
    const wrapper = mount(<TodoApp />);

    act(() => {
      wrapper.find("TodoAdd").prop("handleAddTodo")(nuevoTodo);
    });

    expect(wrapper.find("h1").text().trim()).toBe(`TodoApp ( 1 )`);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  test("Debe eliminar un TODO", () => {
    // agrego un todo
    wrapper.find("TodoAdd").prop("handleAddTodo")(nuevoTodo);
    wrapper.find("TodoList").prop("handleDelete")(nuevoTodo.id);

    expect(wrapper.find("h1").text().trim()).toBe(`TodoApp ( 0 )`);
  });
});
