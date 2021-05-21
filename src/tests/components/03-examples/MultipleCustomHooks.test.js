import React from "react";
import "@testing-library/jest-dom";
// import { renderHook } from "@testing-library/react-hooks";
import { shallow } from "enzyme";
import { MultipleCustomHooks } from "../../../components/03-examples/MultipleCustomHooks";
import { useFetch } from "../../../hooks/useFetch";
import { useCounter } from "../../../hooks/useCounter";
/*
    -- Mock: Invocar funciones y simular un valor de retorno de la misma para pruebas sobre el componente --
    1- Importar la funcion que vamos a probar, y hacer un jest.mock('directorio de la funcion')
    Lo que va a hacer eso es LLAMAR a la funcion, por ende si el componente espera un resultado, el test va a tirar error
    El error en este caso seria, que en el data.map() que hacemos para mostrar cada gif, no se puede hacer porque la data es undefined

    2- Simular el valor de retorno de la llamada a esa funcion que mockeamos con nombreFuncion.mockReturnValue()
    Como parámetro, le pasamos la respuesta q esperamos q nos devuelva, por ej, al inicio de este componente, se espera que
    el custom hook useFetchGifs nos devuelva un array de data vacio, junto con el loading en true, hasta que obtenga datos con el fetch
    Entonces la respuesta esperada seria useFetchGifs.mockReturnValue({data: [], loading: true });

*/

jest.mock("../../../hooks/useFetch");
jest.mock("../../../hooks/useCounter"); //Ejemplo descripto mas abajo

describe("Pruebas en <MultipleCustomHooks />", () => {
  // si tengo q simular una funcion, tengo q hacerlo como en increment
  // en este caso, botones usan la fn increment, para que no tiren error
  // de q esa funcion esta viniendo undenfined, la mockeo asi
  useCounter.mockReturnValue({
    counter: 10,
    increment: () => {},
  });

  test("Debe de mostrarse correctamente", () => {
    // No me interesa el useFetch, solo lo que retorna, ya lo probe por separado
    // asi q tengo que falsear informacion y mockearla
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    const wrapper = shallow(<MultipleCustomHooks />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe mostrar la informacion", () => {
    useFetch.mockReturnValue({
      data: [{ author: "Matias", quote: "Hola Mundo" }],
      loading: false,
      error: null,
    });
    // si quiero ver como quedaria con esta respuesta del useFetch el componente renderizado
    // console.log(wrapper.html())

    const wrapper = shallow(<MultipleCustomHooks />);
    // si no esta cargando, no se deberia mostrar el mensaje de loading con la className alert
    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.find(".quote").text().trim()).toBe("Hola Mundo");
    expect(wrapper.find("footer").text().trim()).toBe("Matias");
  });
});
