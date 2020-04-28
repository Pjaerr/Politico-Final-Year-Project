require 'webrick'
require 'json'
require 'fuzzyfic'

if ENV['PORT'] == nil
    puts "PORT Environment Variable not defined"
end

# Setup simple HTTP server to serve static React assets
root = File.join(File.dirname(__FILE__), '../build')
server = WEBrick::HTTPServer.new :Port => ENV['PORT'], :DocumentRoot => root

# Fuzzy Logic (to be put into a seperate file/scope and accessed as a function)
populationDensityMin = 20
populationDensityMax = 17000
populationDensity = {
    veryLow: Fuzzyfic::Trapezoidal.new([0, 40], [80, 120]),
    low: Fuzzyfic::Trapezoidal.new([100, 300], [650, 1000]),
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
    low: Fuzzyfic::Trapezoidal.new([0, 13000], [16000, 19000]),
    medium: Fuzzyfic::Trapezoidal.new([19000, 26000], [32000, 35000]),
    high: Fuzzyfic::Trapezoidal.new([35000, 38000], [42000, 45000]),
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

rules = []

# Hard Left Rules
rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:medium]).and(numberOfUniversities[:medium]).and(averageSalary[:high]).then politicalLeaning[:hardLeft]

# Left Rules
rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:low]).and(numberOfUniversities[:high]).and(averageSalary[:medium]).then politicalLeaning[:left]

rules.push populationDensity[:high].and(nonWhiteBritishEthnicPercentage[:low]).and(numberOfUniversities[:low]).and(averageSalary[:medium]).then politicalLeaning[:left]

rules.push populationDensity[:high].and(nonWhiteBritishEthnicPercentage[:medium]).and(numberOfUniversities[:low]).and(averageSalary[:medium]).then politicalLeaning[:left]

# Centre-Left Rules
rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:medium]).and(numberOfUniversities[:low]).and(averageSalary[:veryHigh]).then politicalLeaning[:centreLeft]

rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:high]).and(numberOfUniversities[:low]).and(averageSalary[:medium]).then politicalLeaning[:centreLeft]

rules.push populationDensity[:high].and(nonWhiteBritishEthnicPercentage[:medium]).and(numberOfUniversities[:medium]).and(averageSalary[:medium]).then politicalLeaning[:centreLeft]

# Centre Rules
rules.push populationDensity[:veryHigh].and(nonWhiteBritishEthnicPercentage[:high]).and(numberOfUniversities[:veryHigh]).and(averageSalary[:veryHigh]).then politicalLeaning[:centre]

rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:low]).and(numberOfUniversities[:low]).and(averageSalary[:medium]).then politicalLeaning[:centre]

# Centre-Right Rules
rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:medium]).and(numberOfUniversities[:low]).and(averageSalary[:high]).then politicalLeaning[:centreRight]

rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:high]).and(numberOfUniversities[:low]).and(averageSalary[:high]).then politicalLeaning[:centreRight]

rules.push populationDensity[:low].and(nonWhiteBritishEthnicPercentage[:low]).and(numberOfUniversities[:medium]).and(averageSalary[:medium]).then politicalLeaning[:centreRight]

# Right Rules
rules.push populationDensity[:medium].and(nonWhiteBritishEthnicPercentage[:low]).and(numberOfUniversities[:low]).and(averageSalary[:high]).then politicalLeaning[:right]

rules.push populationDensity[:veryLow].and(nonWhiteBritishEthnicPercentage[:low]).and(numberOfUniversities[:low]).and(averageSalary[:medium]).then politicalLeaning[:right]

rules.push populationDensity[:low].and(nonWhiteBritishEthnicPercentage[:low]).and(numberOfUniversities[:low]).and(averageSalary[:medium]).then politicalLeaning[:right]

# Hard-Right Rules
rules.push populationDensity[:low].and(nonWhiteBritishEthnicPercentage[:low]).and(numberOfUniversities[:low]).and(averageSalary[:high]).then politicalLeaning[:hardRight]


#Define API response structure
def API_RESPONSE(status, body)
    JSON.generate({:status => status, :body => body});
end

# API Routes
server.mount_proc '/api/fuzzy' do |req, res|

    populationDensity = req.query['populationDensity']
    nonWhiteBritishEthnicPercentage = req.query['nonWhiteBritishEthnicPercentage']
    numberOfUniversities = req.query['numberOfUniversities']
    averageSalary = req.query['averageSalary']

    if (populationDensity == nil or nonWhiteBritishEthnicPercentage == nil or numberOfUniversities == nil or averageSalary == nil)
        res.body = API_RESPONSE(400, "One or more query parameters are missing. You must provide 'populationDensity', 'nonWhiteBritishEthnicPercentage', 'numberOfUniversities', 'averageSalary'")
    else
        #Do the fuzzy logic stuff



        res.body = 'You alright love?'
    end
end


trap 'INT' do server.shutdown end

server.start