using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FLS;
using FLS.Rules;
using System.Net.Http;
using System.Net;

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

            //Hard Left Leaning Rules
            var hardLeftRule1 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Medium)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Medium))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Medium))
                .And(averageSalary.Input
                    .Is(averageSalary.High)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.HardLeft));

            //Left Leaning Rules
            var leftRule1 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.High)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Medium))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.Left));

            var leftRule2 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.High)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Low))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.Left));

            var leftRule3 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Medium)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Low))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.High))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.Left));

            //Centre Left Leaning Rules
            var centreLeftRule1 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.High)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Medium))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Medium))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.CentreLeft));

            var centreLeftRule2 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Medium)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.High))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.CentreLeft));

            var centreLeftRule3 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Medium)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Medium))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.VeryHigh)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.CentreLeft));

            //Centre Leaning Rules
            var centreRule1 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Medium)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Low))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.Centre));

            var centreRule2 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.VeryHigh)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.High))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.VeryHigh))
                .And(averageSalary.Input
                    .Is(averageSalary.VeryHigh)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.Centre));

            //Centre Right Leaning Rules
            var centreRightRule1 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Low)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Low))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Medium))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.CentreRight));

            var centreRightRule2 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Medium)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.High))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.High)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.CentreRight));

            var centreRightRule3 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Medium)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Medium))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.High)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.CentreRight));

            //Right Leaning Rules
            var rightRule1 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Low)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Low))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.Right));

            var rightRule2 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.VeryLow)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Low))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.Medium)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.Right));

            var rightRule3 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Medium)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Low))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.High)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.Right));

            //Hard Right Leaning Rules
            var hardRightRule1 = Rule
                .If(populationDensity.Input
                    .Is(populationDensity.Low)
                .And(nonWhiteBritishEthnicityPercentage.Input
                    .Is(nonWhiteBritishEthnicityPercentage.Low))
                .And(numberOfUniversities.Input
                    .Is(numberOfUniversities.Low))
                .And(averageSalary.Input
                    .Is(averageSalary.High)))
                .Then(politicalLeaning.Output
                    .Is(politicalLeaning.HardRight));


            fuzzyEngine.Rules.Add(hardLeftRule1, leftRule1, leftRule2, leftRule3, centreLeftRule1, centreLeftRule2, centreLeftRule3, centreRule1, centreRule2, centreRightRule1, centreRightRule2, centreRightRule3, rightRule1, rightRule2, rightRule3, hardRightRule1);
        }


        [HttpGet]
        public object Get(double population_density, double non_white_british_ethnicity_percentage, double number_of_universities, double average_salary)
        {
            var result = fuzzyEngine.Defuzzify(new {
                populationDensity = population_density,
                nonWhiteBritishEthnicityPercentage = non_white_british_ethnicity_percentage,
                numberOfUniversities = number_of_universities,
                averageSalary = average_salary
            });

            if (Double.IsNaN(result)) {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            return new {
                fuzzifiedOutput = result
            };
        }
    }
}
