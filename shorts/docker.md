---
layout: page
title: Docker справочник
---

Полезные ссылки
- [Docker документация](https://docs.docker.com/)
- [Курс для Начинающих](https://youtu.be/_uZQtRyF6Eg) - трёх часовое видео, от базы, до составления `Dockerfile` и использование `docker-compose.yml`

Компоненты
- `Client` (клиент) - 
- `Daemon` (служба) - 
- `Host` (хост) - 
- `Image` (образ) - readonly образ приложения
- `Container` (контейнер) - работающее приложение на основе образа
- `Volume` (том) - файл или каталог, который хранится вне контейнера и подключается к нему	
- `Dockerfile` - файл описания образа
- Cлой - выполнение каждой команды в Dockerfile
- `docker-compose.yml` - файл декларативного описания compose, в отличие от императивного подхода, когда выполняешь действия команда за командой
- `Repository` (репозиторий) - хранилище образов, например [Hub](https://hub.docker.com)
- `Registry` (реестр)


## Общие команды

Установка Docker на Linux `curl -sSL https://get.docker.com/ | sh`, `sudo apt install docker`


## Основные команды

Формат вызова команды `docker <command>`
- `build` - сборка образа по файлу `Dockerfile`  
Пример: `docker build . -t some-app`
- `images` - список доступных образов в репозитории  
-q - вывести список идентификаторов образов  
Пример: `docker rmi $(docker images -q)` - удаление всех образов
- `search <query>` - поиск в Docker Hub
- `pull <image name>` - загрузить образ из репозитория
- `push <image name>` - загрузить образ в репозиторий
- `run` - запуск контейнера, с параметром  
--rm - удаляет контейнер после завершения работы  
-it - интерактивно можно видеть весь вывод на консоль  
-p - переадресация портов в порядке на какой-откуда, пример `8080:80`, где `80` порт является внутренним портом контейнера  
-d - запускает в фоновом режиме контейнер с возвращением в командную строку  
--entrypoint bash - при запуске попадаем в командную строку контейнера  
-u root - указать имя пользователя, в данном случае зайти под рутом и можно будет устанавливать приложения  
-v - подключение тома в порядке на какой-откуда, пример `-v "/home/foo/app:/data"` или `-v ${PWD}:/data`, где `${PWD}` - это переменная, указывающая на текущую директорию, а папка `data` является папкой внутри контейнера  
--network host - запуск контейнера локально на машине, не изолированно  
--name - имя образа, указывается самым последним, если не указать, то генерируется автоматически  
- `ps` - список запущенных контейнеров  
-a - список с уже запускавшимися контейнерами
- `-e` - указание переменной окружения  
Пример: `-e TZ=Europe/Moscow`
- `exec` - выполнение команды внутри контейнера  
-it - переход на командную строку внутри контейнера, например, `exec -it <id> /bin/bash`, а для выхода из bash используется `exit`
- `start/stop <container name>` - выполнение/остановка ранее запущенного контейнера
- `rmi <image id>` - удаление образа
- `rm <container id or name>` - удаление контейнера по идентификатору или имени
- `history` - история образа
- `logs <name>` - логи контейнера, то что пишется в консоль
- `inspect <container name>` - получение информации по контейнеру: ip, порты

Полезные команды
- `docker run --rm -it -p 8080:80 lps-app` - запуск контейнера с приложением, которое будет доступно на порту 8080 и контейнер будет удалён после остановки приложения по `Ctrl+C`
- `docker run -v ${PWD}:/usr/share/nginx/html nginx` - запуск контейнера с nginx и указание внешней папки с index.html
- `docker container prune` - очищает список контейнеров, которые не запущены
- `docker rm $(docker ps -qa)` - передача id всех контейнеров для удаления
- `docker build . -t some-app --build-arg <varname>=<value>` - построить образ с указанием переменных
- `docker exec -it <id> /bin/bash` или `exec -it <id> sh` - запуск интерактивно в оболочке, чтобы работать внутри контейнера
- `docker run -it --rm --entrypoint bash dotnet/sdk:6.0` - запуск контейнера по определённому образу и сразу перейти к командной строке


## Docker volume

- `docker volume ls`
- `docker volume create web` - создание тома
- `docker run ... -v web:/usr/src/app web-hello` - указание тома при методе run



## Dockerfile - сборка образа

Файл Dockerfile служит для описания шагов для формирования образа, который получается после билда файла.

https://docs.docker.com/engine/reference/builder/

При выполнении каждой команды создаётся новый слой, все эти слои могут выполняться параллельно.

Команды `Dockerfile`
- `EXPOSE` - порт, который будет открыт в контейнере
- `ENV` - указание переменной окружения  
Пример: `ENV TZ Europe/Moscow`
- `FROM` - используемый образ, `latest` - последняя версия, `alpine` - минимальная по объёму версия  
Пример: `FROM python:alpine`
- `RUN` - запуск по командной строке  
Примеры: `mkdir -p /usr/src/app/`, `dotnet build "App.csproj" -c Release -o /app/build`, `RUN pip install mongo`
- `WORKDIR` - устанавливает рабочий каталог, в котором будут выполняться команды для инструкций `RUN`, `CMD`, `ENTRYPOINT`, `COPY` и `ADD`, при необходимости создаётся. `WORKDIR /dir` - относительно корня, а `WORKDIR folder` - относительно рабочего каталога
- `COPY` - копирование файлов
Пример: `COPY . .` - из текущей папки выполнения DOckerfile в рабочую папку контейнера
- `CMD` - что нужно сделать, когда контейнер будет запущен, запускается через оболочку shell  
Пример: `CMD ["python, "app.py"]`
- `ENTRYPOINT` - выполняется без shell оболочки  
Пример: `ENTRYPOINT ["python, "app.py"]`
- `ARG` - указывает переменную, который пользователь может указывать во время `docker build --build-arg user=newuser`, таких инструкций может быть любое количество. Не рекомендуется передавать секреты, так как выполняемые команды сохраняются в `docker history`. Для указания значения по-умолчанию, вместо `ARG user`, можно указать `ARG user=someusert`. Использовать переменные можно через `$user`.
- `USER` - устанавливает пользователя или группу для инструкций `RUN`, `ENTRYPOINT` и `CMD`.

```
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-content

ARG DOCKER_SERVICE_NAME

COPY Source/$DOCKER_SERVICE_NAME /app-src
WORKDIR /app-src

RUN dotnet restore --source "https://some-custom-source/repository/nuget/index.json"
RUN dotnet publish -c Release -o /app-publish

FROM ubuntu:18.04

ARG DOCKER_VAULT_TOKEN
ARG DOCKER_SERVICE_PORT

EXPOSE $DOCKER_SERVICE_PORT

WORKDIR /app

COPY --chmod=777 --from=build-content /app-publish .
COPY Docker/temp_appsettings.json appsettings.json

RUN echo "$DOCKER_VAULT_TOKEN" > ~/.vault-token
```

## Compose

- Все необходимые контейнеры запускаются одной командой
- Автоматическое создание контейнеров
- Создание изолированной сети для взаимодействия контейнеров
- Взаимодействие между контейнерами может быть через имена сервисов

Команды
- `docker-compose up` - запустить контейнеры  
-d - выполнение в фоновом режиме, по-умолчанию выполняется в интерактивном режиме
--build - заново создать образы, в случае изменения исходников приложения нужно исапользовать каждый раз
- `docker-compose down` - остановить контейнеры и удалить

``` yaml
version: '3.8'

volumes:
  mongodb_volume:

services:
  app:
    build: ./app
	context: ../
	working_dir: /app
	dockerfile: ./Docker/dockerfile
	args:
	  DOCKER_VAULT_TOKEN: ${DOCKER_VAULT_TOKEN}
      DOCKER_SERVICE_NAME: ${DOCKER_SERVICE_NAME}
	ports:
	  - "8090:7073"
	hostname: ${DOCKER_SERVICE_NAME}Docker-${USERNAME}
	command: app.dll
	restart: always
	depends_on:
      - mongo
  mongo:
    image: mongo
	volumes:
	  - mongodb_volume:/data/db
	restart: always
```

Здесь
- `app`, `mongo` - имена сервисов, по ним можно обращаться, например, указывать вместо ip в строке подключения
- Сначала будет создан образ для `app` и потом будет запущен контейнер для него, а потом будет запущен контейнер для `mongo`
- Оба контейнера будут находиться в единой сети и к ним можно обращаться по именам сервисов `app` и `mongo`, например, в строке подключения
- В некоторых случаях важен порядок выполнения сервисов, нужно учитывать создающийся кэш
- `build` - путь пишется относительно `yml` файла, либо указывается абсолютный, до `Dockerfile`
- `context` - 
- `working_dir` - рабочая директория для сервиса
- `volumes` - подключение внешних папок 
- `restart` - 
- `command` - выполнение команды в дополнение к `ENTRYPOINT`
- `depends_on` - 

Команды `docker-compose`
- `exec <service name> <command>` - выполнение команды, например, `docker-compose exec bash`


## Разное

### Сброс пароля под wsl для Windows

- Необходимо запустить PowerShell из под администратора
- Выполнить `wsl -u root` для входа под рутом
- Выполнить `passwd <user login>` - для ввода нового пароля

### Перезапуск WSL

Чтобы перезапустить WSL, необходимо выполнить команду PowerShell, запущенной под администратором `Restart-Service LxssManager`.

### Где хранятся файлы образов на диске?

### Передача параметров в образ/в контейнер

