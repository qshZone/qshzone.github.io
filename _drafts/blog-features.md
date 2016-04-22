---
layout: post
url150q: https://c1.staticflickr.com/1/671/22783344835_2448af5246_q.jpg
title: Возможности блога
date: 2015-10-01
author: <a href="https://twitter.com/PavelQuash" target="_blank">Pavel.Quash</a>
meta: meta
description: |
  Тестовая статья-черновик, демонстрирующая возможности Jekyll и пути решения задач, расширяющих его функционал.
  Все примеры составлены по официальной документации <a href="https://daringfireball.net/projects/markdown/" target="_blank">Markdown</a>.
  Также изложены дополнительные идеи по работе с html разметкой встраиваемых внешних ресурсов с помощью <a href="https://docs.shopify.com/themes/liquid-documentation/basics" target="_blank">Liquid</a>.
  Как говорится, в случае заинтересованности, добро пожаловать под кат.
---

{ % gist dc95409bdd7ec44c25e9 % }

Yaml
----

Спецификация по Yaml: <http://www.yaml.org/spec/1.2/spec.html>



Markdown
--------

Простой перенос текста  
после вставки двух и больше пробелов в конце строки

_Акцент1_ __Акцент2__ *Акцент3* **Акцент4** В**нут**ри слова

\*Этот текст окружен звездочками\* - экранируются `\*`

Если нужно выделить какое либо `слово` в тексте.

