<a name="readme-top"></a>

<h1 align="center">Project Store Manager 🛍️</h1>

> [🇧🇷 Clique aqui para acessar a versão em português.](README_pt-br.md)

## Summary

<ol>
  <li><a href="#description">Description</a></li>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#how-to-run">How to Run</a></li>
  <li><a href="#endpoints">Endpoints</a></li>
  <li><a href="#about-trybe">About Trybe</a></li>
  <li><a href="#contact">Contact</a></li>
</ol>

## Description

**21st project** of the [Trybe][trybe-site-url] Web Development course.

This application is a RESTful API designed for managing dropshipping sales, allowing the creation, viewing, deletion, and updating (CRUD) of products and sales. It was developed in Node.js with MySQL database, following the MSC (Model-Service-Controller) architecture.

<details>
  <summary><strong>🎲 Here you can go deeper into the database structure.</strong></summary>

#### Entity-Relationship Diagram

![DER](./public/der.png)

> ℹ️ Image created and provided by Trybe.

---

#### Entities format

The data below are fictitious and used only to exemplify the structure of the database tables.

- A table called `products`, with the following structure:

  | id  | name            |
  | --- | --------------- |
  | 1   | Martelo do Thor |

- A table called `sales`, with the following structure:

  | id  | date                |
  | --- | ------------------- |
  | 1   | 2022-05-27 01:59:51 |

- A table called `sales_products`, which establishes a `N:N` relationship between `products` and `sales` and has the following structure:

  | sale_id | product_id | quantity |
  | ------- | ---------- | -------- |
  | 1       | 1          | 5        |

</details>

<br/>

## Technologies

<details>
  <summary><strong>💻 Development </strong></summary><br />

- [Docker][docker-url]
- [dotenv][dotenv-url]
- [Express][express-url]
- [JavaScript][javascript-url]
- [Joi][joi-url]
- [MySQL][mysql-url]
- [Node.js][node-url]
- [Nodemon][nodemon-url]

---

</details>

<details>
  <summary><strong>🧪 Testing </strong></summary><br />

- [Chai][chai-url]
- [Mocha][mocha-url]
- [Sinon.js][sinon-url]

---

</details>

<details>
  <summary><strong>✨ Code alignment and quality </strong></summary><br />

- [ESLint][eslint-url]

---

</details>

<br/>

## Features

<ul>
  <li>Create, list, update, and delete products.</li>
  <li>Create, list, update, and delete sales.</li>
</ul>

<br/>

## How to Run

To run the project, follow the steps below.

1. Clone the repository;

```
git clone git@github.com:garciaagui/store-manager.git
```

2. Navigate to the root of the project;

```
cd store-manager/
```

> 🔘 Now, decide whether the project will be run locally or via Docker.

<details>
  <summary><strong>💽 Locally</strong></summary>

