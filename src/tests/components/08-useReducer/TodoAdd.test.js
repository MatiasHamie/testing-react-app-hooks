import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { TodoAdd } from "../../../components/08-useReducer/TodoAdd";

describe("Pruebas en <TodoAdd />", () => {
  const handleAddTodo = jest.fn();
  const wrapper = shallow(<TodoAdd handleAddTodo={handleAddTodo} />);

  test("Debe mostrarse correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("No debe llamar al handleAddTodo", () => {
    // otra forma de simular el submit que no es con el simulate
    const formSubmit = wrapper.find("form").prop("onSubmit");
    formSubmit({ preventDefault() {} }); // simulo el preventDefault

    expect(handleAddTodo).toHaveBeenCalledTimes(0);
  });

  test("Debe llamar a la funcion handleAddTodo con un argumento", () => {
    const value = "Aprender ReactJS";
    wrapper
      .find("input")
      .simulate("change", { target: { value, name: "description" } });

    const formSubmit = wrapper.find("form").prop("onSubmit");
    formSubmit({ preventDefault() {} }); // simulo el preventDefault

    expect(handleAddTodo).toHaveBeenCalledTimes(1);
    expect(handleAddTodo).toHaveBeenCalledWith(expect.any(Object));
    expect(handleAddTodo).toHaveBeenCalledWith({
      id: expect.any(Number), //que el id sea un numero sin importar valor
      desc: value, // esto siempre es asi en este caso
      done: false, // esto tamb
    });

    // en el handleSubmit, al final se llama al reset, q resetea el input
    // entonces chequeo q pase eso
    expect(wrapper.find("input").prop("value")).toBe("");
  });
});
