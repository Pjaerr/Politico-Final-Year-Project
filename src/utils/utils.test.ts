import { attributesAreBelowZero, generateRandomHappiness, generateRandomPopulation, generateRandomPopulationDensity, generateRandomNumberOfUniversities, generateRandomAverageSalary, generateRandomNonWhiteBritishEthnicPercentage } from "./utils";

describe("Call attributesAreBelowZero() and pass in attributes with a value being 0", () => {
    it("should return true", () => {
        const attributes = {
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
        const attributes = {
            financial: 100,
            populationHappiness: 100,
            domesticPoliticalFavour: 100,
            foreignPoliticalFavour: 100
        };

        expect(attributesAreBelowZero(attributes)).toBe(false);
    });
});

describe("Call generateRandomPopulation()", () => {
    it("should return a whole number between 8,000 and 9,000,000", () => {
        const result = generateRandomPopulation();

        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(8000);
        expect(result).toBeLessThanOrEqual(9000000);
    });
});

describe("Call generateRandomHappiness()", () => {
    it("should return a whole number between 20 and 100", () => {
        const result = generateRandomHappiness();

        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(20);
        expect(result).toBeLessThanOrEqual(100);
    });
});

describe("Call generateRandomPopulationDensity()", () => {
    it("should return a whole number between 20 and 17,000", () => {
        const result = generateRandomPopulationDensity();

        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(20);
        expect(result).toBeLessThanOrEqual(17000);
    });
});

describe("Call generateRandomNumberOfUniversities()", () => {
    it("should return a whole number between 0 and 40", () => {
        const result = generateRandomNumberOfUniversities();

        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(40);
    });
});

describe("Call generateRandomAverageSalary()", () => {
    it("should return a whole number between 13,000 and 100,000", () => {
        const result = generateRandomAverageSalary();

        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(13000);
        expect(result).toBeLessThanOrEqual(100000);
    });
});

describe("Call generateRandomNonWhiteBritishEthnicPercentage()", () => {
    it("should return a whole number between 0 and 100", () => {
        const result = generateRandomNonWhiteBritishEthnicPercentage();

        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(100);
    });
});