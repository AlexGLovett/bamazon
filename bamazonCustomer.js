//Requirements
var mysql = require("mysql");
var inquirer = require("inquirer");

var conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "11243",
  database: "bamazon"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected.");
  begin();
});

function begin() {
  query = `SELECT item_id, product_name, department_name, price, stock_quantity
    FROM products`;
  var products = [];
  conn.query(query, function(err, res) {
    if (err) throw err;
    res.forEach(product => {
      products.push(product.item_id.toString());
      console.log(
        product.item_id +
          " | " +
          product.product_name +
          " | " +
          product.department_name +
          " | " +
          product.price +
          " | " +
          product.stock_quantity
      );
    });
    order(products);
  });
}

function order(products) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "product",
        message: "~Product IDs~",
        choices: products
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?"
      }
    ])
    .then(function(choice) {
      conn.query(
        "SELECT item_id, stock_quantity, price FROM products WHERE item_id = " +
          choice.product +
          " AND stock_quantity >= " +
          choice.quantity,
        (function(qnt) {
          return function(err, res) {
            if (err) throw err;
            if (res.length > 0) {
              console.log("Proceeding to purchase.");
              purchase(res, qnt);
            } else
              console.log(
                "Not Enough. You'll need to purchase fewer items or try again after we restock!"
              );
          };
        })(choice.quantity)
      );
    });
}

function purchase(res, quant) {
  var response = res;
  conn.query(
    "UPDATE products SET stock_quantity = " +
      (res[0].stock_quantity - parseInt(quant)) +
      " WHERE item_id = " +
      res[0].item_id,
    function(err, res) {
      if (err) throw err;
      console.log("Your order has been processed.");
      console.log("Your account will be charged $" + response[0].price * parseInt(quant));
    }
  );
  setTimeout(beginAgain, 2000);
}

function beginAgain() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "cont",
        message: "Would you like to continue shopping or quit?",
        choices: ["Shop", "Quit"]
      }
    ])
    .then(function(choice) {
      if (choice.cont === "Quit") {
        console.log("Thankyou for shopping with Bamazon! Have a great day.");
        conn.end();
        return;
      } else {
        begin();
      }
    });
}
