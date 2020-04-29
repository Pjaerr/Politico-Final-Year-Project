using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FLS;
using FLS.Rules;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FuzzyLogicController : ControllerBase
    {
        //Define all of the fuzzy logic inputs and output and rules here and then the
        //Get() action can return whatever the defuzzified output is

        private PopulationDensity populationDensity;
        private NonWhiteBritishEthnicityPercentage nonWhiteBritishEthnicityPercentage;
        private NumberOfUniversities numberOfUniversities;
        private AverageSalary averageSalary;

        private PoliticalLeaning politicalLeaning;

        //Fuzzy Engine and Rules
        IFuzzyEngine fuzzyEngine;

        public FuzzyLogicController() {
            populationDensity = new PopulationDensity();
            nonWhiteBritishEthnicityPercentage = new NonWhiteBritishEthnicityPercentage();
            numberOfUniversities = new NumberOfUniversities();
            averageSalary = new AverageSalary();

            politicalLeaning = new PoliticalLeaning();

            fuzzyEngine = new FuzzyEngineFactory().Default();
            var rule1 = Rule.If(populationDensity.Input.Is(populationDensity.Low)
                            .And(nonWhiteBritishEthnicityPercentage.Input.Is(nonWhiteBritishEthnicityPercentage.Low))
                            .And(numberOfUniversities.Input.Is(numberOfUniversities.Low))
                            .And(averageSalary.Input.Is(averageSalary.Medium)))
                            .Then(politicalLeaning.Output.Is(politicalLeaning.Right));

            fuzzyEngine.Rules.Add(rule1);
        }

        [HttpGet]
        public Backend.HTTPResponse Get(double population_density, double non_white_british_ethnicity_percentage, double number_of_universities, double average_salary)
        {
            var result = fuzzyEngine.Defuzzify(new {
                populationDensity = population_density,
                nonWhiteBritishEthnicityPercentage = non_white_british_ethnicity_percentage,
                numberOfUniversities = number_of_universities,
                averageSalary = average_salary
            });

            return new Backend.HTTPResponse {
                status = 200,
                body = "Result: " + result
            };
        }
    }
}
