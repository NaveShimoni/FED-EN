import React, { useState,useEffect } from 'react';
import idb from './idb';
import './calories-report.css';

const CaloriesReport = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [report, setReport] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [monthConverted,setMonthConverted] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [reportHeader, setReportHeader] = useState('');

  const handleGenerateReport = async () => {
    setResultMessage('');
    if (!month || !year) {
      setResultMessage('You must fill all the fields');
      return;
    }


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
    if (reportGenerated) {
      // Sort the report when the sorting criteria changes
      SortReport();
    }
  }, [sortingCriteria]); // Re-run the effect when sorting criteria changes

  const SortReport = () => {
    let sortedReport;
    if (sortingCriteria === 'category') {
      sortedReport = [...report].sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortingCriteria === 'calories') {
      sortedReport = [...report].sort((a, b) => a.calorie - b.calorie);
    } else {
      // Default sorting when no criteria is selected
      sortedReport = [...report];
    }

    setReport(sortedReport);
  };

  const MonthConverter = (month) => {
    switch (month) {
      case '1':
        setMonthConverted('January');
        break;
      case '2':
        setMonthConverted('February');
        break;
      case '3':
        setMonthConverted('March');
        break;
      case '4':
        setMonthConverted('April');
        break;
      case '5':
        setMonthConverted('May');
        break;
      case '6':
        setMonthConverted('June');
        break;
      case '7':
        setMonthConverted('July');
        break;
      case '8':
        setMonthConverted('August');
        break;
      case '9':
        setMonthConverted('September');
        break;
      case '10':
        setMonthConverted('October');
        break;
      case '11':
        setMonthConverted('November');
        break;
      case '12':
        setMonthConverted('December');
        break;
      default:
        setMonthConverted('Unknown Month');
        break;
    }
  }
  

  return (
    <div>
      <h2>Calories Report</h2>
      <label>
        Month:
        <select value={month} onChange={(e) => { setMonth(e.target.value); MonthConverter(e.target.value) }}>
          <option value=''>--Select--</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
        </select>
      </label>
      <label>
        Year:
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value=''>--Select--</option>
          <option value='2022'>2022</option>
          <option value='2023'>2023</option>
          <option value='2024'>2024</option>
        </select>
      </label>
      <button onClick={() => { handleGenerateReport(); setReportGenerated(true);  setReportHeader(`Report for ${monthConverted} ${year}`); }}>Generate Report</button>
      <div style={{ color:'red'}}>{resultMessage}</div>

      {reportGenerated && resultMessage=='' && (
        <div className='report-container'>
          
          <div className='sorting-options'>
            <label>
              Sort By:
              <select value={sortingCriteria} onChange={(e) => setSortingCriteria(e.target.value)}>
                <option value=''>--Select--</option>
                <option value='category'>Category</option>
                <option value='calories'>Calories</option>
              </select>
            </label>
          </div>

          <h3>{reportHeader}</h3>
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
      )}
    </div>
  );
};

export default CaloriesReport;