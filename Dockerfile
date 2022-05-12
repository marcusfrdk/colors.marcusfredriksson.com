FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "run", "start"]