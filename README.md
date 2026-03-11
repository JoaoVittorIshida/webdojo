# 🥋 WebDojo - Fork com foco em Automação de Testes

Este repositório é um fork do projeto original do curso **Ninja do Cypress** e reúne as adaptações e evoluções que desenvolvi para praticar e aprofundar **testes automatizados E2E com Cypress**. 🚀

Mais do que "fazer o teste passar", a proposta aqui foi construir uma suíte com organização, reaproveitamento e validações consistentes, simulando um cenário real de qualidade de software. ✅

## ✨ Destaques deste fork

- Cobertura de fluxos importantes da aplicação (login, CEP, formulários, links, iframe, hover, alertas, kanban etc.).
- Execução em **desktop** e **mobile** via scripts dedicados.
- Estrutura separada por responsabilidades (`e2e`, `fixtures`, `support`, `actions`).
- Reuso de comandos e ações para reduzir duplicação e facilitar manutenção.

## 📂 Estrutura de pastas do projeto

```text
webdojo/
|-- docker-compose.yaml
|-- README.md
|-- api/
`-- web/
	|-- cypress.config.js
	|-- package.json
	`-- cypress/
		|-- e2e/
		|   |-- alerts.cy.js
		|   |-- cep.cy.js
		|   |-- consultancy.cy.js
		|   |-- github.cy.js
		|   |-- hover.cy.js
		|   |-- iframe.cy.js
		|   |-- kanban.cy.js
		|   |-- links.cy.js
		|   `-- login.cy.js
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

## 🧪 Estrutura do Cypress (`web/cypress`)

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
- `github.cy.js`
- `hover.cy.js`
- `iframe.cy.js`
- `kanban.cy.js`
- `links.cy.js`
- `login.cy.js`

## 🛠️ Pré-requisitos

- Node.js 22+
- npm ou yarn

## ▶️ Como subir a aplicação (base dos testes)

O Cypress usa `baseUrl: http://localhost:3000` em `web/cypress.config.js`.

```bash
cd web
npm install
npm run dev
```

O script `dev` executa `serve -s dist -p 3000`.

## 🚦 Como rodar os testes

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

## 💡 Boas práticas aplicadas nos testes

Estas práticas já estão implementadas no código deste fork:

- **Comandos customizados para reduzir repetição**
	Em `web/cypress/support/commands.js`, comandos como `cy.start()`, `cy.submitLoginForm()`, `cy.goTo()` e `cy.Login()` centralizam fluxos comuns.

- **Abstração por ações de domínio**
	Arquivos como `web/cypress/support/actions/consultancy.actions.js` e `web/cypress/support/actions/github.actions.js` encapsulam regras e interações complexas de tela.

- **Dados externos com fixtures**
	Testes usam `fixtures` (`cep.json`, `consultancy.json`) para separar dados do comportamento e facilitar manutenção.

- **Testes mais independentes com `beforeEach`**
	Em specs como `consultancy.cy.js`, `github.cy.js` e `cep.cy.js`, o estado inicial é refeito antes de cada cenário.

- **Login otimizado para acelerar execução**
	O comando `cy.Login()` permite autenticar por UI ou por cookie/localStorage, reduzindo tempo de setup em cenários que não precisam validar a tela de login.

- **Mock de API com `cy.intercept`**
	Em `cep.cy.js`, a consulta de CEP é controlada com interceptação para tornar o teste determinístico e menos dependente de serviço externo.

- **Validações robustas e explícitas**
	Há asserts de visibilidade, conteúdo, atributos e estado (`be.visible`, `have.text`, `have.attr`, `not.exist`, cookies e localStorage), reforçando confiança nos resultados.

- **Cobertura de cenário positivo e negativo**
	Em `login.cy.js`, há validações de sucesso e falha de autenticação, melhorando a proteção contra regressões.

## 📌 Observações

- Garanta que a aplicação esteja rodando em `http://localhost:3000` antes de iniciar os testes.
- Em caso de falha, consulte as evidências em `web/cypress/screenshots` e `web/cypress/videos`.

## 🙌 Créditos

Projeto base do curso **Ninja do Cypress**.

Este fork destaca a evolução prática dos testes automatizados construída durante os estudos. 💙
