---
title: "Phase 5 — i18n & Pinyin Ruby"
description: "在整个网站实现完整国际化（EN/DE/ZH），并为中文文本添加拼音 Ruby 标注。"
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
  bio: 电气与计算机工程学生。事物的创造者。
draft: false
---

这篇文章记录了 **Phase 5 — i18n + Pinyin Ruby**，即 Cosmos 数字花园的完整国际化。

## 变更内容

整个用户界面现在支持三种语言：

- **英语** (EN) — 默认语言
- **德语** (DE) — 完整翻译
- **中文** (ZH) — 完整翻译，支持拼音 Ruby 标注

## URL 结构

所有页面现在使用带有语言前缀的 URL：

- `/personal_garden/en/` — 英文首页
- `/personal_garden/de/` — 德文首页
- `/personal_garden/zh/` — 中文首页

## 语言切换器

在导航栏中添加了语言切换组件，允许用户在 EN、DE 和 ZH 之间切换。

## 标签翻译

标签会根据当前语言自动翻译。例如，"development" 在德语中变为 "Entwicklung"，在中文中变为 "开发"。