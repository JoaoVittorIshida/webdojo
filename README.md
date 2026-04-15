# 🥋 WebDojo - Fork com foco em Automação de Testes

Este repositório é um fork do projeto original do curso **Ninja do Cypress** e reúne as adaptações e evoluções que desenvolvi para praticar e aprofundar **testes automatizados E2E e de API com Cypress**. 🚀

Mais do que "fazer o teste passar", a proposta aqui foi construir uma suíte com organização, reaproveitamento e validações consistentes, simulando um cenário real de qualidade de software. ✅

## ✨ Destaques deste fork

- Cobertura de fluxos importantes da aplicação (login, signup, CEP, formulários, links, iframe, hover, alertas, kanban etc.).
- **API REST completa** (Express + Prisma + PostgreSQL) com CRUD de usuários testada via Cypress.
- Testes de API com `cy.api`, `cy.task` e limpeza de banco via `before`/`after`.
- Execução em **desktop** e **mobile** via scripts dedicados.
- Estrutura separada por responsabilidades (`e2e`, `fixtures`, `support`, `actions`).
- Reuso de comandos e ações para reduzir duplicação e facilitar manutenção.
- Uso de **ferramentas expert**: `invoke`, `press`, aliases com `as`, `faker` e `lodash`.

## 📂 Estrutura de pastas do projeto

```text
webdojo/
|-- docker-compose.yaml
|-- README.md
|-- api/
|   |-- index.js
|   |-- db.js
|   |-- prisma/
|   |-- cypress.config.js
|   |-- package.json
|   `-- cypress/
|       |-- e2e/
|       |   |-- get.cy.js
|       |   |-- post.cy.js
|       |   |-- put.cy.js
|       |   `-- delete.cy.js
|       `-- support/
|           |-- commands.js
|           |-- database.js
|           `-- e2e.js
`-- web/
    |-- cypress.config.js
    |-- package.json
    `-- cypress/
        |-- e2e/
        |   |-- alerts.cy.js
        |   |-- cep.cy.js
        |   |-- consultancy.cy.js
        |   |-- expert.cy.js
        |   |-- github.cy.js
        |   |-- hover.cy.js
        |   |-- iframe.cy.js
        |   |-- kanban.cy.js
        |   |-- links.cy.js
        |   |-- login.cy.js
        |   `-- signup.cy.js
        |-- fixtures/
        |   |-- cep.json
        |   |-- consultancy.json
        |   `-- document.pdf
        |-- screenshots/
        |-- support/
        |   |-- commands.js
        |   |-- e2e.js
        |   |-- utils.js
        |   `-- actions/
        |       |-- consultancy.actions.js
        |       `-- github.actions.js
        `-- videos/
```

---

## 🖥️ Front-end (`web/`)

### Estrutura do Cypress (`web/cypress`)

- `web/cypress/e2e`: specs E2E organizadas por funcionalidade.
- `web/cypress/fixtures`: massa de dados para cenários de teste (`cep.json`, `consultancy.json`, `document.pdf`).
- `web/cypress/support`: inicialização global, comandos customizados e utilitários.
- `web/cypress/support/actions`: ações reutilizáveis para domínios específicos (consultoria e GitHub).
- `web/cypress/screenshots`: evidências automáticas em caso de falha.
- `web/cypress/videos`: gravações das execuções em modo `run`.

### Specs atuais em `web/cypress/e2e`

- `alerts.cy.js`
- `cep.cy.js`
- `consultancy.cy.js`
- `expert.cy.js` — técnicas avançadas: `invoke`, `press`, aliases, geração de dados com `faker` e `lodash`
- `github.cy.js`
- `hover.cy.js`
- `iframe.cy.js`
- `kanban.cy.js`
- `links.cy.js`
- `login.cy.js`
- `signup.cy.js`

### Pré-requisitos

- Node.js 22+
- npm ou yarn

### Como subir o front-end

O Cypress usa `baseUrl: http://localhost:3000` em `web/cypress.config.js`.

```bash
cd web
npm install
npm run dev
```

O script `dev` executa `serve -s dist -p 3000`.

### Como rodar os testes de front

Com a aplicação no ar, vá para a pasta `web` e use um dos scripts abaixo:

- `npm run test`: roda toda a suíte em modo headless com viewport desktop (`1440x900`).
- `npm run test-mobile`: roda a suíte em modo headless com viewport mobile (`414x896`).
- `npm run test-ui`: abre o Cypress Test Runner com viewport desktop (`1440x900`).
- `npm run test-ui-mobile`: abre o Cypress Test Runner com viewport mobile (`414x896`).

Se preferir `yarn`:

- `yarn test`
- `yarn test-mobile`
- `yarn test-ui`
- `yarn test-ui-mobile`

