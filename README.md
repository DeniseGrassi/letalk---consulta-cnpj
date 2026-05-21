# Consulta de Empresas por CNPJ

Aplicação desenvolvida para o teste técnico da Letalk. O objetivo é permitir a consulta de uma empresa a partir do CNPJ informado e apresentar os dados de forma simples, organizada e útil para análise comercial.

A aplicação recebe dados básicos de um contato, consulta uma API própria criada no back-end e retorna informações da empresa vinculada ao CNPJ, como razão social, nome fantasia, situação cadastral, CNAE, segmento, localização, porte e uma análise simples de prioridade do lead.

## Links do projeto

- Front-end: https://letalk-consulta-cnpj.vercel.app/
- Back-end/API: https://letalk-consulta-cnpj.onrender.com/
- Repositório: https://github.com/DeniseGrassi/letalk---consulta-cnpj

## Tecnologias utilizadas

### Front-end

- React
- TypeScript
- Vite
- CSS

### Back-end

- Node.js
- Express
- TypeScript
- Axios
- Dotenv
- CORS

### API externa

- BrasilAPI — Consulta de CNPJ

## Funcionalidades

- Formulário com nome, e-mail, telefone e CNPJ
- Validação de CNPJ
- Consulta de dados cadastrais da empresa
- Tratamento de erro para CNPJ inválido
- Tratamento de erro para falha na API externa
- Organização visual dos dados retornados
- Classificação simples de segmento da empresa
- Estimativa de faixa de funcionários com base no porte
- Análise simples de prioridade comercial do lead

## Estrutura do projeto

```txt
letalk/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/DeniseGrassi/letalk---consulta-cnpj.git
cd letalk---consulta-cnpj
```

### 2. Configure o back-end

Acesse a pasta do back-end:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` dentro da pasta `backend`, com base no arquivo `.env.example`:

```env
PORT=3333
BRASIL_API_URL=https://brasilapi.com.br/api/cnpj/v1
```

Rode o back-end:

```bash
npm run dev
```

O back-end ficará disponível em:

```txt
http://localhost:3333
```

### 3. Configure o front-end

Em outro terminal, acesse a pasta do front-end:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` dentro da pasta `frontend`, com base no arquivo `.env.example`:

```env
VITE_API_URL=http://localhost:3333
```

Rode o front-end:

```bash
npm run dev
```

O front-end ficará disponível em:

```txt
http://localhost:5173
```

## Variáveis de ambiente

### Back-end

| Variável | Descrição |
|---|---|
| `PORT` | Porta utilizada para rodar a API localmente |
| `BRASIL_API_URL` | URL base da BrasilAPI para consulta de CNPJ |

### Front-end

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL da API consumida pelo front-end |

Em ambiente local, o valor utilizado no front-end é:

```env
VITE_API_URL=http://localhost:3333
```

Em produção, o front-end utiliza a URL da API publicada no Render.

## Endpoints da API

O endpoint principal consumido pelo front-end é `POST /api/leads/enrich`. Ele recebe os dados do contato e o CNPJ, consulta a API externa, trata as informações e retorna os dados organizados para exibição na interface.

### Health check

```http
GET /api/health
```

Exemplo de resposta:

```json
{
  "status": "ok",
  "message": "API is running"
}
```

### Consultar empresa por CNPJ

```http
POST /api/leads/enrich
```

Exemplo de body:

```json
{
  "name": "Nome completo",
  "email": "contato@email.com",
  "phone": "11999999999",
  "cnpj": "00.000.000/0001-91"
}
```

Exemplo simplificado de resposta:

```json
{
  "lead": {
    "name": "Nome completo",
    "email": "contato@email.com",
    "phone": "11999999999",
    "cnpj": "00000000000191"
  },
  "company": {
    "corporateName": "BANCO DO BRASIL SA",
    "tradeName": "DIRECAO GERAL",
    "status": "ATIVA",
    "mainActivity": "Bancos múltiplos, com carteira comercial",
    "segment": "Financeiro",
    "city": "BRASILIA",
    "state": "DF"
  },
  "analysis": {
    "priority": "Alta",
    "summary": "Empresa ativa no segmento Financeiro. Pode ser analisada com prioridade alta."
  }
}
```

