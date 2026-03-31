# RECAP - Front-end
O **RECAP** é um aplicativo mobile inspirado no Letterboxd que oferece uma experiência inteligente e personalizada para descobrir, avaliar e organizar filmes.
A aplicação consome uma arquitetura backend baseada em microsserviços e entrega uma interface moderna e intuitiva para o usuário final.

---

# ✨ Funcionalidades

🎬 **Catálogo de Filmes**  
Explore filmes populares e busque títulos com dados integrados da API do TMDB.

⭐ **Gerenciamento de Lista**  
- Marcar como assistido  
- Favoritar filmes  
- Avaliar com notas e curtidas  

🤖 **Recomendações Inteligentes**  
Receba sugestões personalizadas com base no seu histórico, utilizando IA.

🔐 **Autenticação**  
- Login e cadastro  
- Autenticação via JWT  
- Recuperação de senha  

👥 **Social**  
- Seguir outros usuários  
- Visualizar atividades  
- Interagir com recomendações  

🔔 **Notificações**  
Receba notificações em tempo real quando:
- Alguém te seguir  
- Houver interações relevantes  

---

# 🏗️ Arquitetura do App
O app mobile atua como cliente consumindo uma API Gateway.

### Tecnologias utilizadas:
- React Native + Expo
- Consumo de API REST
- Gerenciamento de estado (React Hooks e Context API)
- Integração com backend via HTTP
- Autenticação com JWT

---

# 🔌 Integração com Backend

A aplicação se comunica exclusivamente com o **API Gateway**.

📡 **Base URL**
- http://localhost:3000/

⚠️ Para dispositivo físico, substitua por:
- http://SEU_IP:3000

---

# 🧪 Principais endpoints utilizados

🔑 **Login**
- POST: /auth/login

🎬 **Recomendações**
- POST: /recommendations/me

⭐ **Avaliar recomendação**
- PATCH: /recommendations/{id}/rate

👤 **Seguir usuário**
- POST: /social/follow/{userId}

--- 

# 📦 Estrutura do Projeto
O projeto segue o padrão **MVVM (Model-View-ViewModel)**, separando responsabilidades entre interface, lógica e dados.

```
/app
├── (auth)/            # Rotas públicas (login, cadastro, recuperação de senha)
├── (protected)/       # Rotas protegidas (usuário autenticado)

/src
├── components/        # Componentes reutilizáveis de UI
├── context/           # Gerenciamento de estado global (Context API)
├── models/            # Tipagens e modelos de dados
├── provider/          # Providers globais da aplicação
├── services/          # Comunicação com API (HTTP / Axios)
├── viewmodels/        # Lógica de negócio (MVVM)
├── views/             # Telas da aplicação
```

---

# ▶️ Como rodar o projeto

## 📌 Pré-requisitos
- Node.js instalado
- npm ou yarn
- Aplicativo **Expo Go** instalado no celular

---

## 🚀 Instalação
Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
```

Acesse a pasta do projeto:

```bash
cd recap
```

Instale as dependências:

```bash
npm install
```

ou

```bash
yarn install
```

---

## ▶️ Executando o projeto
Inicie o servidor do Expo:

```bash
npx expo start
```

---

## 📱 Executando no dispositivo

### ▶️ Celular (Expo Go)

1. Conecte o celular e o computador na **mesma rede Wi-Fi**
2. Abra o app **Expo Go**
3. Escaneie o QR Code exibido no terminal ou navegador

---

### ▶️ Emulador Android

```bash
npx expo start --android
```

---

### ▶️ Emulador iOS (Mac)

```bash
npx expo start --ios
```

---

## ⚠️ Observações importantes

- O backend deve estar rodando localmente (Docker)
- Para celular físico, utilize o IP da máquina (ex: `http://192.168.0.10:3000`)
- Certifique-se de que a porta `3000` está acessível na rede