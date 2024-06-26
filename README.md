# Gerador de Corridas

## Visão Geral

Este projeto é uma aplicação para Gerenciamento de Corridas, destinada a administrar transações de viagens de seus usuários. A aplicação é desenvolvida em Node.js com SQLite como banco de dados, e oferece uma API RESTful para criar, gerenciar e consultar usuários e suas corridas.

## Índice

1. [Estrutura do projeto](#estrutura-do-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Instruções de Configuração](#instruções-de-configuração)
4. [Endpoints da API](#endpoints-da-api)
6. [Executando Testes](#executando-testes)
7. [Informações Adicionais](#informações-adicionais)

## Estrutura do Projeto

O projeto segue uma arquitetura MVC padrão.

O padrão de arquitetura MVC oferece uma separação clara de responsabilidades entre os componentes do aplicativo - Modelo, Visão e Controlador. Isso simplifica o desenvolvimento, a manutenção e a escalabilidade do aplicativo, ao mesmo tempo em que melhora a reutilização de código e a testabilidade. Essa estrutura organizacional ajuda a manter o código limpo, compreensível e fácil de dar manutenção, tornando o MVC uma escolha valiosa para o desenvolvimento de aplicativos web.

## Tecnologias Utilizadas

-   **Express**: Um framework web rápido, flexível e minimalista para Node.js.
-   **Sequelize**: Uma biblioteca de ORM (Object-Relational Mapping) para Node.js, que suporta bancos de dados relacionais como MySQL, PostgreSQL, SQLite e outros.
-   **SQLite3**: Um driver SQLite para Node.js, que permite interagir com bancos de dados SQLite.

### Testes

-   **Jest**: Um framework de teste de JavaScript com uma experiência integrada de "zero configuração", amplamente utilizado para testar aplicações Node.js.

### Ferramentas de Desenvolvimento

-   **Webpack**: Um bundler de módulos estáticos para JavaScript. Transforma módulos com dependências em arquivos estáticos que representam esses módulos.
-   **ESLint**: Uma ferramenta de análise de código estático para identificar padrões problemáticos no código JavaScript.
-   **Prettier**: Um formatador de código opinativo. Ele remove discussões sobre estilo de código, aplicando um estilo consistente em todo o código.
-   **Husky**: Um utilitário que permite configurar ganchos Git facilmente. Útil para definir tarefas como pré-compromisso e pós-compromisso.

### Tipagem

-   **Joi**: Uma biblioteca de validação de dados para JavaScript. É amplamente utilizada para validar e descrever objetos JavaScript.

### Outros

-   **Lint-staged**: Uma ferramenta para executar scripts em arquivos que são selecionados por um determinado padrão de Git antes de confirmar as alterações.
-   **Globals**: Uma biblioteca que oferece acesso a variáveis globais no Node.js.

## Instruções de Configuração

### Pré-requisitos

-   Node.js
-   npm | yarn

### Instalação

1. Clone o repositório:

    ```bash
    git clone git@github.com:escobarAndre/rides_manager_API.git
    ```

2. Instale as dependências:
    ```bash
     npm install
    ```

### Executando a Aplicação

**Para iniciar a aplicação em modo de desenvolvimento:**

```bash
  npm run serve:dev
```

O servidor será iniciado em http://localhost:3000.

### Build

```bash
    npm run build
```

**Para iniciar a aplicação em modo de produção:**

```bash
    npm run serve:prod
```

## Endpoints da API

-   Rotas de Corrida (Ride)

    -   Listar todas as corridas
        Rota: /
    -   Obter detalhes de uma corrida específica
        Rota: /:id
    -   Listar todas as corridas de um passageiro
        Rota: /passenger/:passenger_id
    -   Obter detalhes de uma corrida específica de um passageiro
        Rota: /passenger/:passenger_id/:id
    -   Criar uma nova corrida
        Rota: /
    -   Cancelar uma corrida
        Rota: /:id/cancel
    -   Iniciar uma corrida
        Rota: /:id/start
    -   Finalizar uma corrida
        Rota: /:id/finish

-   Rotas de Usuário (User)
    -   Criar um novo usuário
        Rota: /
    -   Listar todos os usuários
        Rota: /
    -   Obter detalhes de um usuário específico
        Rota: /:id
    -   Deletar um usuário
        Rota: /:id
    -   Atualizar os detalhes de um usuário
        Rota: /:id

## Executando Testes

Para executar os testes, utilize o seguinte comando:

```sh
  npm run test
```

## Informações adicionais

Para criar uma corrida, é essencial primeiro criar um usuário, pois cada corrida está associada a um usuário. Recomenda-se a criação de alguns usuários antes de iniciar a iteração sobre as corridas.
