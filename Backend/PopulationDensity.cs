using System;
using FLS;
using FLS.MembershipFunctions;
using FLS.Rules;

namespace Backend
{
    public class PopulationDensity
    {
        public LinguisticVariable Input;

        public IMembershipFunction VeryLow;
        public IMembershipFunction Low;
        public IMembershipFunction Medium;
        public IMembershipFunction High;
        public IMembershipFunction VeryHigh;

        public PopulationDensity() {
            Input = new LinguisticVariable("populationDensity");

            VeryLow = Input.MembershipFunctions.AddTrapezoid("VeryLow", 0, 40, 80, 120);
            Low = Input.MembershipFunctions.AddTrapezoid("Low", 100, 300, 650, 1000);
            Medium = Input.MembershipFunctions.AddTriangle("Medium", 100, 3000, 9000);
            High = Input.MembershipFunctions.AddGaussian("High", 11000, 2000);
            VeryHigh = Input.MembershipFunctions.AddGaussian("VeryHigh", 17000, 4000);
        }
    }
}
