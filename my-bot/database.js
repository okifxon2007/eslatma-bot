const sqlite3 = require('sqlite3').verbose();
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyBqjQ2SosKX_OFRRiybn0y5AXOc02Bq2Gg",
  authDomain: "xabar-bot-abba1.firebaseapp.com",
  databaseURL: "https://xabar-bot-abba1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "xabar-bot-abba1",
  storageBucket: "xabar-bot-abba1.firebasestorage.app",
  messagingSenderId: "183488885435",
  appId: "1:183488885435:web:c1d5e922ca9a7c4bc2af9e",
  measurementId: "G-17Y303378H"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const db = new sqlite3.Database('mydatabase.db');

db.serialize(() => {

  db.run("DROP TABLE IF EXISTS mytable");
  

  db.run("CREATE TABLE mytable (id INTEGER PRIMARY KEY, text TEXT, timestamp TEXT)");


  const messagesRef = ref(database, 'messages');
  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    console.log('Firebase ma\'lumotlari:', data); 

    if (data) {
      const stmt = db.prepare("INSERT INTO mytable (text, timestamp) VALUES (?, ?)");
      Object.values(data).forEach(message => {
        console.log('Kiritilayotgan ma\'lumot:', message); 
        stmt.run(message.text, message.timestamp);
      });
      stmt.finalize();
      console.log('Ma\'lumotlar bazasi yangilandi.');
    } else {
      console.error('Ma\'lumotlar topilmadi yoki bo\'sh.');
    }
  });
});

module.exports = db;
