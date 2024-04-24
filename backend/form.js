const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5002;

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
connectToDatabase();

app.post('/api/form/inwardForm', async (req, res) => {
    try {
        // Extract data from request body
        const {
            customer_id,
            pro_id,
            customername,
            address,
            contactnumber,
            equipmentname,
            modelnumber,
            serialnumber,
            kitsreceived,
            accessories_received,
            customer_email
        } = req.body;
      
        // Check if a record with the provided customer_id and pro_id already exists
        const existingRecord = await sql.query`SELECT COUNT(*) AS count FROM inwardform WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}`;
      
        if (existingRecord.recordset[0].count > 0) {
            // If a record exists, update it
            const result = await sql.query`
                UPDATE inwardform
                SET 
                    customername = ${customername},
                    address = ${address},
                    contactnumber = ${contactnumber},
                    equipmentname = ${equipmentname},
                    modelnumber = ${modelnumber},
                    serialnumber = ${serialnumber},
                    kitsreceived = ${kitsreceived},
                    accessories_received = ${accessories_received},
                    customer_email = ${customer_email}
                WHERE 
                    customer_id = ${customer_id} AND 
                    pro_id = ${pro_id}
            `;
        } else {
            // If no record exists, insert a new one
            const result = await sql.query`
                INSERT INTO inwardform 
                (customer_id, pro_id, customername, address, contactnumber, equipmentname, modelnumber, serialnumber, kitsreceived, accessories_received , customer_email) 
                VALUES 
                (${customer_id}, ${pro_id}, ${customername}, ${address}, ${contactnumber}, ${equipmentname}, ${modelnumber}, ${serialnumber}, ${kitsreceived}, ${accessories_received}, ${customer_email})
            `;
        }
      
        // Send success response
        res.status(200).json({ message: 'Data inserted or updated successfully' });
    } catch (error) {
        // Send error response
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/form/getinwardForm/:customer_id/:product_id', async (req, res) => {
    const { customer_id, product_id } = req.params;
  
    try {
      // Retrieve records from the inwardform table for the specified customer_id and product_id
      const result = await sql.query`
        SELECT * FROM inwardform
        WHERE customer_id = ${customer_id} AND pro_id = ${product_id}
      `;
  
      // Send the retrieved data as a response
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error retrieving inward form data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
    try {
        await sql.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
});
