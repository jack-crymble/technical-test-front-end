import * as aggregateUtils from "../utils/aggregate.utils";
import NumberDisplay from "../components/number-display";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("NumberDisplay", () => {
    let mockValues = [1, 2, 3, 4, 5];

    describe("Average", () => {
        beforeEach(() => {
            jest.spyOn(aggregateUtils, "average").mockReturnValue(3);
        });

        it("should render correctly", () => {
            const { getByText } = render(
                <NumberDisplay
                    title="Test Avg"
                    aggregate="avg"
                    values={mockValues}
                />
            );

            expect(aggregateUtils.average).toHaveBeenCalledWith(mockValues);

            expect(getByText("Test Avg")).toBeInTheDocument();
            expect(getByText("3")).toBeInTheDocument();
        });
    });

    describe("Sum", () => {
        beforeEach(() => {
            jest.spyOn(aggregateUtils, "sum").mockReturnValue(15);
        });

        it("should render correctly", () => {
            const { getByText } = render(
                <NumberDisplay
                    title="Test Sum"
                    aggregate="sum"
                    values={mockValues}
                />
            );

            expect(aggregateUtils.sum).toHaveBeenCalledWith(mockValues);

            expect(getByText("Test Sum")).toBeInTheDocument();
            expect(getByText("15")).toBeInTheDocument();
        });
    });
    describe("Min", () => {
        beforeEach(() => {
            jest.spyOn(Math, "min").mockReturnValue(1);
        });
        it("should render correctly", () => {
            const { getByText } = render(
                <NumberDisplay
                    title="Test"
                    aggregate="min"
                    values={mockValues}
                />
            );
            expect(Math.min).toHaveBeenCalledWith(mockValues);

            expect(getByText("Test")).toBeInTheDocument();
            expect(getByText("1")).toBeInTheDocument();
        });
    });
    describe("Max", () => {
        beforeEach(() => {
            jest.spyOn(Math, "max").mockReturnValue(5);
        });

        it("should render correctly", () => {
            const { getByText } = render(
                <NumberDisplay
                    title="Test"
                    aggregate="max"
                    values={mockValues}
                />
            );

            expect(Math.max).toHaveBeenCalledWith(mockValues);
            expect(getByText("Test")).toBeInTheDocument();
            expect(getByText("5")).toBeInTheDocument();
        });
    });

    describe("default", () => {
        beforeEach(() => {
            jest.spyOn(console, "error").mockImplementation(jest.fn());
        });
        it("should render Error component", () => {
            render(
                <NumberDisplay
                    title="Test"
                    aggregate="unknown"
                    values={mockValues}
                />
            );

            expect(console.error).toHaveBeenCalled();
        });
    });
});
