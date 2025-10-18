import "@testing-library/jest-dom";
import { vi } from "vitest";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };

vi.mock("@ionic/react", async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = (await importOriginal()) as Record<string, any>;

  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IonButton: ({ children, disabled, ...props }: any) => (
      <button disabled={disabled} {...props}>
        {children}
      </button>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IonIcon: ({ icon }: any) => <span data-icon={icon} />,
  };
});
