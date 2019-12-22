import IAttributes from '../interfaces/IAttributes';
import IProvince from '../interfaces/IProvince';
import { PoliticalLeaning } from '../interfaces/IDecision';

export const attributesAreBelowZero = ({
    financial,
    populationHappiness,
    domesticPoliticalFavour,
    foreignPoliticalFavour
}: IAttributes) => {
    return (
        financial <= 0 ||
        populationHappiness <= 0 ||
        domesticPoliticalFavour <= 0 ||
        foreignPoliticalFavour <= 0
    );
}

export const getPoliticalLeaning = (province: IProvince): PoliticalLeaning => {
    //Do some calculations here using fuzzy logic that use the factors of a given
    //province to work out a political leaning for said region.

    return (Math.floor(Math.random() * Math.floor(6))) as PoliticalLeaning;
}

export const getPoliticalLeaningAsString = (province: IProvince): string => {
    return "Left";
}