import React from "react";
import "@testing-library/jest-dom";
import { AppRouter } from "../../../components/09-useContext/AppRouter";
import { mount } from "enzyme";
import { UserContext } from "../../../components/09-useContext/UserContext";

describe("Pruebas en <AppRouter />", () => {
  const user = {
    name: "Matias",
    email: "matias@email.com",
  };

  const wrapper = mount(
    <UserContext.Provider value={{user}}>
      <AppRouter />
    </UserContext.Provider>
  );

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
