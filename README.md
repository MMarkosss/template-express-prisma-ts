# 🚀 Template Express + TypeScript + Prisma (PostgreSQL)

Um *boilerplate* robusto e de nível empresarial para iniciar projetos backend em Node.js rapidamente. Configurado com TypeScript estrito, arquitetura em camadas e banco de dados PostgreSQL rodando via Docker, utilizando a versão mais moderna do Prisma ORM (v7+ com injeção de dependência via Adapter).

---

## 🛠️ Tecnologias Utilizadas
* **Node.js** (v24+)
* **TypeScript** (Tipagem estática e segurança)
* **Express** (Framework web)
* **Prisma ORM** (Modelagem de banco de dados e tipagem automática)
* **PostgreSQL** (Banco de dados relacional)
* **Docker & Docker Compose** (Infraestrutura isolada)
* **TSX** (Execução rápida de TypeScript em desenvolvimento)

---

## 🏗️ Arquitetura do Projeto (Em Camadas)

O projeto segue o padrão de **Arquitetura em Camadas** para separar responsabilidades, facilitar a manutenção e permitir testes isolados. O fluxo de uma requisição segue estritamente esta ordem:

1. **Routes (`/routes`):** O "Recepcionista". Mapeia URLs para Controllers. Não acessa o banco de dados e não possui regras de negócio.
2. **Middlewares (`/middlewares`):** O "Segurança". Interceptadores de requisição (ex: Autenticação, Rate Limit).
3. **Schemas (`/schemas`):** O "Inspetor". Validação de dados de entrada (ex: Zod) antes de processar o pedido.
4. **Controllers (`/controllers`):** O "Gerente HTTP". Extrai os dados da requisição (`req.body`), chama a função correspondente no Service e devolve a resposta formatada (`res.status`). Não possui regras de negócio.
5. **Services (`/services`):** O "Coração do Sistema". Contém toda a regra de negócio inteligente e é a única camada autorizada a se comunicar com o banco de dados (Prisma). Não sabe o que é requisição ou resposta HTTP.
6. **Utils (`/utils`):** Ferramentas auxiliares genéricas (formatadores, geradores de hash, etc).

---

## 📖 Como iniciar um novo projeto com este template

Siga os passos abaixo para instanciar um projeto limpo a partir deste template em menos de 2 minutos.

### 1. Clonar e Limpar o Histórico
Baixe o código e apague o histórico de commits para que o seu novo projeto nasça com a ficha limpa.
```bash
git clone URL_DO_SEU_REPOSITORIO_AQUI nome-do-novo-projeto
cd nome-do-novo-projeto
rm -rf .git
git init
```

### 2. Renomear o Projeto
Abra o arquivo `package.json` e altere o campo `"name"` de `"express-template"` para o nome do seu projeto atual.

### 3. Instalar Dependências
```bash
npm install
```

### 4. Configurar o Ambiente
Crie o seu arquivo de segredos copiando a base do template:
```bash
cp .env.example .env
```
*(Ajuste a URL do PostgreSQL no `.env` caso não vá utilizar o Docker local do projeto).*

### 5. Subir a Infraestrutura (Docker)
Ligue o contêiner do PostgreSQL em background:
```bash
sudo docker compose up -d
```

### 6. Configurar o Banco de Dados (Prisma)
Sincronize o banco e force o Prisma a fabricar as tipagens do TypeScript na sua pasta `node_modules`:
```bash
# Cria as tabelas no PostgreSQL com base no schema.prisma
npx prisma migrate dev --name init

# Gera o PrismaClient tipado (Sempre rode isso após baixar dependências)
npx prisma generate
```

### 7. Ligar os Motores
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
A API estará rodando com sucesso na porta 3000.

---

## 🧪 Teste Funcional Rápido

Para garantir que a conexão `Rota -> Controller -> Service -> Banco de Dados -> Docker` está funcionando, crie um arquivo `teste.http` na raiz do projeto (ou use o Postman/Insomnia) e dispare a requisição:

```http
### Criar um registro no banco
POST http://localhost:3000/produtos
Content-Type: application/json

{
  "nome": "Teclado Mecânico",
  "preco": 350.00,
  "categoria": "Periféricos"
}
```
Se o retorno for um Status `201 Created` com os dados no formato JSON, a arquitetura está homologada e pronta para o desenvolvimento!