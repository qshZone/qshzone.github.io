---
layout: post
title: Docker сервер на Raspberry Pi
description: Долгое время у меня копился этот материал, в нём я структурировал знания по администрированию Linux и работе с Docker. Хотел захостить простые задачи на Raspberry Pi. Мой личный опыт в настройке небольшого и функционального сервера.
date-updated: 2022-12-02
---

С февраля 2020 года я активно знакомился с одноплатниками, приложениями Linux, многообразием протоколов, с помощью которых смогу реализовать взаимодействие устройств, а в августе 2022 года плотно занялся Docker. Я уже делал одну попытку настройки связки `Docker + Raspberry Pi`, но тогда не хватило опыта и времени. Теперь кратко опишу этапы настройки такого сервера на `Raspberry Pi 3`.

- Содержание
{:toc}


## Ядро

Установка

- На `DigitalOcean` очень много статей по настройке и администрированию
- Операционная система `Ubuntu` для `Raspberry Pi` устанавливается через [Raspberry Pi Imager](https://www.raspberrypi.com/software/) на SD карту
- Перед установкой SD карты, в файловой системе можно прописать Wi-Fi беспроводной сети и включить SSH.
- Настроку также можно выполнить после запуска системы, тогда придётся подключать клавиатуру и монитор. Команду `sudo raspi-config` поможет произвести те же настройки Wi-Fi и SSH

Также желательно по `sudo raspi-config` перенастроить
- `hostname` по которому можно будет обращаться в сети, например, `server` или `server.local`
- Подключаться стоит через `ssh`, а узнать айпишник можно командой `hostname -I`
- Изменить пароль для рутового пользователя `passwd`
- (?) Установить время бездействия пользователя для логаута
- Настройка входа без пароля по ключу `ssh` осуществляется генерацией ключа на клиенте `ssh-keygen` и выполнением `ssh-copy-id <user>@<host>`. В этом случае публичный ключ пропишется в файл `/~/.ssh/authorized_keys`, но можно и самостоятельно прописать публичный ключ в этот файл.

Если нужно избежать выключение сервера при отключении внешнего питания, для Raspberry Pi есть шилд питания

Далее устанавливается поэтапно нижеперечисленное ПО. Докер служит для контейнеризации, изоляции и оркестрации контейнеров.

### Docker

Для `Ubuntu` нужно воспользоваться [статьёй на Docker](https://docs.docker.com/engine/install/ubuntu/) и уже устаревшей [статьёй на Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-ru).

Кратко
- `sudo apt update`
- `sudo apt-get install ca-certificates curl gnupg lsb-release`
- `sudo mkdir -p /etc/apt/keyrings`
- `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`
- `echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
- `sudo apt update`
- `apt-cache policy docker-ce` - если находится кандидат, то репозиторий установлен корректно
- `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin`

***

Docker устанавливается для `Raspberri Pi OS` командой  
`sudo curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh`

***

Чтобы убедиться, что докер работает, вызываем `docker -v`, будет выведена версия установленного ПО.

Но для скачивания образа нужно будет каждый раз вызывать `sudo`. Для ввода команд без `sudo`, добавляем группу docker и добавляем в неё текущего пользователя.

- `sudo gpasswd -a $USER docker` - добавление текущего пользователя в группу `docker`
- `newgrp docker` - после этого получится подключаться к Docker daemon

Для некоторых контейнеров нужно создавать `volumes`, я создаю в `/opt/service-name` папки `container-name`.

Для каждого контейнера задаётся имя, restart policy, порт, том, образ. Командную строку я привожу для каждого контейнера. А изоляции по сети я не делаю.

### Organizr

Основная точка входа. Инструмент, который часто используется, когда всё сервисы настроены, он будет на `80` порту.

[Сайт](https://organizr.app/)

```
docker run --name organizr -d --restart always \
           -p 80:80 \
           -p 443:443 \
           -v /opt/qshZone/other/organizr:/config \
           organizr/organizr
```

Настройка
- Название БД: `SomeDb`
- Расположение БД: `/config/db`

### Portainer

[Сайт](https://www.portainer.io/)

```
docker run --name portainer -d --restart always \
           -p 8080:9443 \
           -v /opt/qshZone/other/portainer:/data \
           -v /var/run/docker.sock:/var/run/docker.sock \
           portainer/portainer-ce
```

### Watchtower

Автоматизация обновления запущенных контейнеров, скачивает новые образы и перезапускает контейнеры с теми же параметрами.

[Сайт](https://containrrr.dev/watchtower/), [Исходники](https://github.com/containrrr/watchtower)

```
docker run --name watchtower -d --restart always \
           -v /var/run/docker.sock:/var/run/docker.sock \
           containrrr/watchtower
```

### Логирование syslog

Логи syslog принимает, например, от Mikrotik, от Linux.
- `GrayLog` - хороший инструмент, умеет реагировать на приходящие записи. Он работает в связке с `Elastic Search` и `Mongo` - а это уже очень тяжёлая связка для `RPi`.
- `syslog-ng` - тоже неплохой и распространённый инструмент

```
```

## Полезное ПО

```
```

### PiHole

Блокировка рекламы на уровне DNS, что-то типа AdBlock, но не для отдельного устройства, а для всей сети. Если есть роутер Mikrotik, то логичнее всего запускать контейнер прямо на роутере, а не на отдельном сервере.

```
pihole/pihole
```

### Dynamic DNS

Иногда нет возможности получить «белый» статический ip-адрес, динамический ip-адрес можно привязать к доменному имени бесплатно.

- Noip `coppit/no-ip` This is a simple Docker container for running the No-IP2 dynamic DNS update script. It will keep your domain.ddns.net DNS alias up-to-date as your home IP changes.
- [DuckDNS](https://www.duckdns.org/) Получение динамического адреса


## Медиа

- FreshRss - `freshrss/freshrss` [Demo](https://demo.freshrss.org/)

### Torrents

- jackett (indexer для поиска в торрентах)
- bazarr (закачивает сабы для видео)
- sonar (библиотека сериалов, передает в Transmission закачку)
- Мониторинг `radarr`
- Jellyfin
- Deluge
- PhotoPrism


#### Transmission

```
linuxserver/transmission
```

Webui is on port 9091, the settings.json file in /config has extra settings not available in the webui. Stop the container before editing it or any changes won't be saved.

### Samba and DLNA

Обмен файлами и стриминг видео.

### Plex

```
linuxserver/plex
```

### TvHeadend

### NextCloud

Образ `nextcloud`
NextCloud - nextcloud, хранилище файлов, типа dropbox

### IP webcamera

Onvif Service
https://www.instructables.com/How-to-turn-an-USB-camera-with-Raspberry-Pi-into-a/


### shairport-sync AirPlay streaming

https://hub.docker.com/r/kevineye/shairport-sync
shairport-sync https://discourse.osmc.tv/t/airplay-audio-server/20294
Можно установить в OSMC
Стриминг на AirPlay для Windows http://www.tuneblade.com/

### Касты

- https://castbox.fm/
- podcasts.google.com


## NAS

### OpenMediaVault

https://www.openmediavault.org/ ikogan/openmediavault

### FreeNAS


## Разное

### Development

- Grafana - grafana/grafana
- PostgreSQL - postgres
- RabbitMQ - rabbitmq
- InfluxDb - influxdb
- Телеграф - telegraf, is an agent for collecting metrics and writing them to InfluxDB or other outputs.

### VPN

Зона свободного интернета: VPN, направлять через VPN отдельные сайты
- VPN digitalocean.com
- Аруба cloud норм хостер в италии $3.5-5 за 2гб оперы и несколько терабайт трафика, за $1-2 можно самую дешевую виртуалку взять

### Mongo

Начиная с Mongo 5 нужна архитектура arm64/v8.2+, а у RPi 3 архитектура arm64/v8 - этого не достаточно для 5 версии. Поэтому нужно использовать версию 4+, тем более она (будет поддерживаться)[https://www.mongodb.com/support-policy/lifecycles] до февраля 2024 года.

```
docker run --name mongo -d --restart always \
           -p 27017:27017 \
           -e MONGO_INITDB_DATABASE=qshZone \
           -e MONGO_INITDB_ROOT_USERNAME=quash \
           -e MONGO_INITDB_ROOT_PASSWORD=my-secret-pw \
           -v /opt/qshZone/soft/mongo/db:/data/db \
           -v /opt/qshZone/soft/mongo/config:/data/configdb \
           mongo:4.4.18
```

### MariaDb

```
docker run --name mariadb -d --restart always \
           -p 8081:80 \
           -p 3306:3306 \
           -e MARIADB_ROOT_PASSWORD=my-secret-pw \
           -v /opt/qshZone/soft/mariadb/db:/var/lib/mysql \
           -v /opt/qshZone/soft/mariadb/mysqld:/var/run/mysqld \
           -v /opt/qshZone/soft/mariadb/config:/etc/mysql/conf.d \
           mariadb
```

### InfluxDb

```
docker run --name influxdb -d --restart always \
           -p 8086:8086 \
           -v /opt/qshZone/soft/influxdb:/var/lib/influxdb \
           -v /opt/qshZone/soft/influxdb/conf:/etc/influxdb \
           influxdb:1.8
```


## Домашняя автоматизация

### MQTT

Mosquitto - можно установить в виде аддона в hass.io, так он будет попадать в бекап
Установить анонимное подключение или пользователем, включить прослушиваемый порт
Приложение по отправке сообщений неплохое под разные системы https://mqttx.app/
Docs https://www.hivemq.com/mqtt-essentials/
Приложение под iOS, чтобы рисовать графики
```
docker run --name mqtt -d --restart always \
           -p 1883:1883 \
           -p 9001:9001 \
           -v /opt/qshZone/soft/mosquitto/config:/mosquitto/config \
           -v /opt/qshZone/soft/mosquitto/data:/mosquitto/data \
           -v /opt/qshZone/soft/mosquitto/log:/mosquitto/log \
           eclipse-mosquitto
```

### Node Red

```
docker run --name nodered -d --restart always \
           -p 1880:1880 \
           -v /opt/qshZone/soft/nodered:/data \
           nodered/node-red
```

### Smart Home

Наиболее попопулярные решения на сегодняшний день `Home Assistant`, `OpenHab2` и `Majordomo`.

OpenHab2 https://www.openhab.org/ openhab/openhab
