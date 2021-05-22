import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { TodoListItem } from "../../../components/08-useReducer/TodoListItem";
import { nuevoTodo } from "../../fixtures/demoTodos";

describe("Pruebas en <TodoListItem />", () => {
  // simulo las funciones con jest
  // recordemos que no me interesa si se borra un todo o algo por el estilo
  // solo quiero ver como se renderiza y que se llama
  const handleDelete = jest.fn();
  const handleToggle = jest.fn();

  // Aclaro nuevamente q esta afuera del beforeEach el wrapper para tener el autocompletado
  // y está adentro del beforeEach para volverlo al defecto antes de cada prueba
  let wrapper = shallow(
    <TodoListItem
      todo={nuevoTodo}
      index={nuevoTodo.id}
      handleDelete={handleDelete}
      handleToggle={handleToggle}
    />
  );

  beforeEach(() => {
    jest.clearAllMocks(); // todas las llamadas q hice en test previos a n funciones las borro
    wrapper = shallow(
      <TodoListItem
        todo={nuevoTodo}
        index={nuevoTodo.id}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
      />
    );
  });

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe llamar a la funcion borrar con el id del todo a borrar", () => {
    wrapper.find(".btn-delete").simulate("click");
    expect(handleDelete).toHaveBeenCalledWith(nuevoTodo.id);
  });

  test("Debe llamar a la funcion handleToggle con el id del todo a marcar como completado o no completado", () => {
    wrapper.find("#p-toggleTodo").simulate("click");
    expect(handleToggle).toHaveBeenCalledWith(nuevoTodo.id);
  });

  test("Debe mostrar el texto correctamente", () => {
    const p = wrapper.find("#p-toggleTodo");
    expect(p.text().trim()).toBe(`${nuevoTodo.id + 1}. ${nuevoTodo.desc}`);
  });

  test("Debe tener la clase complete si el todo.done esta en true", () => {
    const todo = nuevoTodo;
    todo.done = true;

    const wrapper = shallow(<TodoListItem todo={todo} />);

    expect(wrapper.find("p").hasClass("complete")).toBe(true);
  });
});
