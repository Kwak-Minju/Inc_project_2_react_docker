## .env 파일을 만들고 소스코드를 빌드하는 컨테이너
FROM node:18-alpine AS builder

RUN     mkdir /myapp
WORKDIR /myapp

COPY package.json .

RUN     npm install
COPY    . .
# ARG     FLASK_SERVER_IP               
# ARG     FLASK_SERVER_PORT             
# RUN     echo REACT_APP_REST_API_SERVER_IP=$FLASK_SERVER_IP > .env 
# RUN     echo REACT_APP_REST_API_SERVER_PORT=$FLASK_SERVER_PORT > .env 

# ENV REACT_APP_REST_API_SERVER_IP=flasktest
# ENV REACT_APP_REST_API_SERVER_PORT=61227
RUN     npm run build

## 빌드 결과를 웹 루트 디렉터리로 복사하고, nginx 기본 설정을 변경 후 nginx를 실행하는 컨테이너
FROM    nginx   AS runtime
COPY    --from=builder /myapp/build/ /usr/share/nginx/html/
RUN     rm /etc/nginx/conf.d/default.conf
COPY    nginx.conf /etc/nginx/conf.d                    
CMD     ["nginx", "-g", "daemon off;"]