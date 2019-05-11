DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(16) NOT NULL,
    department_name VARCHAR(16) NOT NULL,
    price float(4,2) NOT NULL,
    stock_quantity int NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Electronics", "299.99", 5), 
       ("Macbook Pro", "Electronics", "999.99", 10),
	   ("Bootsy Collins", "Funk", "69.69", 69), 
       ("It", "Movies and Games", "19.99", 1), 
       ("Necronomicon", "Books", "666.66", 1), 
       ("USS Voyager", "Electronics", "29.99", 11),
       ("Samsung Galaxy S10+", "Electronics", "1.99", 100), 
       ("Mini Countryman", "Cars", "2.99", 1),
       ("Puppy", "Animals", "1000.00", 0), 
       ("Kitty", "Animals", "999.99", 1);