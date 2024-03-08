class IndexedDB {
    constructor(databaseName, version, objectStoreName) {
      this.databaseName = databaseName;
      this.version = version;
      this.objectStoreName = objectStoreName;
    }
  
    openCaloriesDB() {
        return new Promise((resolve, reject) => {
          const request = indexedDB.open(this.databaseName, this.version);
      
          request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(this.objectStoreName, { autoIncrement: true });
          };
      
          request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
          };
      
          request.onerror = (event) => {
            reject(event.target.error);
          };
        });
      }
    
      addCalories(calorieData) {
        return new Promise(async (resolve, reject) => {
          try {
            const db = await this.openCaloriesDB();
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
          } catch (error) {
            console.error('Error adding calories:', error);
            reject(error);
          }
        });
      }
    }
    
    const idb = new IndexedDB('caloriesdb', 1, 'calories');
    export default idb;