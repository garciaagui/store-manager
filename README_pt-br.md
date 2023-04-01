<a name="readme-top"></a>

<h1 align="center">Projeto Store Manager 🛍️</h1>

> [🇺🇸 Click here to access the English version.](README.md)

## Sumário

<ol>
  <li><a href="#sobre-o-projeto">Sobre o Projeto</a></li>
  <li><a href="#tecnologias">Tecnologias</a></li>
  <li><a href="#funcionalidades">Funcionalidades</a></li>
  <li><a href="#como-executar-o-projeto">Como Executar o Projeto</a></li>
  <li><a href="#endpoints">Endpoints</a></li>
  <li><a href="#sobre-a-trybe">Sobre a Trybe</a></li>
  <li><a href="#contato">Contato</a></li>
</ol>

## Sobre o Projeto

Projeto **21** do curso de Desenvolvimento Web da [Trybe][trybe-site-url].

Aplicação consiste em uma API RESTful projetada para o gerenciamento de vendas no formato dropshipping, na qual é possível criar, visualizar, deletar e atualizar (CRUD) produtos e vendas. Desenvolvida em Node.js com banco de dados MySQL, segue a arquitetura MSC (Model-Service-Controller).

<details>
  <summary><strong>🎲 Aqui você pode se aprofundar na estrutura da base de dados.</strong></summary>

#### Diagrama de Entidade-Relacionamento

![DER](./public/der.png)

> ℹ️ Imagem criada e disponibilizada pela Trybe.

---

#### Formato das entidades

Os dados abaixo são fictícios e utilizados apenas para exemplificar a estrutura das tabelas do banco de dados.

- Uma tabela chamada `products`, com a seguinte estrutura:

  | id  | name            |
  | --- | --------------- |
  | 1   | Martelo do Thor |

- Uma tabela chamada `sales`, com a seguinte estrutura:

  | id  | date                |
  | --- | ------------------- |
  | 1   | 2022-05-27 01:59:51 |

- Uma tabela chamada `sales_products`, que faz o relacionamento `N:N` entre `products` e `sales` e tem a seguinte estrutura:

  | sale_id | product_id | quantity |
  | ------- | ---------- | -------- |
  | 1       | 1          | 5        |

</details>

<br/>

## Tecnologias

<details>
  <summary><strong>💻 Desenvolvimento </strong></summary><br />

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
  <summary><strong>🧪 Testes </strong></summary><br />

- [Chai][chai-url]
- [Mocha][mocha-url]
- [Sinon.js][sinon-url]

---

</details>

<details>
  <summary><strong>✨ Alinhamento e qualidade de código </strong></summary><br />

- [ESLint][eslint-url]

---

</details>

<br/>

## Funcionalidades

<ul>
  <li>Criar, listar, atualizar e deletar produtos.</li>
  <li>Criar, listar, atualizar e deletar vendas.</li>
</ul>

<br/>

## Como Executar o Projeto

Para rodar o projeto, siga os passos abaixo.

1. Clone o repositório;

```
git clone git@github.com:garciaagui/store-manager.git
```

2. Navegue até a raiz do projeto;

```
cd store-manager/
```

> 🔘 Agora, decida se o projeto será rodado localmente ou via Docker.

<details>
  <summary><strong>💽 Localmente</strong></summary>

