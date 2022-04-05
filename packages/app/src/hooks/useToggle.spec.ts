import { renderHook, act } from "@testing-library/react-hooks";
import useToggle from "./useToggle";

describe("Test toggleHook", () => {
  it("should toggle to true", () => {
    const { result } = renderHook(() => useToggle());

    act(() => result.current[1]());

    expect(result.current[0]).toBeTruthy();
  });

  it("should toggle value twice", () => {
    const { result } = renderHook(() => useToggle());

    act(() => result.current[1]());

    expect(result.current[0]).toBeTruthy();

    act(() => result.current[1]());

    expect(result.current[0]).toBeFalsy();
  });

  it("should toggle to false", () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => result.current[1]());

    expect(result.current[0]).toBeFalsy();
  });
});
