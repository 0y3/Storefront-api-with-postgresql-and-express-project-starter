/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_product_id INT,
    product_id INT,
    quantity integer,
    total_price REAL,
    status VARCHAR(255),
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_product FOREIGN KEY (order_product_id) REFERENCES order_product(id) ON DELETE CASCADE
    
);
