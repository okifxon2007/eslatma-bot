const axios = require('axios');

axios.get('http://localhost:3001/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Xato:', error);
  });
