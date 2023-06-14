FROM node:12.22.9

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 9002
# Exports

CMD ["npm","start"]
