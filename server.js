const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

oracledb.autoCommit = true;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json({ limit: '10mb' }));

// Endpoint to execute a query
app.post('/query', async (req, res) => {
  try {
    const { query } = req.body;

    console.log('Executing query:', query);

    const conn = await oracledb.getConnection({
      user: 'STORE',
      password: 'nahibtana',
      connectionString: 'xe'
    });

    // Modify this line to add autoCommit: true
    const result = await conn.execute(query);

    let data;
    if (result.rows) {
      // Concatenate all rows into a single string with a delimiter
      data = result.rows.map(row => row.join(',')).join(';');
    } else {
      
      if (result.rowsAffected > 0) {
        data = "successful";
      } else {
        data = "No data found";
      }
  
    }

    res.send(data);

    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));