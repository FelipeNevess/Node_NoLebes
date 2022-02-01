DROP DATABASE IF EXISTS StoreManager;

CREATE DATABASE StoreManager;

USE StoreManager;

CREATE TABLE products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (sale_id)
        REFERENCES sales (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

-- INSERT INTO sales (date) VALUES("2022-01-28 13:32:01");
-- INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(1, 1, 22);

SET SQL_SAFE_UPDATES = 0;
