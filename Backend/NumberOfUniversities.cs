using System;
using FLS;
using FLS.MembershipFunctions;
using FLS.Rules;

namespace Backend
{
    public class NumberOfUniversities
    {
        public LinguisticVariable Input;

        public IMembershipFunction Low;
        public IMembershipFunction Medium;
        public IMembershipFunction High;
        public IMembershipFunction VeryHigh;

        public NumberOfUniversities() {
            Input = new LinguisticVariable("numberOfUniversities");
            
            Low = Input.MembershipFunctions.AddTriangle("Low", -4, 0, 4);
            Medium = Input.MembershipFunctions.AddGaussian("Medium", 8, 4);
            High = Input.MembershipFunctions.AddGaussian("High", 20, 4);
            VeryHigh = Input.MembershipFunctions.AddGaussian("VeryHigh", 40, 12);
        }
    }
}