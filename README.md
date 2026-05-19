# Consulta de Empresas por CNPJ

Aplicação desenvolvida para o teste técnico da Letalk. O objetivo é permitir a consulta de uma empresa a partir do CNPJ informado e apresentar os dados de forma simples, organizada e útil para análise comercial.

A aplicação recebe dados básicos de um contato, consulta uma API própria criada no back-end e retorna informações da empresa vinculada ao CNPJ, como razão social, nome fantasia, situação cadastral, CNAE, segmento, localização, porte e uma análise simples de prioridade do lead.

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

### Clone o repositório
git clone https://github.com/DeniseGrassi/letalk---consulta-cnpj.git

cd letalk---consulta-cnpj

###  Configure o back-end
cd backend

npm install

Crie um arquivo .env dentro da pasta backend com base no .env.example:

PORT=3333
BRASIL_API_URL=https://brasilapi.com.br/api/cnpj/v1

### Rode o back-end:
npm run dev

O back-end ficará disponível em:
http://localhost:3333

### Configure o front-end
cd frontend

npm install

Crie um arquivo .env dentro da pasta frontend com base no .env.example:

VITE_API_URL=http://localhost:3333

Rode o front-end:
npm run dev

O front-end ficará disponível em:
http://localhost:5173

## Endpoints da API
Health check

GET /api/health

Exemplo de resposta:

{
  "status": "ok",
  "message": "API is running"
}

## Consultar empresa por CNPJ
POST /api/leads/enrich
Exemplo de body:
{
  "name": "Nome completo",
  "email": "contato@email.com",
  "phone": "00999999999",
  "cnpj": "00000000000191"
}

Exemplo de resposta:
{
  "lead": {
    "name": "Denise Grassi",
    "email": "denise@email.com",
    "phone": "71999999999",
    "cnpj": "00000000000191"
  },
  "company": {
    "cnpj": "00000000000191",
    "corporateName": "BANCO DO BRASIL SA",
    "tradeName": "DIRECAO GERAL",
    "status": "ATIVA",
    "companySize": "DEMAIS",
    "estimatedEmployees": "Não informado",
    "openingDate": "1966-08-01",
    "mainActivity": "Bancos múltiplos, com carteira comercial",
    "cnae": 6422100,
    "segment": "Financeiro",
    "city": "BRASILIA",
    "state": "DF"
  },
  "analysis": {
    "priority": "Alta",
    "reasons": [
      "Empresa ativa",
      "Segmento com alto volume de relacionamento com clientes, mas que pode exigir abordagem mais consultiva"
    ],
    "summary": "Lead vinculado a uma empresa ativa do segmento Financeiro."
  }
}

### Decisões de projeto

O projeto foi dividido em front-end e back-end para atender ao requisito de que o front consuma uma API criada para a solução. O front-end não consulta diretamente a BrasilAPI; ele envia os dados para o back-end, que fica responsável pela validação, consulta externa, tratamento dos dados e retorno em um formato mais simples para a interface.

Optei por não exibir todos os campos retornados pela BrasilAPI. A ideia foi selecionar informações mais úteis para uma leitura comercial inicial, como situação cadastral, CNAE, segmento, porte, localização e atividade principal.

Também adicionei uma análise simples de prioridade do lead. Essa análise considera se a empresa está ativa e se o segmento tem potencial de uso de atendimento, relacionamento ou automação. A proposta não é criar um score definitivo, mas sim uma primeira camada de apoio para priorização comercial.

Na interface, preferi usar textos simples, como “Consulta de empresas por CNPJ”, para facilitar o entendimento do usuário. O conceito de enriquecimento de lead foi aplicado no back-end e na organização dos dados, mas com uma comunicação mais direta na tela.

### Sobre a estimativa de funcionários:
A BrasilAPI não retorna a quantidade real de funcionários da empresa. Por isso, a aplicação faz uma estimativa simples com base no porte retornado pela API.

Quando o porte não permite uma inferência segura, o sistema retorna “Não informado”.

### Tratamento de erros
A aplicação trata os seguintes cenários:

campos obrigatórios não preenchidos;
CNPJ inválido;
falha na consulta à API externa;
erro inesperado no servidor.

### Uso de IA
Utilizei IA como apoio pontual durante o desenvolvimento, principalmente para organizar ideias, revisar estrutura do projeto, validar decisões técnicas e melhorar a documentação. A implementação, os testes locais, os ajustes de código e as decisões finais foram feitos por mim, considerando o escopo do desafio e o nível esperado para uma vaga júnior.

