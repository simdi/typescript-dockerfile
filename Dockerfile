FROM node:16 as development

# RUN apt-get update && apt-get upgrade -y && \
#   apt-get install -y nodejs \
#   npm
# Arguments 
RUN echo APP_DIR
ARG NODE_ENV APP_DIR

# Create app directory
RUN mkdir -p $APP_DIR
# Set working directory
WORKDIR $APP_DIR
# Copy all the files from our system to the container
COPY "package*.json" .
# Install the package.json file.
RUN npm install
# Copy all other files into the image
COPY . .
# Build app
RUN npm run build

# Define the port the container should expose
EXPOSE 4000
# Run the build process
CMD npm start

