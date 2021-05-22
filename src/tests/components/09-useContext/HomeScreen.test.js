import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { HomeScreen } from "../../../components/09-useContext/HomeScreen";
import { UserContext } from "../../../components/09-useContext/UserContext";

describe("Pruebas en <HomeScreen />", () => {
  const user = {
    name: "Matias",
    email: "matias@email.com",
  };

  // tengo q usar mount, porque shallow solo renderiza el higher order component
  // y yo quiero saber info de los hijos tmb
  const wrapper = mount(
    <UserContext.Provider
      value={{
        user,
      }}
    >
      <HomeScreen />
    </UserContext.Provider>
  );

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
