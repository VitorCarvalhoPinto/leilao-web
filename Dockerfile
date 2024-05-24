# Usar a imagem oficial do Node.js como a base
FROM node:20.11.0

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Compilar o projeto para produção
RUN npm run build

# Instalar o servidor HTTP para servir os arquivos estáticos
RUN npm install -g serve

# Expor a porta que o container usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]