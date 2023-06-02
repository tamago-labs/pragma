import Home from "../src/pages/index"
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Calculator", () => {
    it("renders a calculator", () => {
        render(<Home />);
        // check if all components are rendered
        //   expect(screen.getByTestId("result")).toBeInTheDocument();
        //   expect(screen.getByTestId("num1")).toBeInTheDocument();
        //   expect(screen.getByTestId("num2")).toBeInTheDocument();
        //   expect(screen.getByTestId("add")).toBeInTheDocument();
        //   expect(screen.getByTestId("subtract")).toBeInTheDocument();
        //   expect(screen.getByTestId("multiply")).toBeInTheDocument();
        //   expect(screen.getByTestId("divide")).toBeInTheDocument();
    });
});