1. Certifique-se que você tenha o **node** instalado na versão 16 ou superior. Confira [aqui](https://nodejs.org/pt-br/download/package-manager/) a documentação oficial.

2. Na raiz do projeto, instale as dependências do projeto.

```
npm install
```

3. Configure as variáveis de ambiente:

- Renomeie o arquivo `.env.example` (disponível na raíz do projeto) para `.env`;
- Configure as variáveis para o seu contexto local.

4. Crie a base de dados com o comando abaixo.

```
npm run migration
```

5. Popule a base de dados com o comando abaixo.

```
npm run seed
```

> ℹ️ Arquivos `migration.sql` e `seed.sql` foram criados e disponibilizados pela Trybe.

6. Para iniciar o servidor, utilize um dos comandos abaixo.

```
// Comando 1 - Precisa rodá-lo novamente em caso de alteração no código
npm run start

// Comando 2 - Reinicia o servidor automaticamente caso haja alguma alteração no código
npm run debug
```

</details>

<details>
  <summary><strong>🐋 Docker</strong></summary>
  
1. Certifique-se que você tenha o **docker-compose** instalado na versão 1.29 ou superior. Links oportunos caso você precise instalar ou atualizar: [Tutorial DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) e [documentação oficial](https://docs.docker.com/compose/install/);

2. Suba os containers executando o comando abaixo. Dois containers serão inicializados: `store_manager` (node) e `store_manager_db` (mysql).

```
docker-compose up -d
```

3. Acesse a CLI do container `store_manager` com o comando abaixo ou abra-o no VS Code. Para a última opção, recomendo a extensão da Microsoft [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

```
docker exec -it store_manager bash
```

> ⚠️ A partir de agora, **TODOS** os comandos (scripts) disponíveis no `package.json` (incluindo o npm install) devem ser executados **DENTRO** do container `store_manager`.

4. Instale as dependências do projeto.

```
npm install
```

5. Crie a base de dados com o comando abaixo.

```
npm run migration
```

6. Popule a base de dados com o comando abaixo.

```
npm run seed
```

> ℹ️ Arquivos `migration.sql` e `seed.sql` foram criados e disponibilizados pela Trybe.

7. Para iniciar o servidor, utilize um dos comandos abaixo.

```
// Comando 1 - Precisa rodá-lo novamente em caso de alteração no código
npm run start

// Comando 2 - Reinicia o servidor automaticamente caso haja alguma alteração no código
npm run debug
```

- Para o contexto de teste local, siga os passos abaixo.

1. Renomeie o arquivo `.env.example` (disponível na raíz do projeto) para `.env`;
2. Configure as variáveis para o seu contexto local.

</details>

<br/>

## Endpoints

Abaixo você pode conferir um detalhamento dos endpoints utilizados no projeto. Para realizar as requisições HTTP e consultar o comportamento de cada endpoint, você pode utilizar a extensão [Thunder Client](https://www.thunderclient.com/).

<details>
  <summary><strong>Products</strong></summary>

### GET /products

- Retorna todos os produtos registrados no banco de dados.
- URL: `http://localhost:PORT/products`

### POST /products

- Adiciona um novo produto ao banco de dados.
- URL: `http://localhost:PORT/products`
- O corpo da requisição deve seguir o formato abaixo:

```
{
  "name": "string"
}
```

### GET /products/search

- Retorna todos os produtos que contenham em seu nome o termo passado na query.
- Exemplo de URL: `http://localhost:PORT/products/search?q=Martelo`

### GET /products/:id

- Retorna o produto cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/products/1`

### PUT /products/:id

- Atualiza o produto cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/products/1`
- O corpo da requisição deve seguir o formato abaixo:

```
{
  "name": "string"
}
```

### DELETE /products/:id

- Remove do banco de dados o produto cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/products/1`

---

</details>

<details>
  <summary><strong>Sales</strong></summary>

### GET /sales

- Retorna todas as vendas registradas no banco de dados.
- URL: `http://localhost:PORT/sales`

### POST /sales

- Adiciona uma nova venda ao banco de dados.
- URL: `http://localhost:PORT/sales`
- O corpo da requisição deve seguir o formato abaixo:

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

- Retorna a venda cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/sales/1`

### PUT /sales/:id

- Atualiza a venda cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/sales/1`
- O corpo da requisição deve seguir o formato abaixo:

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

- Remove do banco de dados a venda cujo id foi passado na URL.
- Exemplo de URL: `http://localhost:PORT/sales/1`

---

</details>

<br/>

## Sobre a Trybe

_"A [Trybe][trybe-site-url] é uma escola do futuro para qualquer pessoa que queira melhorar de vida e construir uma carreira de sucesso em tecnologia, onde a pessoa só paga quando conseguir um bom trabalho."_

_"O programa conta com mais de 1.500 horas de aulas online, aborda introdução ao desenvolvimento de software, front-end, back-end, ciência da computação, engenharia de software, metodologias ágeis e habilidades comportamentais._"

<br/>

## Contato

Projeto desenvolvido por Guilherme Garcia. Seguem abaixo minhas redes sociais e meios de contato. 🤘

[![Gmail][gmail-badge]][gmail-url]
[![Linkedin][linkedin-badge]][linkedin-url]
[![GitHub][github-badge]][github-url]
[![Instagram][instagram-badge]][instagram-url]

<p align="right"><a href="#readme-top">Voltar ao topo</a></p>

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
