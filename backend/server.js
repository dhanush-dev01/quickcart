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
connectToDatabase();

// Route to handle login request
app.post('/login', async (req, res) => {
  const { customer_id, customer_name } = req.body;

  try {
    // await connectToDatabase();

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
   }
  // finally {
  //   await sql.close(); // Close SQL connection
  // }
});
// Route to handle user deletion
app.delete('/api/delete/:customerId', async (req, res) => {
  const customerId = req.params.customerId;

  try {
    // Connect to the database
    // await connectToDatabase();

    // Execute the delete query to remove the user with the specified ID
    const result = await sql.query`
      DELETE FROM auth_customer WHERE customer_id = ${customerId}
    `;

    // Close the database connection
    // await sql.close();

    // Check if any rows were affected by the delete operation
    if (result.rowsAffected > 0) {
      res.status(200).json({ message: `User with ID ${customerId} deleted successfully` });
    } else {
      res.status(404).json({ error: `User with ID ${customerId} not found` });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/adminlogin', async (req, res) => {
  const { admin_id, admin_name } = req.body;

  try {
    // await connectToDatabase();

    // Query the database to check if the user exists with the provided credentials
    const result = await sql.query`
      SELECT * FROM auth_admin WHERE admin_id = ${admin_id} AND admin_name = ${admin_name}
    `;

    if (result.recordset.length === 0) {
      throw new Error('Authentication failed. Invalid admin ID or admin name.');
    }

    // Authentication successful
    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message }); // Authentication error
  } 
  // finally {
  //   await sql.close(); // Close SQL connection
  // }
});

app.post('/products/assign', async (req, res) => {
  const { customer_id, product_id } = req.body;

  try {
    // await connectToDatabase();
    // await sql.connect(config);

    // Query the database to check if the user exists with the provided credentials
    const result = await sql.query`
    INSERT INTO customer_products (customer_id, product_id) VALUES (${customer_id},${product_id})
    `;

    if (result.recordset.length === 0) {
      throw new Error('Authentication failed. Invalid customer ID or customer name.');
    }

    // Authentication successful
    res.status(200).json({ message: 'insertion successful' });
  } catch (error) {
    console.error('insertion error:', error);
    res.status(401).json({ error: error.message }); // Authentication error
  }
  //  finally {
  //   await sql.close(); // Close SQL connection
  // }
});

