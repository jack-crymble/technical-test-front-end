import * as aggregateUtils from "../utils/aggregate.utils";

describe("Aggregate Utils", () => {
    describe("average", () => {
        it("should return 0 if no params given", () => {
            const result = aggregateUtils.average();
            expect(result).toEqual(0);
        });

        it("should return 0 if empty array given", () => {
            const result = aggregateUtils.average([]);
            expect(result).toEqual(0);
        });

        it("should calculate average", () => {
            const result = aggregateUtils.average([1, 2, 3]);
            expect(result).toEqual(2);
        });
    });
    describe("sum", () => {
        it("should return 0 if no params given", () => {
            const result = aggregateUtils.sum();
            expect(result).toEqual(0);
        });

        it("should return 0 if empty array given", () => {
            const result = aggregateUtils.sum([]);
            expect(result).toEqual(0);
        });

        it("should calculate sum", () => {
            const result = aggregateUtils.sum([1, 2]);
            expect(result).toEqual(3);
        });
    });
});
