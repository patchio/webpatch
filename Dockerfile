ARG NODE_VERSION=12.2.0-alpine

FROM "node:${NODE_VERSION}"

LABEL maintainer="L-Chris@563303226@qq.com"

ARG YARN_VERSION=1.16.0

RUN echo 'Asia/Shanghai' > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

RUN echo "http://mirrors.aliyun.com/alpine/v3.9/main/" > /etc/apk/repositories

RUN set -x \
  && apk add --no-cache libstdc++ \
  && apk add --no-cache --virtual .build-deps \
    binutils-gold \
    curl \
    g++ \
    gcc \
    gnupg \
    linux-headers \
    make \
    python

RUN for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
    gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
  done \
  && curl -fsSLO --compressed "https://npm.taobao.org/mirrors/yarn/v$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && curl -fsSLO --compressed "https://npm.taobao.org/mirrors/yarn/v$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
  && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  && mkdir -p /opt \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarn ${BINARY_PREFIX}/yarn \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarnpkg ${BINARY_PREFIX}/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz

RUN npm config set registry https://registry.npm.taobao.org \
  && yarn config set registry https://registry.npm.taobao.org

RUN yarn global add pm2

RUN apk del .build-deps \
  && rm -rf \
    /tmp/* \
    /var/cache/apk/* \
    /usr/share/man

COPY "src","package.json","yarn.lock" ~/webpatch

RUN cd ~/webpatch && \
    yarn

CMD [ "yarn", "prod" ]