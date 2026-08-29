---
title: "Phase 5 — i18n & Pinyin Ruby"
description: "Implementierung der vollständigen Internationalisierung (EN/DE/ZH) über die gesamte Website sowie Pinyin-Ruby-Annotationen für chinesischen Text."
date: Aug 29, 2026
tags:
  - i18n
  - localization
  - pinyin
  - development
illustration: /personal_garden/images/alpaca-wolf.jpg
color: '#4a7c59'
author:
  name: Geo Mas
  avatar: https://avatars.githubusercontent.com/u/217055154?s=120&v=4
  bio: Student der Elektrotechnik und Informatik. Ersteller von Dingen.
draft: false
---

Dieser Beitrag dokumentiert **Phase 5 — i18n + Pinyin Ruby**, die vollständige Internationalisierung des Cosmos Digital Gardens.

## Was sich geändert hat

Die gesamte Benutzeroberfläche unterstützt jetzt drei Sprachen:

- **Englisch** (EN) — Standardsprache
- **Deutsch** (DE) — vollständige Übersetzung
- **Chinesisch** (ZH) — vollständige Übersetzung mit Pinyin-Ruby-Unterstützung

## URL-Struktur

Alle Seiten verwenden jetzt sprachprefixe URLs:

- `/personal_garden/en/` — Englische Startseite
- `/personal_garden/de/` — Deutsche Startseite
- `/personal_garden/zh/` — Chinesische Startseite

## Sprachumschalter

Eine Sprachumschaltkomponente wurde zum Header hinzugefügt, mit der Benutzer zwischen EN, DE und ZH wechseln können.