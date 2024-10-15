FROM common_react

WORKDIR /ui

ADD build/ public/

FROM nginx
COPY --from=0 /ui/public/ /usr/share/nginx/html/
COPY deploy/docker/search/default.conf /etc/nginx/conf.d/default.conf

ENV PRODUCTION=1
