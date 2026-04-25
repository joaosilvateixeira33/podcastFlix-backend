# 🎙️ Podcast API

Uma API RESTful moderna para gerenciamento de podcasts, construída com foco em boas práticas, organização de código e escalabilidade. Ideal para aplicações que precisam cadastrar, consultar e gerenciar conteúdos de áudio.

---

## ✨ Destaques

* Estrutura organizada em camadas (Controller, Service, etc.)
* CRUD completo de podcasts
* Uso de boas práticas REST
* Código limpo e fácil de manter
* Pronta para expansão (autenticação, paginação, filtros, etc.)

---

## 🚀 Tecnologias

* **Node.js**
* **Express**
* **JavaScript / TypeScript** (ajuste conforme seu projeto)
* **Arquitetura em camadas**

---

## 📁 Estrutura do Projeto

```bash
src/
├── controllers/
│   └── PodcastController.js
├── routes/
│   └── podcast.routes.js
├── services/
│   └── PodcastService.js
├── models/
│   └── Podcast.js
└── app.js
```

---

## 📌 Endpoints da API

### 🔍 Listar todos os podcasts

```http
GET /podcasts
```

#### ✅ Resposta

```json
[
  {
    "id": 1,
    "title": "Flow Podcast",
    "description": "Conversas descontraídas"
  }
]
```

---

### ➕ Criar um novo podcast

```http
POST /podcasts
```

#### 📥 Body

```json
{
  "title": "Flow Podcast",
  "description": "Conversas descontraídas"
}
```

#### ✅ Resposta

```json
{
  "id": 1,
  "title": "Flow Podcast",
  "description": "Conversas descontraídas"
}
```

---

### 🔎 Buscar podcast por ID

```http
GET /podcasts/:id
```

#### 📌 Parâmetros

* `id` (number)

#### ✅ Resposta

```json
{
  "id": 1,
  "title": "Flow Podcast",
  "description": "Conversas descontraídas"
}
```

---

### ✏️ Atualizar podcast

```http
PATCH /podcasts/:id
```

#### 📥 Body

```json
{
  "title": "Novo título",
  "description": "Nova descrição"
}
```

#### ✅ Resposta

```json
{
  "id": 1,
  "title": "Novo título",
  "description": "Nova descrição"
}
```

---

### ❌ Deletar podcast

```http
DELETE /podcasts/:id
```

#### ✅ Resposta

```json
{
  "message": "Podcast removido com sucesso"
}
```

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/podcast-api.git
```

### 2. Acesse a pasta

```bash
cd podcast-api
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

---

## 🧪 Testando a API

Você pode utilizar ferramentas como:

* Insomnia
* Postman
* Thunder Client (VSCode)

---

## 🛡️ Boas práticas aplicadas

* Separação de responsabilidades (SRP)
* Padrão RESTful
* Código legível e padronizado
* Facilidade de manutenção e escala

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

João Marcos Silva Teixeira

---

## 💡 Observação final

Este projeto foi desenvolvido com foco em demonstrar domínio de construção de APIs REST, organização de código e preparação para cenários reais de backend.

---
