FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3001
ENV MONGO_URI=mongodb://mongodb:27017/resume_database
EXPOSE $PORT
CMD ["npm", "start"]