export interface CodeSnippet {
  code: string;
  language: string;
  title: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  image?: string;
  technologies: string[];
  highlights?: string[];
  content: string;
  codeSnippets: CodeSnippet[];
}

export const projects: Project[] = [
  {
    id: 'personal-website',
    title: 'Personal Portfolio Website',
    description: 'A modern portfolio website with dark/light theme, AI recommendations, and a digital garden structure.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/Je0Dev/personal_website',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'Vite'],
    highlights: ['Theme system with dark/light mode', 'AI-powered article recommendations', 'PWA support', 'RSS feed generation'],
    content: `
This personal portfolio website serves as a digital garden — a space where projects, learning notes, and ideas grow organically. Built with modern web technologies, it emphasizes performance, accessibility, and a unique visual identity.

## Architecture

The site uses a component-based architecture with lazy-loaded routes for optimal performance. The theme system uses CSS custom properties with Tailwind CSS 4's @theme directive, enabling seamless dark/light mode switching.

## Key Design Decisions

- **CSS Variables for Theming**: All colors are defined as CSS custom properties and referenced in Tailwind's @theme block, allowing runtime theme switching without recompilation.
- **Hash Router**: Uses hash-based routing to avoid 404 errors on static hosting.
- **Dynamic Imports**: Each page is lazy-loaded, reducing initial bundle size.
    `,
    codeSnippets: [
      {
        language: 'typescript',
        title: 'Theme toggle with CSS variables',
        code: `const [isDark, setIsDark] = useState(true);

useEffect(() => {
  const stored = localStorage.getItem('theme');
  const dark = stored ? stored === 'dark' : true;
  setIsDark(dark);
  if (!dark) document.documentElement.classList.add('light');
}, []);

useEffect(() => {
  if (isDark) {
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}, [isDark]);`
      },
      {
        language: 'css',
        title: 'Tailwind v4 theme with variable references',
        code: `@theme {
  --color-deep-olive: var(--clr-deep-olive);
  --color-cream: var(--clr-cream);
  --color-tomato: var(--clr-tomato);
  --color-olive-light: var(--clr-olive-light);
}

:root {
  --clr-deep-olive: #141410;
  --clr-cream: #f0e6d0;
  --clr-tomato: #c45c3e;
  --clr-olive-light: #8b9b6b;
}

.light {
  --clr-deep-olive: #f5f4ef;
  --clr-cream: #2c2924;
}`
      }
    ]
  },
  {
    id: 'cli-atm-system',
    title: 'CLI ATM System',
    description: 'A command-line ATM system in C demonstrating state management, input validation, and banking logic.',
    tags: ['C', 'CLI', 'State Management'],
    githubUrl: 'https://github.com/Je0Dev/cli_atm_system',
    technologies: ['C'],
    highlights: ['State machine architecture', 'Input validation', 'Transaction logging'],
    content: `
A fully functional ATM simulation built entirely in C. This project demonstrates low-level systems programming concepts including state machines, file I/O, and secure input handling.

## How It Works

The system uses a state machine to manage the ATM flow: card insertion → PIN verification → menu selection → transaction processing → logout. Each state has defined transitions and validation rules.

## Security Features

- PIN entry with masked input (echo disabled)
- Account lockout after 3 failed attempts
- Simple XOR encryption for data persistence
    `,
    codeSnippets: [
      {
        language: 'c',
        title: 'State machine core loop',
        code: `typedef enum {
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
}`
      },
      {
        language: 'c',
        title: 'Secure masked PIN input',
        code: `void get_secure_pin(char* buffer, int size) {
  int pos = 0;
  char c;

  while ((c = getch()) != '\\r' && pos < size - 1) {
    if (c == '\\b' && pos > 0) {
      pos--;
      printf("\\b \\b");
    } else if (c >= '0' && c <= '9') {
      buffer[pos++] = c;
      printf("*");
    }
  }
  buffer[pos] = '\\0';
  printf("\\n");
}`
      }
    ]
  },
  {
    id: 'cli-student-database',
    title: 'CLI Student Database',
    description: 'Student database management system with file I/O, search algorithms, and data structures.',
    tags: ['C', 'CLI', 'Data Structures'],
    githubUrl: 'https://github.com/Je0Dev/cli_student_database_management_system',
    technologies: ['C'],
    highlights: ['File-based persistence', 'Binary search', 'Linked list implementation'],
    content: `
A command-line student database system that demonstrates fundamental data structures and algorithms in C. The system supports CRUD operations, search, sorting, and persistent storage.

## Data Structures Used

- **Linked List**: For dynamic student record storage
- **Binary Search**: For efficient record lookup by ID
- **File I/O**: Binary file format for persistent storage

## Features

- Add, delete, update, and search student records
- Sort by name, ID, or grade
- Persistent storage between sessions
    `,
    codeSnippets: [
      {
        language: 'c',
        title: 'Student record linked list',
        code: `typedef struct Student {
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
}`
      }
    ]
  },
  {
    id: 'cli-task-manager',
    title: 'CLI Task Manager',
    description: 'A feature-rich CLI task manager with CRUD operations and persistent storage.',
    tags: ['C', 'CLI', 'CRUD'],
    githubUrl: 'https://github.com/Je0Dev/cli_task_manager_system',
    technologies: ['C'],
    highlights: ['CRUD operations', 'Persistent storage', 'User-friendly CLI interface'],
    content: `
A command-line task manager that helps users organize their work with full CRUD (Create, Read, Update, Delete) functionality and persistent storage.

## Core Features

- Add, edit, delete, and list tasks
- Mark tasks as complete/incomplete
- Priority levels (High, Medium, Low)
- Due date tracking
- Persistent JSON-based storage

## Implementation

Tasks are stored in a dynamically allocated array with capacity doubling to minimize reallocations. The JSON format ensures human-readable persistence.
    `,
    codeSnippets: [
      {
        language: 'c',
        title: 'Dynamic array with capacity doubling',
        code: `typedef struct {
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
      fprintf(stderr, "Memory allocation failed!\\n");
      exit(1);
    }
  }
  list->tasks[list->count++] = task;
}`
      },
      {
        language: 'c',
        title: 'JSON file persistence',
        code: `void save_tasks(TaskList* list, const char* filename) {
  FILE* file = fopen(filename, "w");
  fprintf(file, "{\\n  \\"tasks\\": [\\n");

  for (int i = 0; i < list->count; i++) {
    Task* t = &list->tasks[i];
    fprintf(file, "    {\\n");
    fprintf(file, "      \\"id\\": %d,\\", t->id);
    fprintf(file, "      \\"title\\": \\"%s\\",", t->title);
    fprintf(file, "      \\"completed\\": %s\\n",
            t->completed ? "true" : "false");
    fprintf(file, "    }");
    if (i < list->count - 1) fprintf(file, ",");
    fprintf(file, "\\n");
  }

  fprintf(file, "  ]\\n}\\n");
  fclose(file);
}`
      }
    ]
  },
  {
    id: 'esp32-timer-sensor',
    title: 'ESP32 Offboard Timer Sensor',
    description: 'ESP32-based offboard timer sensor for environmental data logging with WiFi connectivity.',
    tags: ['ESP32', 'Embedded', 'IoT', 'C'],
    githubUrl: 'https://github.com/Je0Dev/esp32OffboardTimerSensor',
    technologies: ['ESP32', 'C', 'FreeRTOS', 'WiFi'],
    highlights: ['Hardware timer interrupts', 'Sensor data acquisition', 'WiFi data transmission'],
    content: `
An ESP32-based environmental sensor system that reads data at regular intervals using hardware timer interrupts and transmits it over WiFi. This project bridges embedded systems programming with IoT connectivity.

## Hardware Setup

- ESP32 WROOM-32 module
- External sensor connected via GPIO
- Hardware timer for precise sampling intervals

## Software Architecture

The system uses FreeRTOS tasks for concurrent data acquisition and transmission, with hardware timers ensuring precise sampling intervals.
    `,
    codeSnippets: [
      {
        language: 'c',
        title: 'Hardware timer configuration',
        code: `void setup_timer() {
  timer_config_t config = {
    .alarm_en = TIMER_ALARM_EN,
    .counter_en = TIMER_COUNTER_EN,
    .intr_type = TIMER_INTR_LEVEL,
    .counter_dir = TIMER_COUNT_UP,
    .auto_reload = TIMER_AUTORELOAD_EN,
    .divider = 80  // 80 MHz / 80 = 1 MHz
  };

  timer_init(TIMER_GROUP_0, TIMER_0, &config);
  timer_set_alarm_value(TIMER_GROUP_0, TIMER_0, 1000000); // 1 sec
  timer_enable_intr(TIMER_GROUP_0, TIMER_0);
  timer_isr_register(TIMER_GROUP_0, TIMER_0, &timer_isr, NULL, 0, NULL);
  timer_start(TIMER_GROUP_0, TIMER_0);
}`
      },
      {
        language: 'c',
        title: 'WiFi data transmission',
        code: `void send_sensor_data(float value) {
  HTTPClient http;
  http.begin("https://api.example.com/sensor");

  char payload[128];
  snprintf(payload, sizeof(payload),
    "{\\"sensor\\": %.2f, \\"timestamp\\": %lu}",
    value, millis());

  http.addHeader("Content-Type", "application/json");
  int code = http.POST(payload);
  http.end();
}`
      }
    ]
  },
  {
    id: 'imdb-clone',
    title: 'IMDB Clone App',
    description: 'A Java-based IMDB clone exploring data modeling, API design, and complex relational queries.',
    tags: ['Java', 'API Design', 'Data Modeling'],
    githubUrl: 'https://github.com/Je0Dev/ImdbCloneApp',
    technologies: ['Java'],
    highlights: ['Data model for movies/actors/genres', 'RESTful API design', 'Search functionality'],
    content: `
An Android application that mimics core IMDB functionality, built in Java with SQLite for local storage. This project was an exploration of data modeling for complex relational domains.

## Data Model

The database schema models the many-to-many relationships between movies, actors, and genres. A junction table links movies to their cast members.

## Features

- Browse and search movies
- View detailed movie information
- Manage a personal watchlist
- Track watched movies
    `,
    codeSnippets: [
      {
        language: 'java',
        title: 'Database schema definition',
        code: `public class MovieContract {
  public static final String SQL_CREATE_MOVIES =
    "CREATE TABLE movies (" +
    "id INTEGER PRIMARY KEY," +
    "title TEXT NOT NULL," +
    "rating REAL," +
    "year INTEGER," +
    "poster_url TEXT," +
    "synopsis TEXT)";

  public static final String SQL_CREATE_WATCHLIST =
    "CREATE TABLE watchlist (" +
    "movie_id INTEGER PRIMARY KEY," +
    "date_added TEXT," +
    "FOREIGN KEY(movie_id) REFERENCES movies(id))";
}`
      },
      {
        language: 'java',
        title: 'Watchlist management',
        code: `public void addToWatchlist(long movieId) {
  ContentValues values = new ContentValues();
  values.put("movie_id", movieId);
  values.put("date_added", new Date().toString());
  db.insert("watchlist", null, values);
}

public List<Movie> getWatchlist() {
  Cursor cursor = db.rawQuery(
    "SELECT m.* FROM movies m " +
    "INNER JOIN watchlist w ON m.id = w.movie_id " +
    "ORDER BY w.date_added DESC",
    null
  );
  return parseMovies(cursor);
}`
      }
    ]
  }
];