1. Make sure you have **Node.js** installed in version 16 or higher. Check out the [official documentation](https://nodejs.org/en/download/package-manager) for more information.

2. In the project root, install the project dependencies.

```
npm install
```

3. Set up the environment variables:

- Rename the `.env.example` file (available in the project root) to `.env`;
- Set the variables for your local environment.

4. Create the database with the command below.

```
npm run migration
```

5. Populate the database with the command below.

```
npm run seed
```

> ℹ️ The `migration.sql` and `seed.sql` files were created and provided by Trybe.

6. To start the server, use one of the commands below.

```
// Command 1 - Needs to be run again in case of code changes
npm run start

// Command 2 - Restarts the server automatically if there are any changes in the code
npm run debug
```

</details>

<details>
  <summary><strong>🐋 Docker</strong></summary>

1. Make sure you have **docker-compose** installed in version 1.29 or higher. Useful links if you need to install or update: [DigitalOcean Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04) and [official documentation](https://docs.docker.com/compose/install/);

2. Start the containers by running the command below. Two containers will be started: `store_manager` (node) and `store_manager_db` (mysql).

```
docker-compose up -d
```

3. Access the CLI of the `store_manager` container with the command below or open it in VS Code. For the latter, I recommend the Microsoft extension [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

```
docker exec -it store_manager bash
```

> ⚠️ From now on, **ALL** commands (scripts) available in `package.json` (including npm install) must be executed **INSIDE** the `store_manager` container.

4. Install the project's dependencies.

```
npm install
```

5. Create the database with the command below.

```
npm run migration
```

6. Populate the database with the command below.

```
npm run seed
```

> ℹ️ The `migration.sql` and `seed.sql` files were created and provided by Trybe.

7. To start the server, use one of the commands below.

```
// Command 1 - Needs to be run again in case of code changes
npm run start

// Command 2 - Restarts the server automatically if there are any code changes
npm run debug
```

- For the local test context, follow the steps below.

1. Rename the `.env.example` file (available in the project root) to `.env`;
2. Set the variables for your local environment.

</details>

<br/>

## Endpoints

Below you can find a breakdown of the endpoints used in the project. To make HTTP requests and check the behavior of each endpoint, you can use the [Thunder Client](https://www.thunderclient.com/) extension.

<details>
  <summary><strong>Products</strong></summary>

### GET /products

- Returns all products registered in the database.
- URL: `http://localhost:PORT/products`

### POST /products

- Adds a new product to the database.
- URL: `http://localhost:PORT/products`
- The request body must follow the format below:

```
{
  "name": "string"
}
```

### GET /products/search

- Returns all products whose name contains the search term passed in the query.
- Example URL: `http://localhost:PORT/products/search?q=Martelo`

### GET /products/:id

- Returns the product whose id was passed in the URL.
- Example URL: `http://localhost:PORT/products/1`

### PUT /products/:id

- Updates the product whose id was passed in the URL.
- Example URL: `http://localhost:PORT/products/1`
- The request body must follow the format below:

```
{
  "name": "string"
}
```

### DELETE /products/:id

- Removes from the database the product whose id was passed in the URL.
- Example URL: `http://localhost:PORT/products/1`

---

</details>

<details>
  <summary><strong>Sales</strong></summary>

### GET /sales

- Returns all sales registered in the database.
- URL: `http://localhost:PORT/sales`

### POST /sales

- Adds a new sale to the database.
- URL: `http://localhost:PORT/sales`
- The request body must follow the format below:

```
[
  {
    "productId": number,
    "quantity": number
  },
  {
    "productId": number,
    "quantity": number
  }
]
```

### GET /sales/:id

- Returns the sale whose id was passed in the URL.
- Example URL: `http://localhost:PORT/sales/1`

### PUT /sales/:id

- Updates the sale whose id was passed in the URL.
- Example URL: `http://localhost:PORT/sales/1`
- The request body must follow the format below:

```
[
  {
    "productId": number,
    "quantity": number
  },
  {
    "productId": number,
    "quantity": number
  }
]
```

### DELETE /sales/:id

- Removes from the database the sale whose id was passed in the URL.
- Example URL: `http://localhost:PORT/sales/1`

---

</details>

<br/>

## About Trybe

_"[Trybe][trybe-site-url] is a future school for anyone who wants to improve their lives and build a successful career in technology, where the person only pays when they get a good job."_

_"The program features over 1,500 hours of online classes covering introduction to software development, front-end, back-end, computer science, software engineering, agile methodologies, and behavioral skills."_

<br/>

## Contact

Project developed by **Guilherme Garcia**. Below are my social networks and means of contact. 🤘

[![Gmail][gmail-badge]][gmail-url]
[![Linkedin][linkedin-badge]][linkedin-url]
[![GitHub][github-badge]][github-url]
[![Instagram][instagram-badge]][instagram-url]

<p align="right"><a href="#readme-top">Back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->

[trybe-site-url]: https://www.betrybe.com/

<!-- Stacks URLs -->

[chai-url]: https://www.chaijs.com/
[docker-url]: https://www.docker.com/
[dotenv-url]: https://www.dotenv.org/
[eslint-url]: https://eslint.org/
[express-url]: https://expressjs.com/
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[joi-url]: https://joi.dev/api/?v=17.7.0
[mocha-url]: https://mochajs.org/
[mysql-url]: https://www.mysql.com/
[node-url]: https://nodejs.org/en/
[nodemon-url]: https://nodemon.io/
[sinon-url]: https://sinonjs.org/

<!-- Contact URLs & Badges -->

[gmail-badge]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:garciaguig@gmail.com
[linkedin-badge]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/garciaagui/
[github-badge]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/garciaagui
[instagram-badge]: https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white
[instagram-url]: https://www.instagram.com/garciaagui/
