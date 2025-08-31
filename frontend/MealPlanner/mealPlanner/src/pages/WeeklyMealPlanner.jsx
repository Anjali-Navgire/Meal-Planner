import React, { useState, useEffect } from "react";

const WeeklyMealPlanner = () => {
  const [meals, setMeals] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });

  const [ingredients, setIngredients] = useState([]);


  useEffect(() => {
    const savedMeals = localStorage.getItem("weeklyMeals");
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));  // JSON.parse() => we convert string (list of ingrediens) into arrays before displaying.This allows merging when generating a shopping list.
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("weeklyMeals", JSON.stringify(meals));
  }, [meals]);

  const handleChange = (day, value) => {
    setMeals({ ...meals, [day]: value }); // ...meals => ensures for that specific day, only one field is updated, not the whole object.
  };

  const generateIngredients = async () => {
    try {
      let allIngredients = [];

      for (let day in meals) {
        if (meals[day]) {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${meals[day]}`
          );
          const data = await res.json();
          if (data.meals && data.meals[0]) {
            let meal = data.meals[0];
            let ing = [];
            for (let i = 1; i <= 20; i++) {
              if (meal[`strIngredient${i}`]) {
                ing.push(
                  `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                );
              }
            }
            allIngredients.push(...ing);
          }
        }
      }

      setIngredients(allIngredients);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
    }
  };

  const resetPlan = () => {
    setMeals({
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    });
    setIngredients([]);
    localStorage.removeItem("weeklyMeals");
  };

  return (
    <div>
      <h1>Weekly Meal Planner</h1>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            {Object.keys(meals).map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(meals).map((day) => (
              <td key={day}>
                <input
                  type="text"
                  placeholder={`Meal`}
                  value={meals[day]}
                  onChange={(e) => handleChange(day, e.target.value)}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>


      <button onClick={generateIngredients}>Generate Ingredients List</button>

      <button onClick={resetPlan}>Reset Plan</button>
      <hr />
      <h2>Ingredients Needed</h2>
      <ul>
        {ingredients.map((item, idx) => {
          // item = "Water - 150ml"
          const [name, qty] = item.split(" - ");
          return (
            <li key={idx}>
              {name} - {qty}
            </li>
          );
        })}
      </ul>
      <hr />
    </div>
  );
};

export default WeeklyMealPlanner;
