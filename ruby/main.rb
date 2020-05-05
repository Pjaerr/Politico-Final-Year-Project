require 'webrick'
require 'json'
require './fuzzylogic'

if ENV['PORT'] == nil
    puts "PORT Environment Variable not defined"
end

# Setup simple HTTP server to serve static React assets
root = File.join(File.dirname(__FILE__), '../build')
server = WEBrick::HTTPServer.new :Port => ENV['PORT'], :DocumentRoot => root

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

        result = defuzzify(3270, 36, 3, 38800)

        res.body = API_RESPONSE(200, result);
    end
end


trap 'INT' do server.shutdown end

server.start