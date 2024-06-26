-- SELECT TABLE_NAME
-- FROM INFORMATION_SCHEMA.TABLES
-- WHERE TABLE_TYPE='BASE TABLE'



--   SELECT pi.product_id
-- FROM products_info pi
-- LEFT JOIN customer_products cp ON pi.product_id = cp.product_id
-- WHERE cp.customer_id = 'cus09';

-- SELECT COLUMN_NAME, DATA_TYPE
-- FROM INFORMATION_SCHEMA.COLUMNS
-- WHERE TABLE_NAME = 'organization_details';
-- ALTER TABLE organization_details
-- ALTER COLUMN customer_id VARCHAR(25);
-- select * from requests
-- ALTER TABLE requests
-- ADD customer_id VARCHAR(255);


-- CREATE TABLE requests (
--   customerName VARCHAR(255) NOT NULL,
--   productName VARCHAR(255) NOT NULL,
--   modelName VARCHAR(255) NOT NULL,
--   state int not null
-- );


-- SELECT * from organization_details
-- SHOW COLUMNS FROM organization_details;
-- DESCRIBE organization_details;
-- SELECT COLUMN_NAME
-- FROM INFORMATION_SCHEMA.COLUMNS
-- WHERE TABLE_NAME = 'organization_details';



-- SELECT * FROM quotations
-- delete from quotations
-- SELECT product_id, product_name, product_image_path
-- FROM products_info
-- WHERE product_id NOT IN (
--     SELECT product_id
--     FROM customer_products
--     WHERE customer_id = 'cus02'
-- );


-- CREATE TABLE products_info (
--     product_id INT IDENTITY(1,1) PRIMARY KEY,
--     product_name VARCHAR(255) NOT NULL,
--     product_image_path VARCHAR(255) NOT NULL
-- );
-- INSERT INTO products_info (product_name, product_image_path) VALUES ('DC Earth Fault Locator', './Product_images/DC_Earth_Fault_Locator.jpg');
-- INSERT INTO products_info (product_name, product_image_path) VALUES ('DC Earth Resistance Tester', './Product_images/DC_Earth_Resistance_Tester.jpg');
-- INSERT INTO products_info (product_name, product_image_path) VALUES ('Insulation Tester', './Product_images/Insulation_Tester.jpg.jpg');
-- INSERT INTO products_info (product_name, product_image_path) VALUES ('Offline Fault Locator', './Product_images/Offline_Fault_Locator.jpg');
-- INSERT INTO products_info (product_name, product_image_path) VALUES ('Preziohm TFR', './Product_images/Preziohm_TFR.png');

-- DELETE FROM customer_products;
-- CREATE TABLE customer_products (
--     product_id INT,
--     customer_id VARCHAR(255) NOT NULL
-- );
-- UPDATE products_info
-- SET product_image_path = '/Product_Images/Insulation_Tester.jpg'
-- where product_id=5
-- UPDATE products_info
-- SET product_image_path = '/Product_Images/Offline_Fault_Locator.jpg'
-- where product_id=6
-- UPDATE products_info
-- SET product_image_path = '/Product_Images/Preziohm_TFR.png'
-- where product_id=7
-- SELECT * from customer_products

-- CREATE TABLE tracking (
--     tracking_id INT IDENTITY(1,1) PRIMARY KEY,
--     product_id INT,
--     customer_id INT,
--     reception BOOLEAN DEFAULT FALSE,
--     evaluation BOOLEAN DEFAULT FALSE,
--     quotation BOOLEAN DEFAULT FALSE,
--     awaiting_work_order BOOLEAN DEFAULT FALSE,
--     service_in_progress BOOLEAN DEFAULT FALSE,
--     calibration BOOLEAN DEFAULT FALSE,
--     packing BOOLEAN DEFAULT FALSE,
--     dispatched BOOLEAN DEFAULT FALSE,
--     delivery BOOLEAN DEFAULT FALSE,
--     FOREIGN KEY (product_id) REFERENCES customer_products(product_id),
--     FOREIGN KEY (customer_id) REFERENCES customer_products(customer_id)
-- );



