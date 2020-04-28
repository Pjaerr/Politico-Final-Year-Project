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