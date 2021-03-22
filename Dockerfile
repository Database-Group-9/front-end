FROM node:14

RUN mkdir -p /usr/src/frontend/src

WORKDIR /usr/src/frontend/src

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@4.0.2 -g --silent

#RUN npm ci --only=production

#Bundle app source
COPY . ./

EXPOSE 3000

CMD [ "npm", "start"]