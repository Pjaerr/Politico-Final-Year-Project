import { attributesAreBelowZero } from "./utils";
import IAttributes from "../interfaces/IAttributes";

describe("Call attributesAreBelowZero() and pass in attributes with a value being 0", () => {
    it("should return true", () => {
        const attributes: IAttributes = {
            financial: 0,
            populationHappiness: 100,
            domesticPoliticalFavour: 100,
            foreignPoliticalFavour: 100
        };

        expect(attributesAreBelowZero(attributes)).toBe(true);
    });
});

describe("Call attributesAreBelowZero() and pass in attributes with no values being 0", () => {
    it("should return false", () => {
        const attributes: IAttributes = {
            financial: 100,
            populationHappiness: 100,
            domesticPoliticalFavour: 100,
            foreignPoliticalFavour: 100
        };

        expect(attributesAreBelowZero(attributes)).toBe(false);
    });
});
