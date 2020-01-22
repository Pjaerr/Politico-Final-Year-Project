%Clear the console
clc

%Turn console warnings off
warning('off','all')

%Create a new FIS with default settings
%            Name    Type       AND    OR     Impl   Agg    Defuzz Method
FIS = newfis('FIS', 'mamdani', 'min', 'max', 'min', 'max', 'centroid');


%      _____                   _       
%     |_   _|                 | |      
%       | |  _ __  _ __  _   _| |_ ___ 
%       | | | '_ \| '_ \| | | | __/ __|
%      _| |_| | | | |_) | |_| | |_\__ \
%     |_____|_| |_| .__/ \__,_|\__|___/
%                 | |                  
%                 |_|                  


%Population Density Per Square Km Input (1) (min: 20, max: 17,000)
% Very Low -> Low -> Medium -> High -> Very High
FIS = addvar(FIS, 'input', 'Population Density Per Square Km', [20 17000]);

%Population Density Per Square Km | Very Low | Trapezoidal
%0 -> 40 -> 80 -> 120
FIS = addmf(FIS, 'input', 1, 'Very Low', 'trapmf', [0 40 80 120]);

%Population Density Per Square Km | Low | Trapezoidal
%100 -> 300 -> 650 -> 1000
FIS = addmf(FIS, 'input', 1, 'Low', 'trapmf', [100 300 650 1000]);

%Population Density Per Square Km | Medium | Triangular
%1000 -> 3000 -> 9000
FIS = addmf(FIS, 'input', 1, 'Medium', 'trimf', [1000 3000 9000]);

%Population Density Per Square Km | High | Gaussian
%Width: 2,000 | Centre: 11,000
FIS = addmf(FIS, 'input', 1, 'High', 'gaussmf', [2000 11000]);

%Population Density Per Square Km | Very High | Gaussian
%Width: 4,000 | Centre: 17,000
FIS = addmf(FIS, 'input', 1, 'Very High', 'gaussmf', [4000 17000]);


%---------------------------------------------------------------------


%Non White-British Ethnic Percentage Input (2) (min: 0, max: 100)
%Low -> Medium -> High -> Very High
FIS = addvar(FIS, 'input', 'Non White-British Ethnic Percentage', [0 100]);

%Non White-British Ethnic Percentage | Low | Gaussian
%Width: 8.25 | Centre: 0
FIS = addmf(FIS, 'input', 2, 'Low', 'gaussmf', [8.25 0]);

%Non White-British Ethnic Percentage | Medium | Gaussian
%Width: 4.25 | Centre: 18
FIS = addmf(FIS, 'input', 2, 'Medium', 'gaussmf', [4.25 18]);

%Non White-British Ethnic Percentage | High | Gaussian
%Width: 8.25 | Centre: 49.5
FIS = addmf(FIS, 'input', 2, 'High', 'gaussmf', [8.25 49.5]);

%Non White-British Ethnic Percentage | Very High | Gaussian
%Width: 17.5 | Centre: 100
FIS = addmf(FIS, 'input', 2, 'Very High', 'gaussmf', [17.5 100]);


%-------------------------------------------------------------------


%Number of Universities Input (3) (min: 0, max: 40)
%Low -> Medium -> High -> Very High
FIS = addvar(FIS, 'input', 'Number of Universities', [0 40]);

%Number of Universities | Low | Triangular
%-4 -> 0 -> 4
FIS = addmf(FIS, 'input', 3, 'Low', 'trimf', [-4 0 4]);

%Number of Universities | Medium | Gaussian
%Width: 4 | Centre: 8
FIS = addmf(FIS, 'input', 3, 'Medium', 'gaussmf', [4 8]);

%Number of Universities | High | Gaussian
%Width: 4 | Centre: 20
FIS = addmf(FIS, 'input', 3, 'High', 'gaussmf', [4 20]);

%Number of Universities | Very High | Gaussian
%Width: 12 | Centre: 40
FIS = addmf(FIS, 'input', 3, 'Very High', 'gaussmf', [12 40]);


%-----------------------------------------------------------------


% Average Salary Input (4) (min: 13,000, max: 100,000)
% Low -> Medium -> High -> Very High
FIS = addvar(FIS, 'input', 'Average Salary', [13000 100000]);

%Average Salary | Low | Trapezoidal
%0 -> 13,000 -> 16,000 -> 19,000
FIS = addmf(FIS, 'input', 4, 'Low', 'trapmf', [0 13000 16000 19000]);

%Average Salary| Medium | Trapezoidal
%19,000 -> 26,000 -> 32,000 -> 35,000
FIS = addmf(FIS, 'input', 4, 'Medium', 'trapmf', [ 19000 26000 32000 35000]);

