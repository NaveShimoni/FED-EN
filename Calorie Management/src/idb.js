/*
Students: Nave Shimoni 207382987
          Zohar Sabag 209494111
*/

class IndexedDB {
  constructor(databaseName, version, objectStoreName) {
      this.databaseName = databaseName;
      this.version = version;
      this.objectStoreName = objectStoreName;
  }

  openCaloriesDB(databaseName, version) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(databaseName, version);
    
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore(this.objectStoreName, { autoIncrement: true });
        };
    
        request.onsuccess = (event) => {
          const db = event.target.result;
    
          const addCalories = (calorieData) => {
            return new Promise((resolve, reject) => {
              const transaction = db.transaction([this.objectStoreName], 'readwrite');
              const store = transaction.objectStore(this.objectStoreName);
    
              const request = store.add({ ...calorieData });
    
              request.onsuccess = (event) => {
                console.log('Calories added successfully with key:', event.target.result);
                resolve(event.target.result);
              };
    
              request.onerror = (event) => {
                console.error('Error adding calories:', event.target.error);
                reject(event.target.error);
              };
            });
          };

          const generateReport = (year,month) => {
            return new Promise((resolve, reject) => {
              const transaction = db.transaction([this.objectStoreName]);
              const store = transaction.objectStore(this.objectStoreName);
          
              const request = store.openCursor();
              const newReport = [];
             
              request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if(cursor.value.year==year && cursor.value.month==month) 
                    {
                    newReport.push(cursor.value); //Adding the report every product that fits the year and month condition
                    }
                    cursor.continue();
                } else {

                 resolve(newReport); //Returning the report after it added to it every single product that fit the condition

                }
              
              };

              request.onerror = (event) => {
                console.error('Error fetching report:', event.target.error);
                reject(event.target.error);
                // Provide feedback to the user about the failure
              };
            });
          };
    
          resolve({addCalories,generateReport});
        };
    
        request.onerror = (event) => {
          reject(event.target.error);
        };
      });
    
  
  }
}

var idb = new IndexedDB('caloriesdb', 1, 'calories');
export default idb;
