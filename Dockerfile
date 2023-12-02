FROM node AS base


FROM base AS development
WORKDIR /app
COPY package.json .
RUN npm install
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi
COPY . .
EXPOSE 4000
CMD [ "npm" , "run", "start-dev" ]


FROM base AS production
WORKDIR /app
COPY package.json .
RUN npm install --only=production
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi
COPY . .
EXPOSE 4000
CMD [ "npm" , "start" ]