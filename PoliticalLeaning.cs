using System;
using FLS;
using FLS.MembershipFunctions;
using FLS.Rules;

namespace Backend
{
    public class PoliticalLeaning
    {
        public LinguisticVariable Output;

        public IMembershipFunction HardLeft;
        public IMembershipFunction Left;
        public IMembershipFunction CentreLeft;
        public IMembershipFunction Centre;
        public IMembershipFunction CentreRight;
        public IMembershipFunction Right;
        public IMembershipFunction HardRight;

        public PoliticalLeaning() {
            Output = new LinguisticVariable("politicalLeaning");
            
            HardLeft = Output.MembershipFunctions.AddGaussian("HardLeft", 0, 10);
            Left = Output.MembershipFunctions.AddGaussian("Left", 20, 8);
            CentreLeft = Output.MembershipFunctions.AddGaussian("CentreLeft", 40, 8);
            Centre = Output.MembershipFunctions.AddTriangle("Centre", 40, 50, 60);
            CentreRight = Output.MembershipFunctions.AddGaussian("CentreRight", 60, 8);
            Right = Output.MembershipFunctions.AddGaussian("Right", 80, 8);
            HardRight = Output.MembershipFunctions.AddGaussian("HardRight", 100, 10);
        }
    }
}