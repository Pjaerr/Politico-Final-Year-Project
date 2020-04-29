require './fuzzyfic-0.0.1/lib/fuzzyfic'

# Fuzzy Logic (to be put into a seperate file/scope and accessed as a function)
populationDensityMin = 20
populationDensityMax = 17000
populationDensity = {
    veryLow: Fuzzyfic::Trapezoid.new([0, 40], [80, 120]),
    low: Fuzzyfic::Trapezoid.new([100, 300], [650, 1000]),
    medium: Fuzzyfic::Triangle.new([1000, 9000], 3000),
    high: Fuzzyfic::Gaussian.new([populationDensityMin, populationDensityMax], 11000, 2000),
    veryHigh: Fuzzyfic::Gaussian.new([populationDensityMin, populationDensityMax], 17000, 4000)
}

nonWhiteBritishEthnicPercentageMin = 0
nonWhiteBritishEthnicPercentageMax = 100
nonWhiteBritishEthnicPercentage = {
    low: Fuzzyfic::Gaussian.new([nonWhiteBritishEthnicPercentageMin, nonWhiteBritishEthnicPercentageMax], 0, 8.25),
    medium: Fuzzyfic::Gaussian.new([nonWhiteBritishEthnicPercentageMin, nonWhiteBritishEthnicPercentageMax], 18, 4.25),
    high: Fuzzyfic::Gaussian.new([nonWhiteBritishEthnicPercentageMin, nonWhiteBritishEthnicPercentageMax], 49.5, 8.25),
    veryHigh: Fuzzyfic::Gaussian.new([nonWhiteBritishEthnicPercentageMin, nonWhiteBritishEthnicPercentageMax], 100, 17.5)
}

numberOfUniversitiesMin = 0
numberOfUniversitiesMax = 40
numberOfUniversities = {
    low: Fuzzyfic::Triangle.new([-4, 4], 0),
    medium: Fuzzyfic::Gaussian.new([numberOfUniversitiesMin, numberOfUniversitiesMax], 8, 4),
    high: Fuzzyfic::Gaussian.new([numberOfUniversitiesMin, numberOfUniversitiesMax], 20, 4),
    veryHigh: Fuzzyfic::Gaussian.new([numberOfUniversitiesMin, numberOfUniversitiesMax], 40, 12)
}

averageSalaryMin = 13000
averageSalaryMax = 100000
averageSalary = {
    low: Fuzzyfic::Trapezoid.new([0, 13000], [16000, 19000]),
    medium: Fuzzyfic::Trapezoid.new([19000, 26000], [32000, 35000]),
    high: Fuzzyfic::Trapezoid.new([35000, 38000], [42000, 45000]),
    veryHigh: Fuzzyfic::Gaussian.new([averageSalaryMin, averageSalaryMax], 100000, 55000),
}

politicalLeaningMin = 0
politicalLeaningMax = 100
politicalLeaning = {
    hardLeft: Fuzzyfic::Gaussian.new([politicalLeaningMin, politicalLeaningMax], 0, 10),
    left: Fuzzyfic::Gaussian.new([politicalLeaningMin, politicalLeaningMax], 20, 8),
    centreLeft: Fuzzyfic::Gaussian.new([politicalLeaningMin, politicalLeaningMax], 40, 8),
    centre: Fuzzyfic::Triangle.new([40, 60], 50),
    centreRight: Fuzzyfic::Gaussian.new([politicalLeaningMin, politicalLeaningMax], 60, 8),
    right: Fuzzyfic::Gaussian.new([politicalLeaningMin, politicalLeaningMax], 80, 8),
    hardRight: Fuzzyfic::Gaussian.new([politicalLeaningMin, politicalLeaningMax], 100, 10)
}

$rules = []

#There is an `and` function defined, but exists on Fuzzyfic::Triangle, Guassian etc objects
#so will need to be called within the brackets instead of on the outside

# Hard Left Rules
$rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:medium].and(numberOfUniversities[:medium].and(averageSalary[:high]))).then politicalLeaning[:hardLeft]

# Left Rules
$rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:low].and(numberOfUniversities[:high].and(averageSalary[:medium]))).then politicalLeaning[:left]

$rules.push populationDensity[:high].and(nonWhiteBritishEthnicPercentage[:low].and(numberOfUniversities[:low].and(averageSalary[:medium]))).then politicalLeaning[:left]

$rules.push populationDensity[:high].and(nonWhiteBritishEthnicPercentage[:medium].and(numberOfUniversities[:low].and(averageSalary[:medium]))).then politicalLeaning[:left]

# Centre-Left Rules
$rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:medium].and(numberOfUniversities[:low].and(averageSalary[:veryHigh]))).then politicalLeaning[:centreLeft]

$rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:high].and(numberOfUniversities[:low].and(averageSalary[:medium]))).then politicalLeaning[:centreLeft]

$rules.push populationDensity[:high].and(nonWhiteBritishEthnicPercentage[:medium].and(numberOfUniversities[:medium].and(averageSalary[:medium]))).then politicalLeaning[:centreLeft]

# Centre Rules
$rules.push populationDensity[:veryHigh].and(nonWhiteBritishEthnicPercentage[:high].and(numberOfUniversities[:veryHigh].and(averageSalary[:veryHigh]))).then politicalLeaning[:centre]

$rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:low].and(numberOfUniversities[:low].and(averageSalary[:medium]))).then politicalLeaning[:centre]

# Centre-Right Rules
$rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:medium].and(numberOfUniversities[:low].and(averageSalary[:high]))).then politicalLeaning[:centreRight]

$rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:high].and(numberOfUniversities[:low].and(averageSalary[:high]))).then politicalLeaning[:centreRight]

$rules.push populationDensity[:low].and(nonWhiteBritishEthnicPercentage[:low].and(numberOfUniversities[:medium].and(averageSalary[:medium]))).then politicalLeaning[:centreRight]

# Right Rules
$rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:low].and(numberOfUniversities[:low].and(averageSalary[:high]))).then politicalLeaning[:right]

$rules.push populationDensity[:veryLow].and(nonWhiteBritishEthnicPercentage[:low].and(numberOfUniversities[:low].and(averageSalary[:medium]))).then politicalLeaning[:right]

$rules.push populationDensity[:low].and(nonWhiteBritishEthnicPercentage[:low].and(numberOfUniversities[:low].and(averageSalary[:medium]))).then politicalLeaning[:right]

# Hard-Right Rules
$rules.push populationDensity[:low].and(nonWhiteBritishEthnicPercentage[:low].and(numberOfUniversities[:low].and(averageSalary[:high]))).then politicalLeaning[:hardRight]

# Apply rules using Centroid
#1: populationDensity
#2: nonWhiteBritishEthnicPercentage
#3: numberOfUniversities
#4: averageSalary

def defuzzify(population_density, non_white_british_ethnic_percentage, number_of_universities, average_salary)
    return Fuzzyfic::Defuzzifier.cog($rules, population_density, non_white_british_ethnic_percentage, number_of_universities, average_salary);
end