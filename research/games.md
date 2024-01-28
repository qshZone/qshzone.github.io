---
layout: default
---

- Содержание
{:toc}

{% for game in site.data.games %}

## {{game.title}}
{{game.year}}
{% for date in game.dates %}

{{date.description}}

{% endfor %}

{% endfor %}

