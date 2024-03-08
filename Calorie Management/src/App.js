/*
Students: Nave Shimoni 207382987
          Zohar Sabag 209494111
*/

import React, { useState } from 'react';
import idb from './idb';
import CaloriesReport from './calories-report';
import './App.css';

const App = () => {
  const [calorie, setCalorie] = useState('');
  const [category, setCategory] = useState('');
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
    } else {
      console.error('Failed to add calories');
      // Provide feedback to the user about the failure
    }
  };


  return (
    <div className='container'>
      <h1>Calories Management Application</h1>
      <h2>Add a product</h2>
      <label className='input-label'>
        <span>Calories:</span>
        <input type='number' value={calorie} onChange={(e) => setCalorie(e.target.value)} />
      </label>
      <label>
      <span>Category:</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>--Select--</option>
          <option value='BREAKFAST'>Breakfast</option>
          <option value='LUNCH'>Lunch</option>
          <option value='DINNER'>Dinner</option>
          <option value='OTHER'>Other</option>
        </select>
      </label>
      <label>
      <span>Description:</span>
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button onClick={handleAddCalories}>Add Calories</button>
      <div style={{ color: resultMessage.includes('successfully') ? 'green' : 'red' }}>{resultMessage}</div>

      <div className='seperate-line'></div>
      
      <CaloriesReport />

    </div>
  );
};

export default App;