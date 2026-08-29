---
title: "Phase 5 — i18n & Pinyin Ruby"
description: "Implementation of full internationalization (EN/DE/ZH) across the entire site, plus pinyin ruby annotations for Chinese text."
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
  bio: Electrical and Computer Engineering student. Builder of things.
draft: false
---

import SubtitlePlayer from '@/components/SubtitlePlayer.tsx';

This post documents **Phase 5 — i18n + Pinyin Ruby**, the full internationalization of the Cosmos digital garden.

## What Changed

The entire UI now supports three languages:

- **English** (EN) — default locale
- **German** (DE) — full translation
- **Chinese** (ZH) — full translation with pinyin ruby support

## URL Structure

All pages now use locale-prefixed URLs:

- `/personal_garden/en/` — English home
- `/personal_garden/de/` — German home
- `/personal_garden/zh/` — Chinese home

## Pinyin Ruby

The `:zh[...]{pinyin="..."}` syntax renders Chinese characters with pinyin annotations above them using HTML `<ruby>` elements.

## Language Switcher

A language switcher component has been added to the header, allowing users to toggle between EN, DE, and ZH.

## Tag Translations

Tags are automatically translated based on the current locale. For example, "development" becomes "Entwicklung" in German and "开发" in Chinese.