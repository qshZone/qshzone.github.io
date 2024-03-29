---
layout: post
title: Установка Jekyll на Windows
description: Когда создаешь блог на движке Jekyll, то хотя бы одна статья, из числа первых, будет про его настройку — ведь всегда есть нюансы. Опишу, как сделать это оперативно и какие камни преткновения могут встретиться.
---

![Логотип Jekyll](https://pp.userapi.com/c837728/v837728371/351eb/T-PkeQllOUM.jpg)

Мне снова потребовалось переустановить [Jekyll](https://jekyllrb.com/). Использую я его в связке с [GitHub Pages](https://pages.github.com/). Смотри, как можно быстро с пониманием процесса провести установку и подружиться с версионностью устанавливаемых плагинов на машину с Windows 10 и выше. Устанавливал на версии: `Windows 10 x64 v1903`, `Windows 10 Pro x64 v10.0.19043` и `Windows 10 Pro x64 v19044.2075`.

- Содержание
{:toc}


## Общая информация {#info}

При установке Jekyll на Windows необходимо поставить набор фреймворков. Корректная работа некоторых из них может зависеть от версии.

Jekyll это gem-модуль Ruby, который устанавливается из репозитория Gem. Соответственно для работы блога необходимо поставить сам Ruby, DevKit к нему и выполнить команду установки Jekyll. Этого будет достаточно для начала работы.

В некоторых инструкциях описывается также установка подсветки синтаксиса Pygments. Он тянет за собой Python и его менеджер пакетов Pip. Но имей ввиду, что при публикации на GitHub, используется только Rouge, и устанавливать Pygments в этом случае не имеет смысла. Кроме этого Pygments работает только с Python 2.x и при билде сайта могут возникнуть различные ошибки.


## Шаги по установке Jekyll {#steps}

Шаг 1. Установи [Ruby](http://rubyinstaller.org/downloads/) последней версии в соответствии с разрядностью твоей машины. Появились совмещенные дистрибутивы Ruby+Devkit, поэтому чтобы избежать Шаг 2, воспользуйся им. В стартовом диалоге необходимо отметить флажок `Add Ruby executables to your PATH`.

![Установка Ruby с PATH](https://pp.userapi.com/c836224/v836224371/28983/Qf8M3wrqbMU.jpg)

Шаг 2. Не обязательный шаг. Если ты используешь дистрибутив Ruby без DevKit, то по той же ссылке скачивается и устанавливается [Ruby DevKit](http://rubyinstaller.org/downloads/). И привязывается к инсталляции Ruby командами из консоли Windows.

{% highlight html %}
cd C:\DirSoft\RubyDevKit
ruby dk.rb init
ruby dk.rb install
{% endhighlight %}

Шаг 3. Нужна будет перезагрузка операционной системы.

Шаг 4. Далее ставь Jekyll простой командой. Но если есть необходимость в четком совпадении версий с установленным на GitHub, то используй список команд, приведенных ниже и соответствующий раздел.
    {% highlight html %}
gem install jekyll
    {% endhighlight %}

На этом шаге можно уже начать работу с Jekyll. При билде Jekyll может сообщить о необходимости установки еще нескольких gem-модулей - это легко сделать командами, описанными ниже.

{% highlight html %}
gem list - все установленные gems и их версии
gem install <gem name> -v #.#.# - установка gem модуля конкретной версии
gem uninstall <gem name> - удаление модуля gem
{% endhighlight %}


## Версионность {#versions}

Для того, чтобы видеть результат таким, каким он будет выглядеть при публикации на GitHub, можно руководствоваться страницей [GitHub Dependency versions](https://pages.github.com/versions/) и установить такие же версии на локальную машину.

Ниже приведен рабочий список версий для установки на `Windows 10 x64`. В комментарии указано, какую версию допустимо использовать.

| Приложение  | Версия      | Комментарий                  |
|-------------|-------------|------------------------------|
| Ruby        | 3.1.0-1 x64 | последняя                    |
| Ruby Devkit | 3.1.0-1 x64 | последняя                    |
| Jekyll      | 4.3.2       | последняя                    |
|-------------|-------------|------------------------------|
| Python      | 2.7.12      | только 2.x (можно не ставить)|
| Pip         | 8.1.1       | последняя (можно не ставить) |
| Pygments    | 2.1.3       | последняя (можно не ставить) |

Инструкции по настройке Jekyll на Windows с необходимыми ссылками есть также на [официальном сайте](https://jekyllrb.com/docs/windows/). Неплохой инструкцией ранее считалась [Run Jekyll on Windows](http://jekyll-windows.juthilo.com/).

Также есть две полезные ссылки по [установке Jekyll](http://yizeng.me/2013/05/10/setup-jekyll-on-windows/), а также по [списку команд Gem](http://yizeng.me/2013/05/17/quick-rubygems-command-references-for-jekyll/).


## Установка Pygments {#pygments}

Rouge ставится простой командой `gem install rouge`. Для Pygments же необходимо дополнительно установить [Python](https://www.python.org/downloads/). Самой последней является третья версия, но для работы с Jekyll необходимо ставить - вторую.

При установке отметь пункт `Add python.exe to PATH`.

![Установка Python 2.x](https://pp.userapi.com/c626617/v626617371/31e2a/Psey0kSBf-4.jpg)

Для питона необходим менеджер пакетов [Pip](https://pip.pypa.io/en/latest/installing/). Он уже установлен для версий питона 2.7.9 и выше и 3.4 и выше.

Команды, которые могут пригодиться для работы с Python'ом.

{% highlight html %}
restart computer - после установки Pygments
python --version - версия установленного Python
python -m pip list - list of plugins and versions
{% endhighlight %}

Установи пакет Pygments
{% highlight html %}
python -m pip install pygments
{% endhighlight %}

В файле конфига Jekyll `_config.yml` остается прописать `highlighter: Pygments` (большие буквы важны). Повторюсь еще раз - в GitHub Pages значение всегда заменяется на Rouge.


## Пакеты GitHub Pages {#github-packets}

Каждый пакет Jekyll отвечает за определенный функционал. На начало апреля этого года список пакетов в таблице ниже. Вот [актуальный список][github-packets]. Обозначу в таблице заслуживающие внимания.

| Зависимость | Комментарий |
|-|-|
| jekyll-coffeescript | A CoffeeScript converter for Jekyll |
| jekyll-feed | A Jekyll plugin to generate an Atom feed of your Jekyll posts |
| jekyll-mentions | @mention support for your Jekyll site |
| jekyll-paginate | Built-in Pagination Generator for Jekyll |
| jekyll-redirect-from | Seamlessly specify multiple redirection URLs for your pages and posts |
| jekyll-seo-tag | A Jekyll plugin to add metadata tags for search engines and social networks to better index and display your site's content. |
| jekyll-sitemap | Automatically generate a sitemap.xml for your Jekyll site |
| jekyll-theme-* | Jekyll themes |
| jemoji | GitHub-flavored emoji plugin for Jekyll |
| kramdown | is yet-another-markdown-parser but fast, pure Ruby, using a strict syntax definition and supporting several common extensions |
| liquid | A secure, non-evaling end user template engine with aesthetic markup |
| rouge	| Rouge aims to a be a simple, easy-to-extend drop-in replacement for pygments |
| sass | Sass makes CSS fun again. Sass is an extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more. It's translated to well-formatted, standard CSS using the command line tool or a web-framework plugin |


## Полезные ссылки {#links}

> - [Документация Jekyll](https://jekyllrb.com/docs/)
> - [Все специфические моменты по связке GitHub + Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#configuring-jekyll-in-your-github-pages-site).
> - [Актуальный список версий пакетов на GitHub Pages][github-packets]

[github-packets]: https://pages.github.com/versions/

Это всё, что необходимо знать про начало работы с `Jekyll`. Дерзай.