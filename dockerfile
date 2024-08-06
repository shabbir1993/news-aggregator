# docker build .
# docker images
# Copy IMAGE ID
# docker run -p 3000:3000 <IMAGE_ID>


FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]