%Average Salary| High | Trapezoidal
%35,000 -> 38,000 -> 42,000 -> 45,000
FIS = addmf(FIS, 'input', 4, 'High', 'trapmf', [35000 38000 42000 45000]);

%Average Salary | Very High | Gaussian
%width: 55,000| centre: 100,000
FIS = addmf(FIS, 'input', 4, 'Very High', 'gaussmf', [55000 100000]);

%      _____       _          
%     |  __ \     | |         
%     | |__) _   _| | ___ ___ 
%     |  _  | | | | |/ _ / __|
%     | | \ | |_| | |  __\__ \
%     |_|  \_\__,_|_|\___|___/


%Hard-Left Rules
%--------------------------------------------------------------------------------------------------
%[Population Density is Medium AND Non White-British Ethnic Percentage is Medium AND
%Number of Universities is Medium AND Average Salary is High then Political Leaning is Hard-Left]
hardLeftRule1 = [3 2 2 3 1 1 1];
%--------------------------------------------------------------------------------------------------


%Left Rules
%--------------------------------------------------------------------------------------------------
%[Population Density is Medium AND Non White-British Ethnic Percentage is Low AND
%Number of Universities is High AND Average Salary is Medium then Political Leaning is Left]
leftRule1 = [3 1 3 2 2 1 1];

%[Population Density is High AND Non White-British Ethnic Percentage is Low AND
%Number of Universities is Low AND Average Salary is Medium then Political Leaning is Left]
leftRule2 = [4 1 1 2 2 1 1];

%[Population Density is High AND Non White-British Ethnic Percentage is Medium AND
%Number of Universities is Low AND Average Salary is Medium then Political Leaning is Left]
leftRule3 = [4 2 1 2 2 1 1];
%--------------------------------------------------------------------------------------------------


%Centre-Left Rules
%--------------------------------------------------------------------------------------------------
%[Population Density is Medium AND Non White-British Ethnic Percentage is Medium AND
%Number of Universities is Low AND Average Salary is Very High then Political Leaning is Centre-Left]
centreLeftRule1 = [3 2 1 4 3 1 1];

%[Population Density is Medium AND Non White-British Ethnic Percentage is High AND
%Number of Universities is Low AND Average Salary is Medium then Political Leaning is Centre-Left]
centreLeftRule2 = [3 3 1 2 3 1 1];

%[Population Density is High AND Non White-British Ethnic Percentage is Medium AND
%Number of Universities is Medium AND Average Salary is Medium then Political Leaning is Centre-Left]
centreLeftRule3 = [4 2 2 2 3 1 1];
%--------------------------------------------------------------------------------------------------


%Centre Rules
%--------------------------------------------------------------------------------------------------
%[Population Density is Very High AND Non White-British Ethnic Percentage is High AND
%Number of Universities is Very High AND Average Salary is Very High then Political Leaning is Centre]
centreRule1 = [5 3 4 4 4 1 1];

%[Population Density is Medium AND Non White-British Ethnic Percentage is Low AND
%Number of Universities is Low AND Average Salary is Medium then Political Leaning is Centre]
centreRule2 = [3 1 1 2 4 1 1];
%--------------------------------------------------------------------------------------------------


%Centre-Right Rules
%--------------------------------------------------------------------------------------------------
%[Population Density is Medium OR Non White-British Ethnic Percentage is Medium OR
%Number of Universities is Low OR Average Salary is High then Political Leaning is Centre-Right]
centreRightRule1 = [3 2 1 3 5 1 1];

%[Population Density is Medium AND Non White-British Ethnic Percentage is High AND
%Number of Universities is Low AND Average Salary is High then Political Leaning is Centre-Right]
centreRightRule2 = [3 3 1 3 5 1 1];

%[Population Density is Low AND Non White-British Ethnic Percentage is Low AND
%Number of Universities is Medium AND Average Salary is Medium then Political Leaning is Centre-Right]
centreRightRule3 = [2 1 2 2 5 1 1];
%--------------------------------------------------------------------------------------------------


%Right Rules
%--------------------------------------------------------------------------------------------------
%[Population Density is Medium AND Non White-British Ethnic Percentage is Low AND
%Number of Universities is Low AND Average Salary is High then Political Leaning is Right]
rightRule1 = [3 1 1 3 6 1 1];

%[Population Density is Very Low AND Non White-British Ethnic Percentage is Low AND
%Number of Universities is Low AND Average Salary is Medium then Political Leaning is Right]
rightRule2 = [1 1 1 2 6 1 1];

