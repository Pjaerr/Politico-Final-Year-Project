using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FuzzyLogicController : ControllerBase
    {
        //Define all of the fuzzy logic inputs and output and rules here and then the
        //Get() action can return whatever the defuzzified output is
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<FuzzyLogicController> _logger;

        public FuzzyLogicController(ILogger<FuzzyLogicController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<DefuzzifiedOutput> Get()
        {
            // var rng = new Random();
            // return Enumerable.Range(1, 5).Select(index => new DefuzzifiedOutput
            // {
            //     Date = DateTime.Now.AddDays(index),
            //     TemperatureC = rng.Next(-20, 55),
            //     Summary = Summaries[rng.Next(Summaries.Length)]
            // })
            // .ToArray();
        }
    }
}
