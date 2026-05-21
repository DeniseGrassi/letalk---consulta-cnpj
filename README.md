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
  "cnpj": "000.000.000-00"
}

A resposta completa inclui dados como CNPJ, porte, data de abertura, CNAE e estimativa de funcionários.

### Decisões de projeto

O projeto foi dividido em front-end e back-end para atender ao requisito de que o front consuma uma API criada para a solução. O front-end não consulta diretamente a BrasilAPI; ele envia os dados para o back-end, que fica responsável pela validação, consulta externa, tratamento dos dados e retorno em um formato mais simples para a interface.

Optei por não exibir todos os campos retornados pela BrasilAPI. A ideia foi selecionar informações mais úteis para uma leitura comercial inicial, como situação cadastral, CNAE, segmento, porte, localização e atividade principal.

Também adicionei uma análise simples de prioridade do lead. Essa análise considera se a empresa está ativa e se o segmento tem potencial de uso de atendimento, relacionamento ou automação. A proposta não é criar um score definitivo, mas sim uma primeira camada de apoio para priorização comercial.

Na interface, preferi usar textos simples, como “Consulta de empresas por CNPJ”, para facilitar o entendimento do usuário. O conceito de enriquecimento de lead foi aplicado no back-end e na organização dos dados, mas com uma comunicação mais direta na tela.

### Sobre a estimativa de funcionários:
A BrasilAPI não retorna a quantidade real de funcionários da empresa. Por isso, a aplicação faz uma estimativa simples com base no porte retornado pela API.

Quando o porte não permite uma inferência segura, o sistema retorna “Não informado”.

### Tratamento de erros
A aplicação trata os seguintes cenários: campos obrigatórios não preenchidos; CNPJ inválido; falha na consulta à API externa e erro inesperado no servidor.

### Uso de IA
Utilizei IA como apoio pontual durante o desenvolvimento, principalmente para organizar ideias, revisar estrutura do projeto, validar decisões técnicas e melhorar a documentação. A implementação, os testes locais, os ajustes de código e as decisões finais foram feitos por mim, considerando o escopo do desafio proposto.

### Tempo gasto
O tempo total gasto na execução do desafio foi de aproximadamente 24 horas, considerando planejamento, desenvolvimento do back-end, criação da interface, integração entre front-end e API, testes locais, deploy e documentação.


### Se eu tivesse mais tempo

Se tivesse mais tempo para evoluir o projeto, eu adicionaria:

Autenticação de usuários;
Histórico de consultas realizadas;
Cache das consultas para evitar chamadas repetidas à API externa;
Testes automatizados no front-end e no back-end;
Melhorias no tratamento visual de erros;
Paginação para um possível histórico de leads consultados;
Integração com outras fontes externas para complementar os dados da empresa;
Uma regra de priorização comercial mais completa, considerando segmento, porte, localização e outros critérios;

Essas melhorias não foram implementadas nesta versão para manter o foco nos requisitos principais do desafio e entregar uma solução funcional, simples e objetiva.

### Build do projeto
#### Back-end
cd backend
npm run build
npm start

#### Front-end
cd frontend
npm run build
npm run preview

### Observação sobre deploy
O back-end foi publicado no Render e o front-end foi publicado na Vercel. Em produção, o front-end consome a API do Render por meio da variável de ambiente `VITE_API_URL`.


