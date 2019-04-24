# BlockedUsers service

> Uma API (REST) para gerenciar usuários bloqueados - *blacklist*.

## Introdução

As instruções abaixo tem o propósito de disponibilizar uma cópia rodando na máquina local para fins de desenvolvimento ou testes.

O resultado será um serviço disponível na [máquina local](http://localhost:8080/blockedUsers) e contará com uma [documentação viva](http://localhost:8080/docs) e uma outra rota para exibir [informações sobre a saúde](http://localhost:8080/healthCheck) do mesmo.

No final do arquivo segue uma pequena explicação sobre a [estrutura de pastas](#estrutura-de-pastas) atual.

## Requisitos

Este projeto usa [node](https://nodejs.org/en/download/) na versão 8.16.0 ou mais recente, além de uma das opções abaixo.

- [Docker](https://docs.docker.com/install/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)


## Instalação e execução

Segue um passo a passo mostrando como colocar o ambiente de desenvolvimento rodando.

### Copia o repositório.

```bash
git clone git@github.com:brunocamargos/blocked-users-service.git
```

### Instala as depêndencias.

```bash
npm i
```

### Cria um arquivo `.env` contendo as variáveis de ambiente.

```bash
echo "NODE_ENV=development /
DB_URL=mongodb://localhost:27017/blockedUsersDB /
LOGGER_LEVEL=info" > .env
```
Lembrando que a porta do mongo pode necessitar alteração.

Caso tenha optado pelo mongo servido pelo docker-compose desse projeto, utilize a porta `27117`;

Abaixo segue as possíveis variáveis de ambiente com exemplos ou opções de valores.

```bash
NODE_ENV=(test, development, production)
DB_URL=mongodb://localhost:27017/blockedUsersDB
PORT=8080
NAME=blocked-users-service
LOGGER_LEVEL=(fatal, error, warn, info, debug, trace)
```

Está pronto para rodar! 
Vamos em frente.

## Disponibilizando a API

Via docker
```bash
npm run docker
```

**Se não possui o banco instalado na máquina local, lembre de subi-lo via comando acima antes de rodar os scripts daqui em diante.**

Local sem container. 
```bash
npm start
```

Ou em ambiente de desenvolvimento
```bash
npm run dev
```

Pronto! Acesse o [*playground*](http://localhost:8080/docs) e comece a testar!

## Executando os Testes

```bash
npm test
```

Somente os testes de unidade
```bash
npm run test:unit
```

Somente os testes de integração
```bash
npm run test:integration
```

## Outros scripts auxiliares

Há também alguns outros scripts para análise de código, dependências e vulnerabilidades que junto com os testes casam muito bem para CI/CD e *precommit*.

### Lint

```bash
npm run lint
```

### Varrendo por dependências não utilizadas e vulnerabilidades

```bash
npm run checkdep
```

O *precommit* é feito através do *git hooks* pelo pacote [husky](https://github.com/typicode/husky).

Assim sendo, sempre que for feito um *commit* será executado os seguintes scripts:
```bash
npm lint && npm checkdep && npm test
```

Uma forma de manter a base de código limpa e consistente.

## Estrutura de pastas 

```bash
├── src (Código fonte de fato)
│   ├── commons (Pacote com utilidades de infra, deveria ser apartado)
│   │   ├── db
│   │   ├── logger
│   │   ├── middlewares (Middlewares para lidar com errors e validações)
│   ├── config (Configurações globais (logger, dbUrl, etc))
│   ├── controllers (Responsável por tratar as requisições e chamar os objetos de domínio)
│   ├── domain (Core da aplicação)
│   ├── repository (Responsável por lidar com chamadas ao banco)
└── test 
    ├── doubles (Fakes, spys, stubs e mocks)
    ├── integration (Testes de integração)
    └── unit (Testes de unidade)
```
