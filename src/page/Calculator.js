import React, { useState } from "react";

const Calculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(""); // Height in centimeters
  const [weight, setWeight] = useState(""); // Weight in kg
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  const calculateBMI = (heightCm, weightKg) => {
    if (heightCm > 0 && weightKg > 0) {
      // Convert height from centimeters to meters
      const heightInMeters = heightCm / 100; 
      const bmiValue = weightKg / (heightInMeters * heightInMeters);
      return bmiValue.toFixed(2); // Return BMI rounded to 2 decimal places
    }
    return null;
  };

  const determineBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 24.9) return "Normal";
    if (bmiValue < 29.9) return "Overweight";
    return "Obesity";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate age if a valid birth date is provided
    if (birthDate) {
      const calculatedAge = calculateAge(birthDate);
      setAge(calculatedAge);
    }

    // Calculate BMI if height and weight are valid
    const heightInCm = parseFloat(height); // Height in centimeters
    const weightInKg = parseFloat(weight); // Weight in kilograms

    const bmiValue = calculateBMI(heightInCm, weightInKg);
    if (bmiValue) {
      setBmi(bmiValue);
      setBmiCategory(determineBMICategory(bmiValue));
    } else {
      alert("Please enter valid height and weight.");
    }
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-container">
        <h2>Health Calculator</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Birth Date:
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </label>
          <label>
            Height (cm): {/* Changed to cm for easier input */}
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              step="0.1"
            />
          </label>
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              step="0.1"
            />
          </label>
          <button type="submit">Calculate</button>
        </form>

        {age !== null && (
          <div className="results">
            <p>Age: {age} years old</p>
          </div>
        )}

        {bmi && (
          <div className="results">
            <p>BMI: {bmi}</p>
            {/* <p>Category: {bmiCategory}</p> */}
          </div>
        )}

        
      </div>
      {/* Flowchart */}
      <div className="flowchart">
          <h3>BMI Categories</h3>
          <ul>
            <li>Underweight: BMI &lt; 18.5</li>
            <li>Normal: BMI 18.5 - 24.9</li>
            <li>Overweight: BMI 25 - 29.9</li>
            <li>Obesity: BMI &ge; 30</li>
          </ul>
        </div>
    </div>
  );
};

export default Calculator;