``Чтобы использовать символ (`) внутри блока, ставится двойной ` ``

Способы формирования ссылок и списка символами - * +

- [Ссылка Ngenix без заголовка](http://ngenix.qshzone.ru)
* [Ссылка qshzone с заголовком](http://qshzone.ru "Блог")
+ [Ссылка референсная Jekyll][jekyll]
+ [Google][]
- <a href="http://example.com/" target="_blank">Новое окно только через html</a>
* [Markdown новое окно с добавлением атрибута](https://daringfireball.net/projects/markdown/ "Official page"){:target="_blank"}
- <http://example.com> - подстановка ссылки как есть
* <address@example.com> - подстановки email с префиксом mailto:
+ Пути в ссылках могут быть относительными
- [Ссылка на самый первый пост]({% post_url 2015-10-26-hello-world %})

[jekyll]: http://jekyllrb.com "Jekyll"
[google]: <http://google.com>

    Блок кода
	10 первая строка
	20 вторая строка
	30 третья строка
	
    <link rel="alternate" type="application/atom+xml" title="{{ site.title }}" href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}" />
	
    <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>


Подсветка синтаксиса любого языка или разметки производится плагином

{% highlight html linenos %}
<ul class="contact-list">
  <li>{{ site.title }}</li>
  <li><a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
</ul>
{% endhighlight %}

Нумерованный список

0. по связям есть страница
0. rss ссылка
0. помочь проекту (dropbox, yandex, rocketbank и т.п.)

Этот текст разделитель, иначе нумерация будет продолжаться

0. Элемент 1 в отдельном параграфе, так как разделен пустой строкой в разметке

    Комментарий (4 пробела перед текстом)
	
	Параграф второй
	
0. Элемент 2

	> Цитата вставляется в элемент, так как присутствует отступ
	
	    Здесь располагается код, помечается двойным отступом

1986\. Какой-то год - экранируется символом `\` чтобы не стать частью нумерованного списка
		
> ### Заголовок третьего уровня
> Цитируемая фраза очень длинная Цитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длиннаяЦитируемая фраза очень длинная  
> HW! (перенос строки после вставки двух пробелов)
>
> И отступ в отдельном параграфе
>
> > Вложенный блок

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>. Внутри html тэгов markdown не работает.</dd>
</dl>

Изображение по прямой ссылке Flickr

![Использование Flickr](https://c1.staticflickr.com/1/769/22096893420_0ff498e5f0_z.jpg)

Изображение по алиасу в теле документа Vk

![Изображение квартиры][img]

[img]: https://cs7062.vk.me/c7001/v7001096/1496c/YZ7knOHk7po.jpg "Дизайн квартиры"

Табличное представление ограничения размера файлов различных облачных сервисов

| Сервис       | Размер                               |
| ------------ | ------------------------------------ |
| Flickr       | изображение до 200 мб; видео до 1 Гб |
| Dropbox      | файлы любого размера                 |
| Yandex Disk  | файлы до 10 Гб                       |
| Google Disk  | файлы до 5 Тб                        |
| Mailru Cloud | файлы до 2 Гб                        |
| Github       | файлы до 100 мб; репозиторий до 1 гб |

Упрощенное формирование таблицы

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

Горизонтальные отступы

отступ ---

---

отступ ***

***

отступ * * *

* * *

отступ ___

___


    # Заголовок первого уровня \#

    Еще заголовок первого уровня через ===
    ===

    ## Заголовок второго уровня \##

    Еще заголовок второго уровня через ---
    ---



Liquid
------

### Документация по Liquid

- <https://docs.shopify.com/themes/liquid-documentation/basics>
- <https://github.com/Shopify/liquid/wiki/Liquid-for-Designers>

### Работа с форматированием дат

Case

{% assign m = page.date | date: "%-m" %}
{{ page.date | date: "%-d" }}
{% case m %}
  {% when '1' %}января
  {% when '2' %}февраля
  {% when '3' %}марта
  {% when '4' %}апреля
  {% when '5' %}мая
  {% when '6' %}июня
  {% when '7' %}июля
  {% when '8' %}августа
  {% when '9' %}сентября
  {% when '10' %}октября
  {% when '11' %}ноября
  {% when '12' %}декабря
{% endcase %}{{ page.date | date: "%Y" }}

Array

{% assign months = "января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря" | split: "|" %}
{% assign m = page.date | date: "%-m" | minus: 1 %}
{% assign day = page.date | date: "%d" %}
{% assign month = months[m] %}
{% assign year = page.date | date: "%Y" %}
<span>{{ day }} {{ month }} {{ year }}</span>



Разное
------

### Спойлер

{% include spoiler title="Спойлер" content="`Hello World!`" %}

### Использование картографических сервисов

Google

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d438776.56887605216!2d47.90443412455312!3d64.55869648379733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x441273a619fa41ab%3A0x94ba4bd76781b2bd!2z0YAuINCc0LXQt9C10L3RjA!5e0!3m2!1sru!2sru!4v1446720558048" width="640" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>

2 Gis

<script charset="utf-8" src="http://widgets.2gis.com/js/DGWidgetLoader.js"></script>
<script charset="utf-8">new DGWidgetLoader({"width":640,"height":600,"borderColor":"#a3a3a3","pos":{"lat":56.892866000000005,"lon":60.61468499999999,"zoom":16},"opt":{"city":"ekaterinburg"},"org":[{"id":"1267165676474636"}]});</script>
<noscript style="color:#c00;font-size:16px;font-weight:bold;">Виджет карты использует JavaScript. Включите его в настройках вашего браузера.</noscript>

Yandex

<div style="width: 640px; height: 600px;">
<script type="text/javascript" charset="utf-8" src="https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=plumT9BpePIzJoWeIOW_NmjUgT2LxfM2&lang=ru_RU"></script>
</div>

Подписка
--------

Форма подписки

{% include services/email_subscribe.html %}

Ссылка

<a href="https://feedburner.google.com/fb/a/mailverify?uri=qshzone&amp;loc=ru_RU">Subscribe to qshZone by Email</a>

Счетчик подписок

<p><a href="http://feeds.feedburner.com/qshzone"><img src="http://feeds.feedburner.com/~fc/qshzone?bg=99CCFF&amp;fg=444444&amp;anim=0" height="26" width="88" style="border:0" alt="" /></a></p>