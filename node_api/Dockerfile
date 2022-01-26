FROM node:14

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV APP_DIR=/app/node_api
WORKDIR $APP_DIR

RUN npm install pm2 -g
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD ["pm2-runtime", "src/index.js"]