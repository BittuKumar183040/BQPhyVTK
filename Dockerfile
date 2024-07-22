# Stage 1 - Build
FROM node:16.13.1-buster as build
LABEL env build_environment
LABEL description="This is the build environment for react based frontend application"
# Pass environment variables during the build
# ARG REACT_APP_BASEURL
# ENV REACT_APP_BASEURL=$REACT_APP_BASEURL
# Print the value of the build argument
# RUN echo "The value of REACT_APP_API_URL is: $REACT_APP_BASEURL"
# set work directory
WORKDIR /usr/frontend/app
COPY . /usr/frontend/app
RUN npm install
RUN npm run build


# Stage 2 - Run
FROM node:16.13.1-buster-slim
LABEL env production
LABEL description="This is the production environment for react based frontend application"
ARG USERNAME=bqphy-dev
ARG USER_UID=1024
ARG USER_GID=$USER_UID
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME
# set work directory
WORKDIR /usr/frontend/app
COPY --from=build /usr/frontend/app/build ./build
# COPY --from=build /usr/frontend/app/entry-point.sh .
RUN yarn global add serve
USER $USERNAME
# CMD ["/bin/bash", "/usr/frontend/app/entry-point.sh"]
CMD ["serve", "-s", "build", "-l", "3000"]
EXPOSE 3000
#building twice --------------




