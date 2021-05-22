import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/09-useContext/LoginScreen";
import { UserContext } from "../../../components/09-useContext/UserContext";
import { act } from "react-dom/test-utils";

describe("Pruebas en <LoginScreen />", () => {
  const setUser = jest.fn();
  const wrapper = mount(
    <UserContext.Provider
      value={{
        setUser,
      }}
    >
      <LoginScreen />
    </UserContext.Provider>
  );

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe ejecutar el setUser con el argumento esperado", () => {
    act(() => {
      wrapper.find("button").simulate("click");
    });

    expect(setUser).toHaveBeenCalledWith({
      id: 123,
      name: "Fernando",
    });
  });
});
