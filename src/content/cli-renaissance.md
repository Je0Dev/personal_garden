---
title: The CLI Renaissance
date: Feb 1, 2026
excerpt: Why command-line tools are having a moment and what they teach us about good software design.
tags:
  - CLI
  - C
---
There was a time when every serious programmer started with the command line. Before IDEs, before frameworks, before the web — there was a terminal and a prompt and whatever you could build with your own hands.

## The Projects

I've built several CLI applications, each one teaching me something different about software:

- **CLI ATM System**: Banking logic, state management, input validation
- **CLI Student Database**: File I/O, data structures, search algorithms
- **CLI Task Manager**: CRUD operations, persistent storage, user experience

These aren't impressive projects on a resume. But they taught me more about programming than any tutorial.

### CLI ATM System

Highlights: state machine architecture, input validation, transaction logging.

The core loop is a state machine:

```c
typedef enum {
  STATE_IDLE,
  STATE_PIN_VERIFY,
  STATE_MENU,
  STATE_WITHDRAW,
  STATE_DEPOSIT,
  STATE_BALANCE,
  STATE_EXIT
} ATMState;

void run_atm() {
  ATMState state = STATE_IDLE;
  Account current;

  while (state != STATE_EXIT) {
    switch (state) {
      case STATE_IDLE:
        if (insert_card(&current)) state = STATE_PIN_VERIFY;
        break;
      case STATE_PIN_VERIFY:
        if (verify_pin(&current)) state = STATE_MENU;
        else state = STATE_IDLE;
        break;
      case STATE_MENU:
        state = handle_menu();
        break;
      case STATE_WITHDRAW:
        process_withdrawal(&current);
        state = STATE_MENU;
        break;
      // ... more states
    }
  }
}
```

And the PIN entry masks input:

```c
void get_secure_pin(char* buffer, int size) {
  int pos = 0;
  char c;

  while ((c = getch()) != '\r' && pos < size - 1) {
    if (c == '\b' && pos > 0) {
      pos--;
      printf("\b \b");
    } else if (c >= '0' && c <= '9') {
      buffer[pos++] = c;
      printf("*");
    }
  }
  buffer[pos] = '\0';
  printf("\n");
}
```

### CLI Student Database

Highlights: file-based persistence, binary search, linked list implementation.

Records are stored in a linked list with binary search for fast lookup:

```c
typedef struct Student {
  int id;
  char name[100];
  float grade;
  struct Student* next;
} Student;

Student* create_student(int id, const char* name, float grade) {
  Student* s = (Student*)malloc(sizeof(Student));
  s->id = id;
  strncpy(s->name, name, 99);
  s->grade = grade;
  s->next = NULL;
  return s;
}

void insert_student(Student** head, Student* s) {
  s->next = *head;
  *head = s;
}

Student* search_by_id(Student* head, int id) {
  while (head) {
    if (head->id == id) return head;
    head = head->next;
  }
  return NULL;
}
```

### CLI Task Manager

Highlights: CRUD operations, persistent storage, user-friendly CLI interface.

Tasks live in a dynamic array that doubles its capacity to minimize reallocations:

```c
typedef struct {
  Task* tasks;
  int count;
  int capacity;
} TaskList;

void add_task(TaskList* list, Task task) {
  if (list->count >= list->capacity) {
    list->capacity *= 2;
    list->tasks = realloc(list->tasks,
        list->capacity * sizeof(Task));
    if (list->tasks == NULL) {
      fprintf(stderr, "Memory allocation failed!\n");
      exit(1);
    }
  }
  list->tasks[list->count++] = task;
}
```

Persistence uses a simple JSON format:

```c
void save_tasks(TaskList* list, const char* filename) {
  FILE* file = fopen(filename, "w");
  fprintf(file, "{\n  \"tasks\": [\n");

  for (int i = 0; i < list->count; i++) {
    Task* t = &list->tasks[i];
    fprintf(file, "    {\n");
    fprintf(file, "      \"id\": %d,\", t->id);
    fprintf(file, "      \"title\": \"%s\",", t->title);
    fprintf(file, "      \"completed\": %s\n",
            t->completed ? "true" : "false");
    fprintf(file, "    }");
    if (i < list->count - 1) fprintf(file, ",");
    fprintf(file, "\n");
  }

  fprintf(file, "  ]\n}\n");
  fclose(file);
}
```

## Why CLI Matters

Command-line tools force you to think about the essentials. There's no CSS to hide behind, no animations to distract the user. Just input, processing, output.

A good CLI tool is:

- **Fast**: No loading screens, no spinners
- **Clear**: The output tells you exactly what happened
- **Composable**: It can be piped to other tools
- **Reliable**: It works the same way every time

## The Unix Philosophy

The Unix philosophy — "do one thing and do it well" — is more relevant than ever. In a world of bloated applications, a tool that does one thing perfectly is a breath of fresh air.

## What I Learned

Building CLI tools taught me:

1. **Error handling matters more than features**
2. **Good output is a feature**
3. **Simplicity is harder than complexity**
4. **The user's time is more valuable than yours**

## The Future

CLI tools aren't going anywhere. They're evolving, getting better, becoming more beautiful. Tools like ripgrep, fd, and zoxide prove that command-line software can be both powerful and delightful.

The renaissance isn't about going back. It's about remembering what matters.

## Further Reading

- [The Unix Programming Environment](https://www.amazon.com/Unix-Programming-Environment-Prentice-Hall-Software/dp/013937681X) — The classic book by Kernighan and Pike
- [ripgrep](https://github.com/BurntSushi/ripgrep) — A line-oriented search tool — CLI done right
- [Command Line Interface Guidelines](https://clig.dev/) — An open-source guide to building great CLIs
- [The Art of Command Line](https://github.com/jlevy/the-art-of-command-line) — Master the command line in one page

## Related Projects

- [cli_atm_system](https://github.com/Je0Dev/cli_atm_system) — CLI ATM system in C — state management and validation
- [cli_student_database_management_system](https://github.com/Je0Dev/cli_student_database_management_system) — Student database with file I/O and search
- [cli_task_manager_system](https://github.com/Je0Dev/cli_task_manager_system) — Task manager with persistent storage