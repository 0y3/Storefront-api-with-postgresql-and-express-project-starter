# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database

## Steps to Run Local

### 1. Setup DB and Server Instructions

Create a db in your postgres
**DB name:**`postgres` ,
**Username:**`postgres` ,
**password:**`mysecretpassword` .


### 2. Package installation instructions


- Clone the project

```bash
  git clone https://github.com/0y3/Storefront-api-with-postgresql-and-express-project-starter.git
```  
  **Example**: A SHOW route: 'blogs/:id' [GET]

- Go to the project directory

```bash
  cd Storefront-api-with-postgresql-and-express-project-starter folder
```

- Install dependency

```bash
  npm install
```

- Create a new Files name `.env` inside the Storefront-api-with-postgresql-and-express-project-starter folder.

-  add data below to `.env` 

```bash
  ENV = 'production'
  PORT = 2130
  POSTGRES_HOST = 127.0.0.1
  POSTGRES_PORT = 5432
  POSTGRES_DB = postgres
  POSTGRES_USER = postgres
  POSTGRES_PWD = mysecretpassword
```

- Build DB Migration to project 

```bash
  npm run migrate_up_all
```

- Build the server

```bash
  npm run build
```

- Start the server

```bash
  npm run start:dev
```

**NOTE** token is generated and display in your browser or ide console 

<!-- Api Endpoint  -->

## Api Endpoint 

## API Endpoints

#### Products

 - [GET REQUEST] Index
```dash
http://localhost:2130/api/product
```

- [GET REQUEST] Show [Required args: `{id}` eg 1]
```dash
http://localhost:2130/api/product/{id}
```

- Create [POST requests] [token required]  (Required args: `name` ,`price` & `category`)

```dash
http://localhost:2130/api/product/?name=Eyeshadow &price=300&category=Beauty %26 Health
```

- [GET REQUEST]  Top 5 most popular products
```dash
http://localhost:2130/api/product/getcategory/top
```

- [GET REQUEST]  Products by category (Required args: `{categoryname}` eg Eyeshadow)
```dash
http://localhost:2130/api/product/category/{categoryname}
```



#### Users

- [GET REQUEST]  Index [token required]
```dash
http://localhost:2130/api/user
```

- [GET REQUEST]  Show [token required]
```dash
http://localhost:2130/api/user
```

- [POST REQUEST] Create [token required] (Required args: `firstName` ,`firstName` & `password`)
```dash
http://localhost:2130/api/user?firstName=nameless&lastName=nameless lass&password=admin2
```

#### Orders

 - [GET REQUEST] Index
```dash
http://localhost:2130/api/order
```

- [POST REQUEST] Create (Required args: `JSON Format`)
`example
{
  "user_id":1,
  "total": 6000,
  "status":"complete",
  "products":[
      {
        "product_id":1,
        "quantity": 2,
        "total_price": 2000
      },
       {
        "product_id":2,
        "quantity": 1,
        "total_price": 1000
      },
       {
        "product_id":1,
        "quantity": 3,
        "total_price": 3000
      }
    ]
}`
**NOTE** `status` can either be `active` or `inactive`
```dash
http://localhost:2130/api/order/
``` 

- [GET REQUEST] Current Order by user (Required args: `{user_id}` eg 1)[token required]
```dash
http://localhost:2130/api/user/{user_id}
```

- [GET REQUEST] Completed Orders by user (Required args: `{user_id}` eg 1)[token required]
```dash
http://localhost:2130/api/order/user/{user_id}/completeorder
```

- [GET REQUEST] Completed Orders and Product Details by Order Id (Required args: `{order_id}` eg 1)[token required]
```dash
http://localhost:2130/api/order/orderproduct/{order_id}
```


<!-- Contact -->

## Contact

Name - Oy3 Wilson

Email - trivin98@gmail.com

Project Link: [https://github.com/0y3/Storefront-api-with-postgresql-and-express-project-starter](https://github.com/0y3/Storefront-api-with-postgresql-and-express-project-starter)
