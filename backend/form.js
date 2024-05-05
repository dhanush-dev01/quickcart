// const express = require("express");
// const sql = require("mssql");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5001;

// // Enable CORS middleware
// app.use(cors());
// app.use(express.json()); // Parse JSON bodies

// // Connection configuration
// const config = {
//   user: "Akshay",
//   password: "Aksquickcart98@",
//   server: "quickcart1.database.windows.net",
//   database: "quickcartDB",
//   options: {
//     encrypt: true, // For Azure SQL Server, set encrypt to true
//   },
// };

// // Function to establish SQL connection
// async function connectToDatabase() {
//   try {
//     await sql.connect(config);
//     console.log("Connected to Azure SQL Server");
//   } catch (error) {
//     console.error("Error connecting to Azure SQL Server:", error);
//     throw error;
//   }
// }
// connectToDatabase();

// app.post("/api/form/inwardForm", async (req, res) => {
//   try {
//     // Extract data from request body
//     const {
//       customer_id,
//       pro_id,
//       customername,
//       address,
//       contactnumber,
//       equipmentname,
//       modelnumber,
//       serialnumber,
//       kitsreceived,
//       accessories_received,
//       customer_email,
//     } = req.body;

//     // Check if a record with the provided customer_id and pro_id already exists
//     const existingRecord =
//       await sql.query`SELECT COUNT(*) AS count FROM inwardform WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}`;

//     if (existingRecord.recordset[0].count > 0) {
//       // If a record exists, update it
//       const result = await sql.query`
//                 UPDATE inwardform
//                 SET 
//                     customername = ${customername},
//                     address = ${address},
//                     contactnumber = ${contactnumber},
//                     equipmentname = ${equipmentname},
//                     modelnumber = ${modelnumber},
//                     serialnumber = ${serialnumber},
//                     kitsreceived = ${kitsreceived},
//                     accessories_received = ${accessories_received},
//                     customer_email = ${customer_email}
//                 WHERE 
//                     customer_id = ${customer_id} AND 
//                     pro_id = ${pro_id}
//             `;
//     } else {
//       // If no record exists, insert a new one
//       const result = await sql.query`
//                 INSERT INTO inwardform 
//                 (customer_id, pro_id, customername, address, contactnumber, equipmentname, modelnumber, serialnumber, kitsreceived, accessories_received , customer_email) 
//                 VALUES 
//                 (${customer_id}, ${pro_id}, ${customername}, ${address}, ${contactnumber}, ${equipmentname}, ${modelnumber}, ${serialnumber}, ${kitsreceived}, ${accessories_received}, ${customer_email})
//             `;
//     }