A resposta completa também inclui dados como CNPJ, porte, data de abertura, CNAE, estimativa de funcionários e motivos da classificação de prioridade.

## Decisões de projeto

O projeto foi dividido em front-end e back-end para atender ao requisito de que o front consuma uma API criada para a solução. O front-end não consulta diretamente a BrasilAPI; ele envia os dados para o back-end, que fica responsável pela validação, consulta externa, tratamento dos dados e retorno em um formato mais simples para a interface.

Optei por não exibir todos os campos retornados pela BrasilAPI. A ideia foi selecionar informações mais úteis para uma leitura comercial inicial, como situação cadastral, CNAE, segmento, porte, localização e atividade principal.

Também adicionei uma análise simples de prioridade do lead. Essa análise considera se a empresa está ativa e se o segmento tem potencial de uso de atendimento, relacionamento ou automação. A ideia foi criar uma análise inicial, simples, que ajude a entender melhor o lead sem tentar substituir uma avaliação comercial mais completa.

Na interface, preferi usar textos simples, como “Consulta de empresas por CNPJ”, para facilitar o entendimento do usuário. O conceito de enriquecimento de lead foi aplicado no back-end e na organização dos dados, mas com uma comunicação mais direta na tela.

## Sobre a estimativa de funcionários

A BrasilAPI não retorna a quantidade real de funcionários da empresa. Por isso, a aplicação faz uma estimativa simples com base no porte retornado pela API.

Quando o porte não permite uma inferência segura, o sistema retorna “Não informado”.

## Limitação da versão atual

O campo de cargo do contato não foi implementado nesta versão porque não fazia parte dos campos obrigatórios do formulário e também não é uma informação retornada pela API pública utilizada.

Como evolução, esse dado poderia ser incluído manualmente no formulário ou complementado por outra fonte externa.

## Tratamento de erros

A aplicação trata os seguintes cenários:

- Campos obrigatórios não preenchidos
- CNPJ inválido
- Falha na consulta à API externa
- Erro inesperado no servidor

## Uso de IA

Usei IA como apoio durante o desenvolvimento, principalmente para organizar ideias, revisar a estrutura do projeto e melhorar alguns pontos da documentação. A implementação, os testes locais, os ajustes finais e as decisões do projeto foram feitos por mim.

## Tempo gasto

O tempo total gasto na execução do desafio foi de aproximadamente 24 horas, considerando planejamento, desenvolvimento do back-end, criação da interface, integração entre front-end e API, testes locais, deploy e documentação.

## Se eu tivesse mais tempo

Se tivesse mais tempo para evoluir o projeto, eu adicionaria:

- Autenticação de usuários;
- Histórico de consultas realizadas;
- Cache das consultas para evitar chamadas repetidas à API externa;
- Testes automatizados no front-end e no back-end;
- Melhorias no tratamento visual de erros;
- Paginação para um possível histórico de leads consultados;
- Integração com outras fontes externas para complementar os dados da empresa;
- Uma regra de priorização comercial mais completa, considerando segmento, porte, localização e outros critérios;
- Inclusão do cargo do contato no formulário ou busca desse dado em outra fonte externa;

Preferi não adicionar essas melhorias agora para não fugir do escopo principal do desafio e manter a entrega funcionando bem.

## Build do projeto

### Back-end

```bash
cd backend
npm run build
npm start
```

### Front-end

```bash
cd frontend
npm run build
npm run preview
```

## Observação sobre deploy

O back-end foi publicado no Render e o front-end foi publicado na Vercel. Em produção, o front-end consome a API do Render por meio da variável de ambiente `VITE_API_URL`.

obs: Como o back-end está no plano gratuito do Render, a primeira requisição pode levar alguns segundos caso o serviço esteja inativo.