---

## 🔌 API (`api/`)

API REST construída com **Express + Prisma + PostgreSQL**, exposta em `http://localhost:3333`.

### Endpoints disponíveis

| Método | Rota                    | Descrição                    |
|--------|-------------------------|------------------------------|
| GET    | `/api/users`            | Lista todos os usuários      |
| POST   | `/api/users/register`   | Cadastra um novo usuário     |
| PUT    | `/api/users/:id`        | Atualiza um usuário existente|
| DELETE | `/api/users/:id`        | Remove um usuário por ID     |

### Specs de API em `api/cypress/e2e`

- `get.cy.js` — lista usuários e valida ausência de `password` na resposta
- `post.cy.js` — cadastro, email duplicado, campos obrigatórios e JSON malformado
- `put.cy.js` — atualização completa, campos obrigatórios e 404 para ID inexistente
- `delete.cy.js` — remoção de usuário existente e 404 para ID já removido

### Comandos customizados de API (`api/cypress/support/commands.js`)

- `cy.postUser(user)` — POST em `/api/users/register`
- `cy.getUsers()` — GET em `/api/users`
- `cy.putUser(id, user)` — PUT em `/api/users/:id`
- `cy.deleteUserById(id)` — DELETE em `/api/users/:id`

Todos usam `cypress-plugin-api` (`cy.api`) com `failOnStatusCode: false` para testar cenários de erro sem quebrar o teste.

### Como subir a API

```bash
cd api
npm install
npm run dev
```

O script `dev` executa as migrations do Prisma e sobe a API com `nodemon`.

### Como rodar os testes de API

Com a API no ar, na pasta `api`:

```bash
npx cypress open   # modo interativo
npx cypress run    # modo headless
```

---

## 💡 Boas práticas aplicadas nos testes

- **Comandos customizados para reduzir repetição**
	Em `web/cypress/support/commands.js`, comandos como `cy.start()`, `cy.submitLoginForm()`, `cy.goTo()` e `cy.Login()` centralizam fluxos comuns.

- **Abstração por ações de domínio**
	Arquivos como `web/cypress/support/actions/consultancy.actions.js` e `web/cypress/support/actions/github.actions.js` encapsulam regras e interações complexas de tela.

- **Dados externos com fixtures**
	Testes usam `fixtures` (`cep.json`, `consultancy.json`) para separar dados do comportamento e facilitar manutenção.

- **Testes mais independentes com `beforeEach` / `before`**
	Em specs como `consultancy.cy.js`, `github.cy.js` e `cep.cy.js`, o estado inicial é refeito antes de cada cenário. Nos testes de API, `before`/`after` gerenciam a massa de dados diretamente no banco.

- **Login otimizado para acelerar execução**
	O comando `cy.Login()` permite autenticar por UI ou por cookie/localStorage, reduzindo tempo de setup em cenários que não precisam validar a tela de login.

- **Mock de API com `cy.intercept`**
	Em `cep.cy.js`, a consulta de CEP é controlada com interceptação para tornar o teste determinístico e menos dependente de serviço externo.

- **Validações robustas e explícitas**
	Há asserts de visibilidade, conteúdo, atributos e estado (`be.visible`, `have.text`, `have.attr`, `not.exist`, cookies e localStorage), reforçando confiança nos resultados.

- **Cobertura de cenário positivo e negativo**
	Em `login.cy.js` e nos specs de API, há validações de sucesso e falha, melhorando a proteção contra regressões.

- **Técnicas expert com `invoke` e `press`**
	Em `expert.cy.js`, uso de `cy.invoke('val')`, `cy.invoke('attr')`, `cy.invoke('hide'/'show')` e `cy.press('Tab')` para manipulação direta de DOM e simulação de teclado.

- **Geração de massa de dados com `faker` e `lodash`**
	Em `expert.cy.js`, uso de `faker.person.fullName()`, `faker.internet.email()` e `_.times()` para gerar cargas de dados fake em loop, útil para testes de performance e stress.

- **Limpeza de banco via `cy.task`**
	Nos testes de API, `cy.task('deleteUser', email)` executa SQL direto no banco PostgreSQL via `pg-promise` antes e depois de cada suite, garantindo isolamento total dos cenários.

## 📌 Observações

- Garanta que a aplicação web esteja rodando em `http://localhost:3000` antes de rodar os testes de front.
- Garanta que a API esteja rodando em `http://localhost:3333` antes de rodar os testes de API.
- Em caso de falha, consulte as evidências em `web/cypress/screenshots` e `web/cypress/videos`.

## 🙌 Créditos

Projeto base do curso **Ninja do Cypress**.

Este fork destaca a evolução prática dos testes automatizados construída durante os estudos. 💙
