import { renderHook, act } from "@testing-library/react-hooks";
// Ojo que este act esta MAL importado por vscode
// import { act } from "react-dom/test-utils";
import { useForm } from "../../hooks/useForm";

describe("Pruebas en useForm", () => {
  const initialForm = {
    name: "Matias",
    email: "matias@email.com",
  };

  test("Debe regresar un formulario por defecto", () => {
    const { result } = renderHook(() => useForm(initialForm));
    // cambiar después para q devuelva un {} en lugar de un []
    const [values, handleInputChange, reset] = result.current;

    expect(values).toEqual(initialForm);
    expect(typeof handleInputChange).toBe("function");
    expect(typeof reset).toBe("function");
  });

  test("Debe cambiar el valor del formulario (cambiar name)", () => {
    const { result } = renderHook(() => useForm(initialForm));
    const [, handleInputChange] = result.current;

    // -- Ejemplo de como es el handleInputChange en el hook --
    // const handleInputChange = ({ target }) => {
    //     setValues({
    //     ...values,
    //     [target.name]: target.value,
    //     });
    // };

    act(() => {
      handleInputChange({ target: { name: "name", value: "Carlos" } });
    });

    const [formValues] = result.current;

    // de esta forma verifico que los otros campos q no sean name, no cambiaron
    expect(formValues).toEqual({ ...initialForm, name: "Carlos" });
  });

  test("Debe restablecer el formulario con RESET", () => {
    const { result } = renderHook(() => useForm(initialForm));
    const [, handleInputChange, reset] = result.current;

    act(() => {
      handleInputChange({ target: { name: "name", value: "Carlos" } });
      reset();
    });

    const [formValues] = result.current;

    expect(formValues).toEqual(initialForm);
  });
});