//     // Send success response
//     res.status(200).json({ message: "Data inserted or updated successfully" });
//   } catch (error) {
//     // Send error response
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.get(
//   "/api/form/getinwardForm/:customer_id/:product_id",
//   async (req, res) => {
//     const { customer_id, product_id } = req.params;

//     try {
//       // Retrieve records from the inwardform table for the specified customer_id and product_id
//       const result = await sql.query`
//         SELECT * FROM inwardform
//         WHERE customer_id = ${customer_id} AND pro_id = ${product_id}
//       `;

//       // Send the retrieved data as a response
//       res.status(200).json(result.recordset);
//     } catch (error) {
//       console.error("Error retrieving inward form data:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );
// app.post("/api/form/quotationForm", async (req, res) => {
//   try {
//     // Extract data from request body
//     const { quotation_no, quotation_date, customer_id, pro_id } = req.body;

//     // Check if a record with the provided customer_id and pro_id already exists
//     const existingRecord = await sql.query`
//             SELECT COUNT(*) AS count FROM quotations 
//             WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}
//         `;

//     if (existingRecord.recordset[0].count > 0) {
//       // If a record with the provided customer_id and pro_id already exists, update it
//       const result = await sql.query`
//                 UPDATE quotations
//                 SET 
//                     quotation_no = ${quotation_no},
//                     quotation_date = ${quotation_date}
//                 WHERE 
//                     customer_id = ${customer_id} AND 
//                     pro_id = ${pro_id}
//             `;

//       // Send success response
//       return res
//         .status(200)
//         .json({ message: "Quotation data updated successfully" });
//     }

//     // If no record exists with the provided customer_id and pro_id, insert a new record
//     const result = await sql.query`
//             INSERT INTO quotations 
//             (quotation_no, quotation_date, customer_id, pro_id) 
//             VALUES 
//             (${quotation_no}, ${quotation_date}, ${customer_id}, ${pro_id})
//         `;

//     // Send success response
//     res.status(200).json({ message: "Quotation data inserted successfully" });
//   } catch (error) {
//     // Send error response
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.get("/api/form/quotationForm/:customer_id/:pro_id", async (req, res) => {
//   try {
//     const { customer_id, pro_id } = req.params;

//     // Retrieve data from the database based on customer_id and pro_id
//     const result = await sql.query`
//           SELECT * FROM quotations 
//           WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}
//       `;

//     if (result.recordset.length === 0) {
//       // If no data is found, send a 404 response
//       return res.status(404).json({ error: "Data not found" });
//     }

//     // Send the retrieved data as a JSON response
//     res.status(200).json(result.recordset[0]);
//   } catch (error) {
//     // Send error response
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.post("/api/form/outwardForm", async (req, res) => {
//   try {
//     // Extract data from request body
//     const {
//       customer_id,
//       pro_id,
//       organization_name,
//       address,
//       eway_bill_number,
//       invoice_number,
//       delivery_challan_number,
//       calibration_report_number,
//       date_of_dispatch,
//       accessoryrecived,
//     } = req.body;

//     // Check if a record with the provided customer_id and pro_id already exists
//     const existingRecord =
//       await sql.query`SELECT COUNT(*) AS count FROM organization_details WHERE customer_id = ${customer_id} AND pro_id = ${pro_id}`;

//     if (existingRecord.recordset[0].count > 0) {
//       // If a record exists, update it
//       const result = await sql.query`
//                 UPDATE organization_details
//                 SET 
//                 organization_name = ${organization_name},
//                     address = ${address},
//                     eway_bill_number = ${eway_bill_number},
//                     invoice_number = ${invoice_number},
//                     delivery_challan_number = ${delivery_challan_number},
//                     calibration_report_number = ${calibration_report_number},
//                     date_of_dispatch = ${date_of_dispatch},
//                     accessoryrecived = ${accessoryrecived}
//                 WHERE 
//                     customer_id = ${customer_id} AND 
//                     pro_id = ${pro_id}
//             `;
//     } else {
//       // If no record exists, insert a new one
//       const result = await sql.query`
//                 INSERT INTO organization_details 
//                 (customer_id, pro_id, organization_name, address, eway_bill_number, invoice_number, delivery_challan_number, calibration_report_number, date_of_dispatch, accessoryrecived) 
//                 VALUES 
//                 (${customer_id}, ${pro_id}, ${organization_name}, ${address}, ${eway_bill_number}, ${invoice_number}, ${delivery_challan_number}, ${calibration_report_number}, ${date_of_dispatch}, ${accessoryrecived})
//             `;
//     }

//     // Send success response
//     res.status(200).json({ message: "Data inserted or updated successfully" });
//   } catch (error) {
//     // Send error response
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.get(
//   "/api/form/getoutwardForm/:customer_id/:product_id",
//   async (req, res) => {
//     const { customer_id, product_id } = req.params;

//     try {
//       // Retrieve records from the inwardform table for the specified customer_id and product_id
//       const result = await sql.query`
//         SELECT * FROM organization_details
//         WHERE customer_id = ${customer_id} AND pro_id = ${product_id}
//       `;

//       // Send the retrieved data as a response
//       res.status(200).json(result.recordset);
//     } catch (error) {
//       console.error("Error retrieving inward form data:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );
// app.post("/api/form/notify", async (req, res) => {
//   try {
//     // Extract data from request body
//     const { customerName, productName, modelName, state, customer_id } =
//       req.body;

//     // Check if a record with the provided customer_id and pro_id already exists
//     const existingRecord =
//       await sql.query`SELECT COUNT(*) AS count FROM requests WHERE customer_id = ${customer_id} AND productName = ${productName}`;

//     if (existingRecord.recordset[0].count > 0) {
//       // If a record exists, update it
//       const result = await sql.query`
//                 UPDATE requests
//                 SET 
//                 modelName = ${modelName},
//                 state = ${state}
//                 customerName = ${customerName}
//                 WHERE 
//                 customer_id = ${customer_id} AND 
//                 productName = ${productName}
//             `;
//     } else {
//       // If no record exists, insert a new one
//       const result = await sql.query`
//                 INSERT INTO requests 
//                 (customerName, productName, modelName, state,customer_id) 
//                 VALUES 
//                 (${customerName}, ${productName}, ${modelName}, ${state},${customer_id})
//             `;
//     }

//     // Send success response
//     res.status(200).json({ message: "Data inserted or updated successfully" });
//   } catch (error) {
//     // Send error response
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/api/form/notify/:customer_id", async (req, res) => {
//   const { customer_id } = req.params;

//   try {
//     // Retrieve records from the inwardform table for the specified customer_id and product_id
//     const result = await sql.query`
//           SELECT * FROM requests
//           WHERE customer_id = ${customer_id} `;

//     // Send the retrieved data as a response
//     res.status(200).json(result.recordset);
//   } catch (error) {
//     console.error("Error retrieving inward form data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.get("/api/form/getinwardForm/requests", async (req, res) => {
//   try {
//     // Retrieve records from the inwardform table for the specified customer_id and product_id
//     const result = await sql.query`
//           SELECT * FROM requests
//         `;

//     // Send the retrieved data as a response
//     res.status(200).json(result.recordset);
//   } catch (error) {
//     console.error("Error retrieving requests form data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.post("/api/updatestatus", async (req, res) => {
//   try {
//     // Extract data from request body
//     const { state, customer_id } = req.body;

//     // If a record exists, update it
//     const result = await sql.query`
//       UPDATE requests
//       SET state = ${state}
//       WHERE customer_id = ${customer_id}
//     `;

//     // Send success response
//     res.status(200).json({ message: "Status updated" });
//   } catch (error) {
//     // Send error response
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.post("/api/deleterequest", async (req, res) => {
//   try {
//     // Extract data from request body
//     const { customer_id } = req.body;

//     // If a record exists, update it
//     const result = await sql.query`
//     DELETE FROM requests WHERE customer_id = ${customer_id}
//     `;

//     // Send success response
//     res.status(200).json({ message: "Status updated" });
//   } catch (error) {
//     // Send error response
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// process.on("SIGINT", async () => {
//   try {
//     await sql.close();
//     console.log("Database connection closed");
//   } catch (error) {
//     console.error("Error closing database connection:", error);
//   }
// });
