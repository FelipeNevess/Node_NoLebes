# Node Express

## Antes de tudo crie o banco "`StoreManager.sql`" que está na pasta principal do projeto.

- ### Use a ferramenta mysql `workbench`
- ### Ou se preferir use o `Docker` e baixe a imagem na versao 5 do `mysql`
  - `docker container run --name store-manager-mysql -e MYSQL_ROOT_PASSWORD=store-manager -d -p 3306:3306 mysql:5`

### Não se esqueçam de atualizar o arquivo .env de acordo!

### Configure o arquivo `.env.example`, renomeie para `.env` e preencha os dados de conexão com banco

De acordo com sua conexão, ex:
```
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

---

&nbsp;

## _Use o `Insomnia` ou outra ferramenta para fazer as requisições_

Iniciando a aplicação:

- `npm install` para instalar as dependências
- `npm run debug` iniciar a aplicação com `nodemon` ou
- `npm start` iniciar a aplicação com `node`

---

&nbsp;

# Rotas da tabela products

### `[POST] - /products`

## <p id="erro">Em caso de erro</p>

- Quando a requisição é feita sem o atributo name :
  - input :
    ```
      { "quantity": 100 }
    ```
  - output:
    ```
      { "message": "\"name\" is required" }
    ```
  ***
- Quando a requisição é feita e contém o seguinte body :
  - input :
    ```
      { "name": "pro", "quantity": 100 }
    ```
  - output :
    ```
      {
        "message": "\"name\" length must be at least 5 characters long"
      }
    ```
  ***
- Quando a requisição é feita com o atributo name igual um já cadastrado :
  - input :
    ```
      { "name": "produto", "quantity": 100 }
    ```
  - output :
    ```
      { "message": "Product already exists" }
    ```
  ***
- Quando a requisição é feita sem o atributo quantity :
  - input :
    ```
      { "name": "produto" }
    ```
  - output :
    ```
      { "message": "\"quantity\" is required" }
    ```
  ***
- Quando a requisição é feita e contém os seguintes body :
  - input:
    - ```
      { "name": "produto", "quantity": "string" } ou
      ```
    - ```
      { "name": "produto", "quantity": -1 } ou
      ```
    - ```
      { "name": "produto", "quantity": 0 }
      ```
  - output :
    ```
      {
        "message": "\"quantity\" must be a number larger than or equal to 1"
      }
    ```

## Em caso de sucesso

- Quando a requisição é feita e contém o seguinte body :
  - input :
    ```
      { "name": "produto", "quantity": 10 }
    ```
  - output :
    ```
      { "id": 1, "name": "produto", "quantity": 10 }
    ```

---

&nbsp;

### `[GET] - /products `e` /products/:id`

## Em caso de erro

- Quando a requisição é feita e contém um id invalido :
  - input :
    ```
      { "id": 9999 }
    ```
  - output :
    ```
      { "message": "Product not found" }
    ```

## Em caso de sucesso

- Pegar todos os produtos :
  - output:
  ```
    [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]
  ```

---

- Buscar produto por id :
  - input :
    ```
      { "id": 1 }
    ```
  - output :
    ```
      { "id": 1, "name": "produto A", "quantity": 10 }
    ```

---

&nbsp;

### `[PUT] - /products/:id`

## Em caso de erro

- Os erros de `name` e `quantity` são os mesmos citados anteriormente <a href="#erro">aqui</a>

- Quando a requisição é feita e contém um id invalido :
  - input :
    ```
      { "id": 9999 }
    ```
  - output :
    ```
      { "message": "Product not found" }
    ```

## Em caso de sucesso

- input :
  ```
    { "name": "produto", "quantity": 15 }
  ```
- output :
  ```
    { "id": 1, "name": "produto", "quantity": 15 }
  ```

---

&nbsp;

### `[DELETE] - /products/:id`

## Em caso de erro

- Quando a requisição é feita e contém um id invalido :
  - input :
    ```
      { "id": 9999 }
    ```
  - output :
    ```
      { "message": "Product not found" }
    ```

## Em caso de sucesso

- input :
  ```
    { "id": 1 }
  ```
- output :
  ```
    { "id": 1, "name": "produto A", "quantity": 10 }
  ```

---

&nbsp;

# Rotas da tabela sales

### `[POST] - /sales`

## Em caso de erro

- Quando a requisição é feita sem o atributo `product_id` :
  - input :
    ```
      [ { "quantity": 1 } ]
    ```
  - output :
    ```
      { "message": "\"product_id\" is required" }
    ```
  ***
- Quando a requisição é feita sem o atributo `quantity` :
  - input :
    ```
      [ { "product_id": 1 } ]
    ```
  - output :
    ```
      { "message": "\"quantity\" is required" }
    ```
  ***
- Quando a requisição é feita e contém os seguintes `body` :

  - <p id="erro_qtd">input :</p>

    - ```
        [ { "product_id": 1, "quantity": -1 } ]
      ```
    - ```
        [ { "product_id": 1, "quantity": 0 } ]
      ```
    - ```
        [ { "product_id": 1, "quantity": "string" } ]
      ```

  &nbsp;

  - output :
    ```
      {
        "message": "\"quantity\" must be a number larger than or equal to 1"
      }
    ```

## Em caso de sucesso

- Quando a requisição é feita e contém o seguinte body :
  - input :
    ```
      [ { "product_id": 1, "quantity": 3 } ]
    ```
  - output :
    ```
      {
        "id": 1,
        "itemsSold": [
          {
            "product_id": 1,
            "quantity": 3
          }
        ]
      }
    ```
    ***
- Quando a requisição é feita e contém o seguinte body :

  - input --->
    ```
    [
      {
        "product_id": 1,
        "quantity": 2
      },
      {
        "product_id": 2,
        "quantity": 5
      }
    ]
    ```

  &nbsp;

  - output --->
    ```
    {
      "id": 1,
      "itemsSold": [
        {
          "product_id": 1,
          "quantity": 2 },
        {
          "product_id": 2,
          "quantity": 5
        }
      ]
    }
    ```

---

&nbsp;

### `[GET] - /sales `e` /sales/:id`

## Em caso de erro

- Quando a requisição é feita e contém um id invalido :
  - input :
    ```
      { "id": 9999 }
    ```
  - output :
    ```
      { "message": "Sale not found" }
    ```

## Em caso de sucesso

- Pegar todas as vendas :
  output :
  ```
    [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ];
  ```
  ***
- Busca por id :
  - input :
    ```
      { id: 1 }
    ```
  - output --->
  ```
     [
       {
         "date": "2021-09-09T04:54:29.000Z",
         "product_id": 1,
         "quantity": 2
       },
       {
         "date": "2021-09-09T04:54:54.000Z",
         "product_id": 2,
         "quantity": 2
       }
     ];
  ```

---

&nbsp;

### `[PUT] - /sales/:id`

## Em caso de erro

- Quando a requisição é feita sem o atributo `product_id` :

  - input :
    ```
      [ { "quantity": 10 } ]
    ```
  - output :
    ```
      { "message": "\"product_id\" is required" }
    ```

  ***

- Quando a requisição é feita sem o atributo `quantity` :
  - input :
    ```
      [ { "product_id": 1 } ]
    ```
  - output :
    ```
      { "message": "\"quantity\" is required" }
    ```
  ***
- Erros da propriedade quantity <a  href="#erro_qtd">aqui</a>

## Em caso de sucesso

- Quando a requisição é feita e contém o seguinte body :
  - input :
    ```
      [ { "product_id": 1, "quantity": 6 } ]
    ```
  - output:
    ```
    {
      "saleId": 1,
      "itemUpdated": [
        {
          "product_id": 1,
          "quantity": 6
        }
      ]
    }
    ```

---

&nbsp;

### `[DELETE] - /sales/:id`

## Em caso de erro

- Quando a requisição é feita e contém um id invalido :
  - input :
    ```
      { "id": 9999 }
    ```
  - output :
    ```
      { "message": "Sale not found"
    ```

## Em caso de sucesso

- input :
  ```
    { "id": 1 }
  ```
- output:
  ```
      [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "product_id": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "product_id": 2,
          "quantity": 2
        }
      ]
  ```
