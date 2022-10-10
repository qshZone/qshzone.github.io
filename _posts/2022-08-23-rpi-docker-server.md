---
layout: post
title: Docker сервер на Raspberry Pi
description: Долгое время хотел структурировать знания по администрированию Linux, работе с Docker и захостить простые задачи на Raspberry Pi. Мой личный опыт в настройке простого и функционального сервера.
date-updated: 2022-10-10
---

С февраля 2020 года я активно знакомился с одноплатниками, приложениями Linux, многообразием протоколов, с помощью которых смогу реализовать взаимодействие устройств, а в августе 2022 года плотно занялся Docker. Я уже делал одну попытку настройки связки `Docker + Raspberry Pi`, но тогда не хватило знаний и опыта. Теперь кратко опишу этапы настройки такого сервера на `Raspberry Pi 3`.

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

Для `Ubuntu` нужно воспользоваться [хорошей статьёй на Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-ru).

Docker устанавливается для `Raspberri Pi OS` командой  
`sudo curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh`


Чтобы убедиться, что докер работает, вызываем `docker -v`, будет выведена версия установленного ПО.
Но для скачивания образа нужно будет каждый раз вызывать `sudo`. Для ввода команд без `sudo`, добавляем группу docker и добавляем в неё текущего пользователя.

- `sudo groupadd docker` - если группа не существует, как правило она уже создана после установки скрипта
- `sudo gpasswd -a $USER docker`
- `newgrp docker` - после этого получится подключаться к Docker daemon

Для некоторых контейнеров нужно создавать `volumes`, я создаю в `/opt/service-name` папки `container-name`.

Для каждого контейнера задаётся имя, restart policy, порт, том, образ. Командную строку я привожу для каждого контейнера. А изоляции по сети я не делаю.


### Portainer

[Сайт](https://www.portainer.io/)

```
docker run --name portainer -d \
           -p 8080:9443 --restart always \
           -v /opt/qshZone/portainer-data:/data \
           -v /var/run/docker.sock:/var/run/docker.sock \
           portainer/portainer-ce
```

### Watchtower

Автоматизация обновления запущенных контейнеров, скачивает новые образы и перезапускает контейнеры с теми же параметрами.

[Сайт](https://containrrr.dev/watchtower/), [Исходники](https://github.com/containrrr/watchtower)

```
docker run --name watchtower -d --restart always \
           -v /var/run/docker.sock:/var/run/docker.sock \
           lcontainrrr/watchtower`
```

### Organizr

Основная точка входа. Инструмент, который часто используется, когда всё сервисы настроены, он будет на `80` порту.

[Сайт](https://organizr.app/)

```
docker run --name organizr -d --restart always \
           -p 80:80 \
           -p 443:443 \
           -v /opt/qshZone/organizr-data:/config \
           organizr/organizr
```

Настройка
- Название БД: `SomeDb`
- Расположение БД: `/config/db`

### Dynamic DNS

Иногда нет возможности получить «белый» статический ip-адрес, динамический ip-адрес можно привязать к доменному имени бесплатно.

- Noip `coppit/no-ip` This is a simple Docker container for running the No-IP2 dynamic DNS update script. It will keep your domain.ddns.net DNS alias up-to-date as your home IP changes.
- [DuckDNS](https://www.duckdns.org/) Получение динамического адреса

## Программное обеспечение

### PiHole

Блокировка рекламы на уровне DNS, что-то типа AdBlock, но не для отдельного устройства, а для всей сети.

```
pihole/pihole
```

### Smart Home

Наиболее попопулярные решения на сегодняшний день `Home Assistant`, `OpenHab2` и `Majordomo`.

Mosquitto - можно установить в виде аддона в hass.io, так он будет попадать в бекап
Установить анонимное подключение или пользователем, включить прослушиваемый порт
Приложение по отправке сообщений неплохое под разные системы https://mqttx.app/
Docs https://www.hivemq.com/mqtt-essentials/
Приложение под iOS, чтобы рисовать графики
```
docker run --name mqtt -d --restart always \
           -p 1883:1883 \
           -p 9001:9001 \
           -v /opt/qshZone/mosquitto/config:/mosquitto/config \
           -v /opt/qshZone/mosquitto/data:/mosquitto/data \
           -v /opt/qshZone/mosquitto/log:/mosquitto/log \
           eclipse-mosquitto
```

OpenHab2 https://www.openhab.org/ openhab/openhab


## Media

- FreshRss - `freshrss/freshrss` [Demo](https://demo.freshrss.org/)

### Torrents

- jackett (indexer для поиска в торрентах)
- bazarr (закачивает сабы для видео)
- sonar (библиотека сериалов, передает в Transmission закачку)

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


## NAS Servers

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
- Мониторинг `radarr`

### VPN

Зона свободного интернета: VPN, направлять через VPN отдельные сайты
- VPN digitalocean.com
- Аруба cloud норм хостер в италии $3.5-5 за 2гб оперы и несколько терабайт трафика, за $1-2 можно самую дешевую виртуалку взять

### Mongo
```
--restart always
docker run --name mongo -d \
           -p 27017:27017 \
           -v /opt/qshZone/mongo/db:/data/db \
		   -v /opt/qshZone/mongo/config:/data/configdb \
           andresvidal/rpi3-mongodb3
```
