# Environment

FROM node:18-alpine as build

WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

COPY . ./

RUN npm run build

# Production environment

FROM nginx:stable-alpine
COPY --from=build /frontend/dist /usr/share/nginx/html
ADD server.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]