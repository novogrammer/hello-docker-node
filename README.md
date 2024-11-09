# DockerだけでNode.jsを試す

ローカルでNode.jsを使わない場合を試したことがなかった。<br>
package.jsonをクライアントサイドで`npm init`せずに、Dockerコンテナを使って生成する。<br>
bullmqを使って、Redisコンテナと通信するものを想定する。<br>


## 構築メモ
Dockerfileを一旦これにする。Node.jsのみある状態。
```Dockerfile
FROM node:22.11.0-bookworm-slim
WORKDIR /app
```

appフォルダを共有しつつpackage.jsonを生成する

```bash
docker compose run --rm app sh -c 'npm init -y'
docker compose run --rm app sh -c 'npm install bullmq'
```
package.jsonを微調整する

## Dockerイメージ化

app全体ではなく、app/srcフォルダを共有するように変更しておく

npm installはDockerイメージ構築時に実行するようにする
```Dockerfile
FROM node:22.11.0-bookworm-slim
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

CMD npm run start
```

## パッケージの変更について

構築後にパッケージをインストールしたい場合は以下のようにコンテナで実行し取り出す。
```bash
docker compose exec app npm install express
docker compose cp app:/app/package.json ./temp 
docker compose cp app:/app/package-lock.json ./temp 

```

