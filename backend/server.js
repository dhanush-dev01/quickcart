const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connection configuration
const config = {
  user: 'Akshay',
  password: 'Aksquickcart98@',
  server: 'quickcart1.database.windows.net',
  database: 'quickcartDB',
  
  options: {
    encrypt: true // For Azure SQL Server, set encrypt to true
  }
};

// Function to establish SQL connection
async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Connected to Azure SQL Server');
  } catch (error) {
    console.error('Error connecting to Azure SQL Server:', error);
    throw error;
  }
}

// Route to handle login request
app.post('/login', async (req, res) => {
  const { customer_id, customer_name } = req.body;

  try {
    await connectToDatabase();

    // Query the database to check if the user exists with the provided credentials
    const result = await sql.query`
      SELECT * FROM auth_customer WHERE customer_id = ${customer_id} AND customer_name = ${customer_name}
    `;

    if (result.recordset.length === 0) {
      throw new Error('Authentication failed. Invalid customer ID or customer name.');
    }

    // Authentication successful
    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message }); // Authentication error
  } finally {
    await sql.close(); // Close SQL connection
  }
});
app.post('/adminlogin', async (req, res) => {
  const { admin_id, admin_name } = req.body;

  try {
    await connectToDatabase();

    // Query the database to check if the user exists with the provided credentials
    const result = await sql.query`
      SELECT * FROM auth_admin WHERE admin_id = ${admin_id} AND admin_name = ${admin_name}
    `;

    if (result.recordset.length === 0) {
      throw new Error('Authentication failed. Invalid customer ID or customer name.');
    }

    // Authentication successful
    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message }); // Authentication error
  } finally {
    await sql.close(); // Close SQL connection
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