%[Population Density is Low AND Non White-British Ethnic Percentage is Low AND
%Number of Universities is Low AND Average Salary is Medium then Political Leaning is Right]
rightRule3 = [2 1 1 2 6 1 1];
%--------------------------------------------------------------------------------------------------


%Hard-Right Rules
%--------------------------------------------------------------------------------------------------
%[Population Density is Low AND Non White-British Ethnic Percentage is Low AND
%Number of Universities is Low AND Average Salary is High then Political Leaning is Hard-Right]
hardRightRule1 = [2 1 1 3 7 1 1];
%--------------------------------------------------------------------------------------------------


ruleSet = [hardLeftRule1;

           leftRule1;leftRule2;leftRule3;

           centreLeftRule1;centreLeftRule2;centreLeftRule3;

           centreRule1;centreRule2;

           centreRightRule1;centreRightRule2;centreRightRule3;

           rightRule1;rightRule2;rightRule3;
           
           hardRightRule1];




%       ____        _               _   
%      / __ \      | |             | |  
%     | |  | |_   _| |_ _ __  _   _| |_ 
%     | |  | | | | | __| '_ \| | | | __|
%     | |__| | |_| | |_| |_) | |_| | |_ 
%      \____/ \__,_|\__| .__/ \__,_|\__|
%                      | |              
%                      |_|              

%Political Leaning Output (1) (min: 0, max: 100)
%Hard-Left -> Left -> Centre-Left -> Centre -> Centre-Right -> Right ->
%Hard-Right
FIS = addvar(FIS, 'output', 'Political Leaning', [0 100]);

%Political Leaning | Hard Left | Gaussian
%Width: 10 | Centre: 0
FIS = addmf(FIS, 'output', 1, 'Hard Left', 'gaussmf', [10 0]);

%Political Leaning | Left | Gaussian
%Width: 8 | Centre: 20
FIS = addmf(FIS, 'output', 1, 'Left', 'gaussmf', [8 20]);

%Political Leaning | Centre-Left | Gaussian
%Width: 8 | Centre: 40
FIS = addmf(FIS, 'output', 1, 'Centre-Left', 'gaussmf', [8 40]);

%Political Leaning | Centre | Triangular
%40 -> 50 -> 60
FIS = addmf(FIS, 'output', 1, 'Centre', 'trimf', [40 50 60]);

%Political Leaning | Centre-Right | Gaussian
%Width: 8 | Centre: 60
FIS = addmf(FIS, 'output', 1, 'Centre-Right', 'gaussmf', [8 60]);

%Political Leaning | Right | Gaussian
%Width: 8 | Centre: 80
FIS = addmf(FIS, 'output', 1, 'Right', 'gaussmf', [8 80]);

%Political Leaning | Hard-Right | Gaussian
%Width: 10 | Centre: 100
FIS = addmf(FIS, 'output', 1, 'Hard-Right', 'gaussmf', [10 100]);

FIS = addrule(FIS, ruleSet);

%rules = showrule(FIS)

%ruleview(FIS)

%      _______       _   _             
%     |__   __|     | | (_)            
%        | | ___ ___| |_ _ _ __   __ _ 
%        | |/ _ / __| __| | '_ \ / _` |
%        | |  __\__ | |_| | | | | (_| |
%        |_|\___|___/\__|_|_| |_|\__, |
%                                 __/ |
%                                |___/ 

data = xlsread('CensusData.xlsx');

for i=1:size(data,1)
        eval = evalfis([data(i, 1), data(i, 2), data(i, 3), data(i, 4) ], FIS);
        fprintf('%d)\nPopulation Density: %.2f, \nNon White-British Ethnic Percentage: %.2f, \nNumber of Universities: %.2f, \nAverage Salary: %.2f \n => Out (Political Leaning): %.2f \n\n',i + 2,data(i, 1),data(i, 2),data(i, 3),data(i, 4), eval);  
        
        T = table(data(i, 1), data(i, 2), data(i, 3), data(i, 4), eval)
        writetable(T, 'OutputData.xlsx', 'Sheet', 1,'WriteVariableNames', false, 'Range', join(['A', num2str((i + 2)), ':E', num2str((i + 2))]));
end

%Plot the inputs/outputs
figure(1)
subplot(5, 1, 1), plotmf(FIS, 'input', 1);
subplot(5, 1, 2), plotmf(FIS, 'input', 2);
subplot(5, 1, 3), plotmf(FIS, 'input', 3);
subplot(5, 1, 4), plotmf(FIS, 'input', 4);
subplot(5, 1, 5), plotmf(FIS, 'output', 1);

