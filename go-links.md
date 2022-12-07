---
layout: default
---

- Содержание
{:toc}

{% assign urlBase = site.url + site.baseurl %}
{% for category in site.data.links %}

## {{category.category}}

{% for link in category.links %}

{% assign alias = link.alias | downcase %}
{% assign urlAlias = urlBase | append: "/go#" | append: alias %}
{% assign urlRaw = link.href %}
- [{{ alias }}]({{ urlAlias }}){:title="{{ urlRaw }}"} - {{ link.desc }}
{% endfor %}

{% endfor %}

