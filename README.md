
# Boilerplate Flask

**Em construção**

Esse é um boilerplate padrão para desenvolvimento flask rodando local ou em docker


## Stack utilizada

**Front-end:** Mdboostrap, jquery, ionsicon
**Back-end:** Flask, MysqlAlchemy, FlaskRest_full, marshmallow-sqlalchemy


## Instalação

### Primeiros passos

No diretório principal edite o arquivo  .env.exemple colocando
os dados de acesso do seu banco de dados e envio de e-mail salve como novo arquivo com o nome  .env



### Instalação Local
É necessário instalar o python 3.8.5

Caso queira utilizar o pyenv siga os passos abaixo:
https://dev.to/womakerscode/instalando-o-python-com-o-pyenv-2dc7

Apos, instalação do python 3.8.5

Acesse o diretório portal

E rode os comandos abaixo

```bash
  sudo apt-get update -y  && \
  sudo apt-get upgrade -y && \
  sudo apt-get install python3-flask-sqlalchemy -y &&\
  pip3 install --upgrade pip && \
  pip3 install --no-cache-dir -r requirements.txt
```
Para executar acesse o diretório portal
e execute 

```bash
  python3 wsgi.py
```

### Instalação Docker

É necessário instalar o Docker

No diretório principal rode o comando

```bash
  sudo apt-get update -y  && \
  sudo apt-get upgrade -y && \
  sudo apt-get docker.io docker-compose -y
```
Após instalar o docker rode os comandos no diretório principal
```bash
   docker-compose up -d
```

### Testando

Para saber se deu certo acesse no navegador
Web http://localhost:8000/
API http://localhost:8000/api/teste
    
## Deploy

Para fazer o deploy desse projeto em uma VM com Nginx + SSL siga os passos abaixo

Para instalar o servidor Nginx como proxy reverso automático acesse o repositório abaixo e siga os passos

https://github.com/evertramos/nginx-proxy-automation

Após o servidor Nginx instalado altere no arquivo docker-compose.yml

```bash
   - VIRTUAL_HOST=site.com.br
   - LETSENCRYPT_HOST=site.com.br
```
Altere no arquivo wsgi.py no diretório app o parametro debug de True para False

```bash
app.run(debug=False, host='0.0.0.0', port=8000)
```

Salve o arquivo e rode o docker na vm 

```bash
   docker-compose up -d
```

com os padrões alterados o proxy vai linkar o servidor do flask com o gunicorn automaticamente no nginx