import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { RealExampleRef } from "../../../components/04-useRef/RealExampleRef";

describe("Pruebas en <RealExampleRef />", () => {
  test("Debe mostrarse correctamente", () => {
    const wrapper = shallow(<RealExampleRef />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("MultipleCustomHooks").exists()).toBe(false);
  });

  test("Debe mostrar el componente <MultipleCustomHooks />", () => {
    const wrapper = shallow(<RealExampleRef />);
    wrapper.find("button").simulate("click");
    // console.log(wrapper.html());
    expect(wrapper.find("MultipleCustomHooks").exists()).toBe(true);
  });
});
