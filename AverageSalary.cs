using System;
using FLS;
using FLS.MembershipFunctions;
using FLS.Rules;

namespace Backend
{
    public class AverageSalary
    {
        public LinguisticVariable Input;

        public IMembershipFunction Low;
        public IMembershipFunction Medium;
        public IMembershipFunction High;
        public IMembershipFunction VeryHigh;

        public AverageSalary() {
            Input = new LinguisticVariable("averageSalary");
            
            Low = Input.MembershipFunctions.AddTrapezoid("Low", 0, 13000, 16000, 19000);
            Medium = Input.MembershipFunctions.AddTrapezoid("Medium", 19000, 26000, 32000, 35000);
            High = Input.MembershipFunctions.AddTrapezoid("High", 35000, 38000, 42000, 45000);
            VeryHigh = Input.MembershipFunctions.AddGaussian("VeryHigh", 100000, 55000);
        }
    }
}