---
title: Notes on Learning Rust
date: Feb 28, 2026
excerpt: A JavaScript developer's honest account of learning Rust — the frustration, the breakthroughs, and why it's worth it.
tags:
  - Rust
  - Systems Programming
---
I started learning Rust because everyone told me to. Not in so many words, but the message was clear: if you care about performance, safety, and the future of systems programming, you need to know Rust.

## The First Week

The first week of *learning* Rust is humbling. You come from a language where you can just... do things. Want to mutate a variable? Sure. Want to pass a string to a function and keep using it afterwards? Go ahead.

Rust says no. Not because it's mean, but because it cares.

## The Borrow Checker

The borrow checker is Rust's most famous feature and its most misunderstood. It's not a gatekeeper — it's a teacher. Every compilation error is a lesson in thinking about memory differently.

The moment it clicks, you realize: the borrow checker wasn't preventing you from writing code. It was preventing you from writing bugs.

## What JavaScript Got Wrong

Learning Rust made me a better JavaScript developer. Not because I use Rust concepts in JavaScript, but because Rust forced me to think about things JavaScript lets me ignore:

- Who owns this data?
- When does this resource get freed?
- What happens if two things try to modify this at the same time?

These questions exist in JavaScript too. JavaScript just lets the program crash instead of answering them.

## Practical Rust

I'm not writing operating systems. I'm an electrical and computer engineering student who likes to build things. Rust has been useful for:

- Embedded systems programming (ESP32)
- Performance-critical data processing
- Understanding how computers actually work

## The Verdict

Rust is hard. Not because the syntax is complex, but because it asks you to think differently. And that's exactly why it's worth learning.

Even if you never write Rust professionally, the way it trains you to think about code will make you better at every other language you use.

## Further Reading

- [The Rust Programming Language (The Book)](https://doc.rust-lang.org/book/) — The official Rust book — free online
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/) — Learn Rust through runnable examples
- [Zero to Production in Rust](https://www.zero2prod.com/) — A practical guide to building backend applications in Rust
- [Rust for JavaScript Developers](https://rustforjs.dev/) — A guide specifically for JS developers learning Rust

## Related Projects

- [cli_atm_system](https://github.com/Je0Dev/cli_atm_system) — CLI ATM system in C — the predecessor to my Rust experiments
- [cli_task_manager_system](https://github.com/Je0Dev/cli_task_manager_system) — CLI task manager — another C project that would be better in Rust