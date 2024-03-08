import React, { useState } from 'react';
import idb from './idb';
import CalorieReport from './calorie-report';
import './App.css';

const App = () => {
  const [calorie, setCalorie] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [description, setDescription] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  

  const handleAddCalories = async () => {
    setResultMessage('');
    if (!calorie || !category || !description) {
      setResultMessage('You must fill all the fields');
      return;
    }

    if (calorie<0) {
      setResultMessage('Calories must be 0 or more');
      return;
    }

    const currentDate = new Date();
    const calorieData = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1, 
      calorie: parseInt(calorie),
      category,
      description,
    };
  
    const result = await idb.addCalories(calorieData);
  
    if (result) {
      console.log('Calories added successfully:', result);
      setResultMessage('Calories added successfully');
      // Add additional feedback to the user if needed
    } else {
      console.error('Failed to add calories');
      // Provide feedback to the user about the failure
    }
  };

  return (
    <div className='container'>
      <h1>Calorie Management Application</h1>
      <label>
        Calories:
        <input type='number' value={calorie} onChange={(e) => setCalorie(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value='Breakfast'>Breakfast</option>
          <option value='Lunch'>Lunch</option>
          <option value='Dinner'>Dinner</option>
          <option value='Other'>Other</option>
        </select>
      </label>
      <label>
        Description:
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button onClick={handleAddCalories}>Add Calories</button>
      <div style={{ color: resultMessage.includes('successfully') ? 'green' : 'red' }}>{resultMessage}</div>

      <CalorieReport />

    </div>
  );
};

export default App;