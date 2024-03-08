import React, { useState,useEffect } from 'react';
import idb from './idb';
import './calorie-report.css';

const CalorieReport = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [report, setReport] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState('');

  const handleGenerateReport = async () => {
    try {
      const db = await idb.openCaloriesDB('caloriesdb', 1);
      const transaction = db.transaction('calories');
      const store = transaction.objectStore('calories');
  
      const request = store.openCursor();
      const newReport = [];
      request.onerror = function(event) {};
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            if(cursor.value.year==year && cursor.value.month==month) 
            {
            newReport.push(cursor.value);
            }
            cursor.continue();
        } else {

          setReport(newReport);

        }
       
      };
  

      request.onerror = (event) => {
        console.error('Error fetching report:', event.target.error);
        // Provide feedback to the user about the failure
      };
    } catch (error) {
      console.error('Error opening database:', error);
      // Provide feedback to the user about the failure
    }
  };

  useEffect(() => {
    handleGenerateReport();
  }, [sortingCriteria]); // Re-run the report generation when sorting criteria changes

  const sortReport = async() => {
    await handleGenerateReport();
    if (sortingCriteria === 'category') {
      setReport([...report].sort((a, b) => a.category.localeCompare(b.category)));
    } else if (sortingCriteria === 'calories') {
      setReport([...report].sort((a, b) => a.calorie - b.calorie));
    }
  };

  return (
    <div>
      <h2>Calorie Report</h2>
      <label>
        Month:
        <input type='text' value={month} onChange={(e) => setMonth(e.target.value)} />
      </label>
      <label>
        Year:
        <input type='text' value={year} onChange={(e) => setYear(e.target.value)} />
      </label>
      <button onClick={handleGenerateReport}>Generate Report</button>

      <div className='report-container'>
        <h3>Report:</h3>
        <h4>Year: {year} Month: {month}</h4>
        
        <div className='sorting-options'>

        <label>
          Sort By:
          <select value={sortingCriteria} onChange={(e) =>{ setSortingCriteria(e.target.value);sortReport();}}>
            <option value=''>--Select--</option>
            <option value='category'>Category</option>
            <option value='calories'>Calories</option>
          </select>
        </label>
        </div>
    
        <ul className='report-list'>
            {report.map((item) => (
            <li key={item.id} className='report-item'>
                <span className='item-description'>{item.description}</span>
                <span className='item-details'>
                {item.calorie} calories, {item.category}
                </span>
            </li>
            ))}
        </ul>
            </div>
    </div>
  );
};

export default CalorieReport;