/* Replace with your SQL commands */
CREATE TABLE order_product (
    id SERIAL PRIMARY KEY,
    user_id INT,
    total integer,
    status VARCHAR(255),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    
);