---
layout: post
title: Обновление Garmin Montana 6xx и разлочка
description: |
  Навигатор - устройство многофункциональное, но Garmin «завязываются» на собственную инфраструктуру ПО и даже стандартные GPX файлы можно загрузить только через специальный софт, например, BirdsEye. Но при обновлении прошивки устройства можно разлочить это ограничение и загружать как GPX файл точек и треков, так и JNX файлы карт.
# categories: [one, two]
# tags: [one, two]
# date-updated: #Необязательно. Дата обновления поста в формате 2015-10-01. Если статья обновляется.
---

## Обновление firmware

Для быстрого скачивания прошивки с ресурсов Garmin, можно воспользоваться [ресурсом](http://whiter.brinkster.net/generated/LatestGarminFirmwares.html), отображающим общий список прошивок с ссылками на скачивание. После того, как в списке найдена позиция с необходимой ссылкой, прошивка скачивается, например, `Montana_WebUpdater__760.gcd`.

Теперь для «разлочки» необходимо воспользоваться [Firmware Patcher (JNX Loader Patcher v3.80)](http://whiter.brinkster.net/Versions.shtml) ([прямая ссылка](http://whiter.brinkster.net/FirmwarePatcher.html)) и указать ему скачанный `gcd` файл с увеличением версии на 1. Например, с `7.60` на `7.61`. На выходе будет файл такого вида `Montana_WebUpdater__760_Patched.gcd`.

Для обновления, этот файл переименовывается в `gupdate.gcd` и помещается в папку `\Garmin` устройства, подключенного по USB. Теперь устройство «безопасно извлекается» и перезагружается. Происходит процесс обновления и с устройством можно работать.

Оригинал инструкции для обновления firmware.

```
GCD Update Procedure 

Use the links in Firmware History to download the zipped file for the version you need 
Unzip the downloaded archive and extract the gcd file 
Rename the gcd file to gupdate.gcd 
Connect the VIRB to your computer and enter Mass Storage Mode 
Copy the gupdate.gcd file to [µSD]\Garmin\gupdate.gcd 
Disconnect and reboot the VIRB 
Once the update is completed, the VIRB will delete the gupdate.gcd file 
4.
```



Есть ограничение на размер имени файла


	* Прошивки для навигаторов Garmin: 
Прошивка:
- базовая страница: http://www.gps-forum.ru/cgi-bin/forum/showpost.pl?Board=gpsgeneral&Number=136477&page=0&view=full&mode=flat&sb=5
- подробная http://taginvn.livejournal.com/tag/manual
- http://forum.velomania.ru/showthread.php?t=109441 
- http://ice-moto.ucoz.ru/publ/navigacija_i_svjaz/rastrovye_karty_dlja_navigatorov_garmin_montana_600_650/7-1-0-19
- http://www.5dorog.ru/forum/viewtopic.php?f=8&t=113
- http://www.5dorog.ru/forum/viewtopic.php?f=8&t=217




## Обновление карт

https://www.garmin.ru/maps/
MapChecker

Обновление карт https://www.garmin.ru/maps/map_1790.php
