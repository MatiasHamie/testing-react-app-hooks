import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "../../hooks/useCounter";

describe("Pruebas en useCounter", () => {
  // esto puede servir por si borramos o comentamos un retorno por algo y se nos olvido normalizarlo
  test("Debe retornar valores por defecto", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(10);
    expect(typeof result.current.increment).toBe("function");
    expect(typeof result.current.decrement).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  test("Debe inicializar el contador en el valor que se le manda", () => {
    const initialValue = 100;
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test("Debe incrementar el counter en 1", () => {
    const initialValue = 100;
    const { result } = renderHook(() => useCounter(initialValue));
    const { decrement } = result.current;

    act(() => decrement());

    const { counter } = result.current;
    expect(counter).toBe(initialValue - 1);
  });

  test("Debe decrementar el counter en 1", () => {
    const initialValue = 100;
    const { result } = renderHook(() => useCounter(initialValue));
    const { decrement } = result.current;

    // incremento para cambiar aunque sea 1 vez el valor por defecto y q no sea una falsa prueba
    act(() => {
      decrement();
    });

    const { counter } = result.current;
    expect(counter).toBe(initialValue - 1);
  });

  test("Debe resetear el counter al valor inicial", () => {
    const initialValue = 100;
    const { result } = renderHook(() => useCounter(initialValue));
    const { increment, reset } = result.current;
    // incremento para cambiar aunque sea 1 vez el valor por defecto y q no sea una falsa prueba
    act(() => {
      increment();
      reset();
    });

    const { counter } = result.current;
    expect(counter).toBe(initialValue);
  });
});
