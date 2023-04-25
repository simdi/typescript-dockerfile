FROM node:10.16.3-alpine as development

# RUN apt-get update && apt-get upgrade -y && \
#   apt-get install -y nodejs \
#   npm
# Arguments 
ARG NODE_ENV

# Create app directory
ENV APP_DIR=/usr/src/api
RUN mkdir -p $APP_DIR
# Set working directory
WORKDIR $APP_DIR
# Copy all the files from our system to the container
COPY "package.json" $APP_DIR
# Install the package.json file.
RUN npm install
# Copy all other files into the image
COPY . .
# Build app
RUN npm run build

# Define the port the container should expose
EXPOSE 4000
# Run the build process
CMD [ "node", "dist/index.js" ]

