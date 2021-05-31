import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChakraProvider } from "@chakra-ui/react";

const ChakraRenderer = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ChakraRenderer,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