app.get('/api/users', async (req, res) => {
  try {
    // Connect to the database
    // await sql.connect(config);

    // Query to retrieve customer info from all rows
    const result = await sql.query('SELECT customer_id, customer_name FROM auth_customer');

    // Close the database connection
    // await sql.close();

    // Send customer info as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error retrieving customer info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.get('/api/listuserproducts', async (req, res) => {
//   try {
//     // Connect to the database
//     await sql.connect(config);

//     // Query to retrieve customer info from all rows
//     const result = await sql.query('SELECT customer_id, customer_name FROM auth_customer');

//     // Close the database connection
//     await sql.close();

//     // Send customer info as JSON response
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error retrieving customer info:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/api/users/create', async (req, res) => {
  const { customer_id, customer_name } = req.body;

  try {
    // Connect to the database
    // await sql.connect(config);

    // Query to insert a new user into the database
    const result = await sql.query`
      INSERT INTO auth_customer (customer_id, customer_name) 
      VALUES (${customer_id}, ${customer_name})
    `;

    // Close the database connection
    // await sql.close();

    // Send a success response
    res.status(201).json({ message: 'User created successfully', user: { customer_id, customer_name } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Assuming you have already imported necessary modules and configured the database connection

// GET endpoint to fetch all product details
app.get('/api/products', async (req, res) => {
  try {
    // Connect to the database
    // await sql.connect(config);

    // Query to retrieve product info from all rows
    const result = await sql.query('SELECT product_id, product_name, product_image_path FROM products_info');

    // Close the database connection
    // await sql.close();

    // Send product info as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error retrieving product info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/products', async (req, res) => {
  const { customerId } = req.body;
  try {
    // Connect to the database
    // await sql.connect(config);

    // Query to retrieve product info from all rows
    const result = await sql.query`
    SELECT *
    FROM products_info
    WHERE product_id NOT IN (
        SELECT product_id
        FROM customer_products
        WHERE customer_id = ${customerId}
    );

  `;

    // Close the database connection
    // await sql.close();

    // Send product info as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error retrieving product info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/products/assign', async (req, res) => {
  const { productId, customerId } = req.body; // Extract productId and customerId from request body

  try {
    // Perform database operations to insert the assigned product into the customer_products table
    // Make sure you're properly connecting to the database and executing the SQL query

    // Example: Assuming you're using a SQL database and the 'sql' library
    // await connectToDatabase();

    // Insert the assigned product into the customer_products table
    const result = await sql.query`
      INSERT INTO customer_products (customer_id, product_id) 
      VALUES (${customerId}, ${productId})
    `;
const tracking = await sql.query`INSERT INTO tracking (product_id, customer_id, reception, evaluation, quotation, awaiting_work_order, service_in_progress, calibration, packing, dispatched, delivery)
VALUES (${productId}, ${customerId}, 0, 0, 0, 0, 0, 0, 0, 0, 0)`;

    res.status(200).json({ message: 'Product assigned successfully' });
  } catch (error) {
    console.error('Error assigning product:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
  // finally {
  //   await sql.close(); // Close the SQL connection
  // }
});


app.post('/api/listuserproducts', async (req, res) => {
  const { customer_id } = req.body;

  // Change to req.query to get customer_id from query parameters

  try {
    // Connect to the database
    // await sql.connect(config);

    // Query to retrieve customer info from all rows
    const result = await sql.query`
    SELECT p.product_image_path,p.product_id,p.product_name
FROM customer_products AS c
JOIN products_info AS p ON c.product_id = p.product_id
WHERE c.customer_id = ${customer_id}
  `;

    // Close the database connection
    // await sql.close();

    // Send customer info as JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error retrieving user product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/products/unassign', async (req, res) => {
  const { productId } = req.body; // Extract productId from request body

  try {
    // Perform database operations to remove the product from the customer_products table
    // Make sure you're properly connecting to the database and executing the SQL query

    // Example: Assuming you're using a SQL database and the 'sql' library
    // await sql.connect(config);

    // Remove the product from the customer_products table based on productId
    const result = await sql.query`
      DELETE FROM customer_products 
      WHERE product_id = ${productId}
    `;
    const result2 = await sql.query`
    DELETE FROM tracking
    WHERE product_id = ${productId}
  `;
  const result3 = await sql.query`
  DELETE FROM inwardform 
  WHERE pro_id = ${productId}
`;
  

    res.status(200).json({ message: 'Product unassigned successfully' });
  } catch (error) {
    console.error('Error unassigning product:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
  // finally {
  //   await sql.close(); // Close the SQL connection
  // }
});


//status api

app.post('/api/setstatus', async (req, res) => {
  const { customer_id, product_id,
     reception, evaluation,
      quotation, awaiting_work_order, 
      service_in_progress, calibration,
      packing, dispatched, delivery } = req.body;

  try {
    const result = await sql.query`
    UPDATE tracking
    SET 
    reception = ${reception}, evaluation= ${evaluation}, quotation = ${quotation},
    awaiting_work_order = ${awaiting_work_order}, service_in_progress = ${service_in_progress},
    calibration = ${calibration}, packing = ${packing}, dispatched = ${dispatched},
    delivery = ${delivery}
    WHERE product_id = ${product_id} and customer_id = ${customer_id} 
    `;

    res.status(200).json({ message: 'Product status updated successfully' });
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getstatus/:customer_id/:product_id', async (req, res) => {
  const { customer_id, product_id } = req.params;

  try {
    // Retrieve records from the tracking table for the specified customer_id and product_id
    const result = await sql.query`
      SELECT * FROM tracking
      WHERE customer_id = ${customer_id} AND product_id = ${product_id}
    `;

    // Send the retrieved data as a response
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error retrieving product status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/api/deletestatus/:customer_id/:product_id', async (req, res) => {
  const { customer_id, product_id } = req.params;

  try {
      // Perform deletion operation in the tracking table
      await sql.query`
          DELETE FROM tracking
          WHERE customer_id = ${customer_id} AND product_id = ${product_id}
      `;
      
      res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/api/form/inwardForm", async (req, res) => {
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
      customer_email,
    } = req.body;

    // Check if a record with the provided customer_id and pro_id already exists
    const existingRecord =
      await sql.query`SELECT COUNT(*) AS count FROM inwardform WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}`;

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
    res.status(200).json({ message: "Data inserted or updated successfully" });
  } catch (error) {
    // Send error response
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get(
  "/api/form/getinwardForm/:customer_id/:product_id",
  async (req, res) => {
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
      console.error("Error retrieving inward form data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
app.post("/api/form/quotationForm", async (req, res) => {
  try {
    // Extract data from request body
    const { quotation_no, quotation_date, customer_id, pro_id } = req.body;

    // Check if a record with the provided customer_id and pro_id already exists
    const existingRecord = await sql.query`
            SELECT COUNT(*) AS count FROM quotations 
            WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}
        `;

    if (existingRecord.recordset[0].count > 0) {
      // If a record with the provided customer_id and pro_id already exists, update it
      const result = await sql.query`
                UPDATE quotations
                SET 
                    quotation_no = ${quotation_no},
                    quotation_date = ${quotation_date}
                WHERE 
                    customer_id = ${customer_id} AND 
                    pro_id = ${pro_id}
            `;

      // Send success response
      return res
        .status(200)
        .json({ message: "Quotation data updated successfully" });
    }

    // If no record exists with the provided customer_id and pro_id, insert a new record
    const result = await sql.query`
            INSERT INTO quotations 
            (quotation_no, quotation_date, customer_id, pro_id) 
            VALUES 
            (${quotation_no}, ${quotation_date}, ${customer_id}, ${pro_id})
        `;

    // Send success response
    res.status(200).json({ message: "Quotation data inserted successfully" });
  } catch (error) {
    // Send error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/api/form/quotationForm/:customer_id/:pro_id", async (req, res) => {
  try {
    const { customer_id, pro_id } = req.params;

    // Retrieve data from the database based on customer_id and pro_id
    const result = await sql.query`
          SELECT * FROM quotations 
          WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}
      `;

    if (result.recordset.length === 0) {
      // If no data is found, send a 404 response
      return res.status(404).json({ error: "Data not found" });
    }

    // Send the retrieved data as a JSON response
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    // Send error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/form/outwardForm", async (req, res) => {
  try {
    // Extract data from request body
    const {
      customer_id,
      pro_id,
      organization_name,
      address,
      eway_bill_number,
      invoice_number,
      delivery_challan_number,
      calibration_report_number,
      date_of_dispatch,
      accessoryrecived,
    } = req.body;

    // Check if a record with the provided customer_id and pro_id already exists
    const existingRecord =
      await sql.query`SELECT COUNT(*) AS count FROM organization_details WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}`;

    if (existingRecord.recordset[0].count > 0) {
      // If a record exists, update it
      const result = await sql.query`
                UPDATE organization_details
                SET 
                organization_name = ${organization_name},
                    address = ${address},
                    eway_bill_number = ${eway_bill_number},
                    invoice_number = ${invoice_number},
                    delivery_challan_number = ${delivery_challan_number},
                    calibration_report_number = ${calibration_report_number},
                    date_of_dispatch = ${date_of_dispatch},
                    accessoryrecived = ${accessoryrecived}
                WHERE 
                    customer_id = ${customer_id} AND 
                    pro_id = ${pro_id}
            `;
    } else {
      // If no record exists, insert a new one
      const result = await sql.query`
                INSERT INTO organization_details 
                (customer_id, pro_id, organization_name, address, eway_bill_number, invoice_number, delivery_challan_number, calibration_report_number, date_of_dispatch, accessoryrecived) 
                VALUES 
                (${customer_id}, ${pro_id}, ${organization_name}, ${address}, ${eway_bill_number}, ${invoice_number}, ${delivery_challan_number}, ${calibration_report_number}, ${date_of_dispatch}, ${accessoryrecived})
            `;
    }

    // Send success response
    res.status(200).json({ message: "Data inserted or updated successfully" });
  } catch (error) {
    // Send error response
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get(
  "/api/form/getoutwardForm/:customer_id/:product_id",
  async (req, res) => {
    const { customer_id, product_id } = req.params;

    try {
      // Retrieve records from the inwardform table for the specified customer_id and product_id
      const result = await sql.query`
        SELECT * FROM organization_details
        WHERE customer_id = ${customer_id} AND pro_id = ${product_id}
      `;

      // Send the retrieved data as a response
      res.status(200).json(result.recordset);
    } catch (error) {
      console.error("Error retrieving inward form data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
app.post("/api/form/notify", async (req, res) => {
  try {
    // Extract data from request body
    const { customerName, productName, modelName, state, customer_id } =
      req.body;

    // Check if a record with the provided customer_id and pro_id already exists
    const existingRecord =
      await sql.query`SELECT COUNT(*) AS count FROM requests WHERE customer_id = ${customer_id} AND productName = ${productName}`;

    if (existingRecord.recordset[0].count > 0) {
      // If a record exists, update it
      const result = await sql.query`
                UPDATE requests
                SET 
                modelName = ${modelName},
                state = ${state}
                customerName = ${customerName}
                WHERE 
                customer_id = ${customer_id} AND 
                productName = ${productName}
            `;
    } else {
      // If no record exists, insert a new one
      const result = await sql.query`
                INSERT INTO requests 
                (customerName, productName, modelName, state,customer_id) 
                VALUES 
                (${customerName}, ${productName}, ${modelName}, ${state},${customer_id})
            `;
    }

    // Send success response
    res.status(200).json({ message: "Data inserted or updated successfully" });
  } catch (error) {
    // Send error response
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/form/notify/:customer_id", async (req, res) => {
  const { customer_id } = req.params;

  try {
    // Retrieve records from the inwardform table for the specified customer_id and product_id
    const result = await sql.query`
          SELECT * FROM requests
          WHERE customer_id = ${customer_id} `;

    // Send the retrieved data as a response
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error retrieving inward form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/api/form/getinwardForm/requests", async (req, res) => {
  try {
    // Retrieve records from the inwardform table for the specified customer_id and product_id
    const result = await sql.query`
          SELECT * FROM requests
        `;

    // Send the retrieved data as a response
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error retrieving requests form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/updatestatus", async (req, res) => {
  try {
    // Extract data from request body
    const { state, customer_id } = req.body;

    // If a record exists, update it
    const result = await sql.query`
      UPDATE requests
      SET state = ${state}
      WHERE customer_id = ${customer_id}
    `;

    // Send success response
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    // Send error response
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/deleterequest", async (req, res) => {
  try {
    // Extract data from request body
    const { customer_id } = req.body;

    // If a record exists, update it
    const result = await sql.query`
    DELETE FROM requests WHERE customer_id = ${customer_id}
    `;

    // Send success response
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    // Send error response
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
  try {
    await sql.close();
    console.log('Database connection closed');
    server.close(() => {
      console.log('Server stopped');
    });
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
});