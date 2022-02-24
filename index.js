console.log("hi, this is the start of a new BMI Calc with functions")

let weightInKg = parseInt(process.argv[2]);
let heightInM = parseFloat(process.argv[3]);
let ageInYears = parseInt(process.argv[4]);
let dailyExercise = process.argv[5];
let gender = process.argv[6];
let BMI = calculateBMI(weightInKg, heightInM);
let idealWeight = calculateIdealWeight(heightInM);
let BMR = calculateBMR(weightInKg, heightInM, ageInYears, gender);
let dailyCalories = calculateDailyRoutine(BMR, dailyExercise);
let weightToLose = weightInKg - idealWeight;
let dietWeeks = calculateDailyRoutine(weightToLose);

function calculateBMI() {
    return Math.floor(weightInKg / (heightInM * heightInM));
}
// Checkpoint calculateBMI
console.log(calculateBMI);


function calculateIdealWeight(height) {
    return 22.5 * heightInM  * heightInM;
}
// Checkpoint calculateIdealWeight
console.log(calculateIdealWeight);

function calculateBMR(weightInKg, heightInM, ageInYears, gender) {
    const heightInCm = heightInM * 100;

    let BMR;
    if (gender === "male") {
        BMR = 10 * weightInKg + 6.25 * heightInM - 5 * ageInYears + 50;
    }   else {
        BMR = 10 * weightInKg + 6.25 * heightInM - 5 * ageInYears - 150;
    }
    return BMR;
}
// Checkpoint BMR
console.log(calculateBMR);


function calculateDailyRoutine(BMR,dailyCalories) {
    return dailyExercise === "yes"
        ? Math.floor(BMR * 1.6)
        : Math.floor(BMR * 1.4);
    }
//Checkpoint calculateDailyRoutine
console.log(calculateDailyRoutine);

function dietaryPlan(weightToLose) {
    return Math.abs(weightToLose / 0.5);
}
// Checkpoint dietaryPlan
console.log(dietaryPlan);

function validateNumberOfInputs(argv) {
    if (argv.length !== 7) {
        console.log(`
            You gave ${argv.length -2} arguments to the program
        
            Please make sure to provide 5 arguments for the following categories:
        
            - weight in kg
            - height in m
            - age in years
            - do you exercise daily yes or no
            - gender male or female
        
            For example:
            $ node index.js 72 1.78 31 yes male
        
            With the right inputs you'll receive the desired output.
            `);
        process.exit();
    }
}

function validateWeightHeightAndAge(weightInKg, heightInM, ageInYears, argv) {
    if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(ageInYears)) {
        console.log(`
            Please provide correct your input to match the following example:
            
            - Weight in Kg, example: 72  | your input was: ${argv[2]}
            - Height in m, example: 1.78 | your input was: ${argv[3]}
            - Age in years, example: 31  | your input was: ${argv[4]}
            
            Full example or correct input:
            $ node index.js 72 1.78 31 yes male

            Please try again, the program will now exit automatically...
            Thank you for your understanding!
        `);
        process.exit();
    }

    if (ageInYears < 20) {
        console.log(`
            This BMI calculator is intended for people of age 20 and higher.
            Calculating a BMI for younger people requieres a different set of parameters.

            Please visit: https://en.wikipedia.org/wiki/Body_mass_index#Children_(aged_2_to_20)
  
            For more information. Thank you.
        `);
        process.exit();
    }

    if (weightInKg < 30 || weightInKg > 300) {
        console.log(`
            Please enter a weight in kgs between 30 and 300.
            Your weight input of ${argv[2]} kgs is not within the measurable parameters. 
            If your weight is input correctly and cannot be measured by this calculator,
            please seek professional medical help for assistance.
            `);
        process.exit();

    }
}

function validateDailyExercise(dailyExercise) {
    if (dailyExercise !== "yes" && dailyExercise !== "no") {
        console.log(`
            Please inform the calculator truthfully if you exercise daily yes or no
            You entered: ${dailyExercise}
            The result will be diluted without honest answers. 
            Be honest with yourself and you will be met with honesty all around.
        `);
        process.exit();
    }
}

function validateGender(gender) {
    if (gender !== "male" && gender !== "female") {
        console.log(`
            Please declare your gender. For this calculator to work,
            your biological gender at birth is requiered. Any different identification
            although accepted is not calculable by this program.
            You entered: ${gender}
        `);
        process.exit();
    }
}

function formatOutput(userObject) {
    return  `   
        ______________
        BMI CALCULATOR
        ==============
    
        age: ${ageInYears} years
        gender: ${gender}
        height: ${heightInM} m
        weight: ${weightInKg} kg
        do you exercise daily? ${dailyExercise}
    
        ****************
        FACING THE FACTS
        ****************
    
        Your BMI is ${BMI}
    
        A BMI under 18.5 is considered underweight
        A BMI above 25 is considered overweight
    
        Your ideal weight is ${idealWeight} kg
        With a normal lifestyle you burn ${dailyCalories} calories a day
    
        **********
        DIET PLAN
        **********
    
        If you want to reach your ideal weight of ${idealWeight} kg:
    
        Eat ${dailyCalories} calories a day
        For ${dietWeeks} weeks
        `;
}

function bmiCalculator() {
    validateNumberOfInputs(process.argv);

    let weightInKg = parseInt(process.argv[2]);
    let heightInM = parseFloat(process.argv[3]);
    let ageInYears = parseInt(process.argv[4]);
    let dailyExercise = process.argv[5];
    let gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, ageInYears, process.argv);
    validateDailyExercise(dailyExercise);
    validateGender(gender);

    let BMI = calculateBMI(weightInKg, heightInM);
    let idealWeight = calculateIdealWeight(heightInM);
    let BMR = calculateBMR(weightInKg, heightInM, ageInYears, gender);
    let dailyCalories = calculateDailyRoutine(BMR, dailyExercise);
    const weightToLose = weightInKg - idealWeight;
    let dietWeeks = calculateDailyRoutine(weightToLose);

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        ageInYears: ageInYears,
        dailyExcerise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeight: idealWeight,
        dailyCalories: dailyCalories,
        weightToLose: weightToLose,
        dietWeeks: dietWeeks,
    };

    const output = formatOutput(user);

    console.log(output);
}

    // console.log("Checking the values of Input");
    // console.log("Weight: ", weightInKg);
    // console.log("Height: ", heightInM);
    // console.log("Age: ", ageInYears);
    // console.log("Exercising: ", dailyExercise);
    // console.log("Gender: ", gender);
    // console.log("BMI: ", BMI);
    // console.log("Ideal Weight: ", idealWeight);
    // console.log("BMR: ", BMR);
    // console.log("Dailycalories: ", dailyCalories);
    // console.log("Weight to lose: ", weightToLose);
    // console.log("DietWeeks: ", dietWeeks);

bmiCalculator();

