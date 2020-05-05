using System;
using FLS;
using FLS.MembershipFunctions;
using FLS.Rules;

namespace Backend
{
    public class NonWhiteBritishEthnicityPercentage
    {
        public LinguisticVariable Input;

        public IMembershipFunction Low;
        public IMembershipFunction Medium;
        public IMembershipFunction High;
        public IMembershipFunction VeryHigh;

        public NonWhiteBritishEthnicityPercentage() {
            Input = new LinguisticVariable("nonWhiteBritishEthnicityPercentage");
            
            Low = Input.MembershipFunctions.AddGaussian("Low", 0, 8.25);
            Medium = Input.MembershipFunctions.AddGaussian("Medium", 18, 4.25);
            High = Input.MembershipFunctions.AddGaussian("High", 49.5, 8.25);
            VeryHigh = Input.MembershipFunctions.AddGaussian("VeryHigh", 100, 17.5);
        }
    }
}