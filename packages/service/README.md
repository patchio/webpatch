# webpatch

## What
request <-> CDN -> Nginx -> Webpatch-Service -> response

## Docker

### build
```bash
docker build \
  --tag=webpatch \
  --build-arg NODE_VERSION=12.2.0-alpine \
  --build-arg YARN_VERSION=1.16.0 \
  --compress \
  .
```

### run
```bash
docker run \
  --name webpatch
  -p 3000:80
  webpatch
```