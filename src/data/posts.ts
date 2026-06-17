export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
}

export interface ExternalLink {
  title: string;
  url: string;
  description: string;
}

export interface ProjectLink {
  name: string;
  url: string;
  description: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  color: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  relatedPosts: RelatedPost[];
  externalLinks: ExternalLink[];
  projectLinks: ProjectLink[];
  tableOfContents: { id: string; title: string; level: number }[];
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'The Quiet Art of Building Things That Last',
    slug: 'building-things-that-last',
    excerpt: 'On craftsmanship, patience, and why the best software is written slowly.',
    content: `
There is something deeply countercultural about building software with patience. The industry rewards speed — shipping fast, moving fast, breaking things. But the systems that endure are rarely the ones built in haste.

## The Myth of the Quick Fix

Every project begins with good intentions. We tell ourselves this time will be different, this time we'll write the tests, document the decisions, leave the code cleaner than we found it. And then the deadline approaches.

The quick fix becomes the permanent solution. The temporary hack becomes the foundation. This is not a failure of engineering — it is a failure of imagination.

## Craftsmanship as Resistance

To write clean code in a world that demands speed is an act of quiet rebellion. It means:

- Saying no when yes would be easier
- Writing the test when no one is watching
- Refactoring the module that "works fine"
- Documenting the decision when the sprint is already over

These are not heroic acts. They are the daily practice of someone who respects their craft.

## The Long Game

The best code I've ever written was written slowly. Not because I was being careful, but because I was being thoughtful. There is a difference.

Thoughtful code considers the person who will read it next year. It anticipates the edge case that hasn't happened yet. It leaves room for the idea that we might be wrong.

## What Endures

Look at any long-lived codebase — the Linux kernel, PostgreSQL, Emacs — and you'll find a common thread: the people who maintained them cared more about getting it right than getting it done.

That's the lesson. Not that speed is bad, but that slowness has its own kind of power.
    `,
    date: 'Mar 15, 2026',
    readTime: '7 min',
    tags: ['Craftsmanship', 'Software Engineering', 'Philosophy', 'TypeScript', 'Web Development'],
    image: 'https://www.oldbookillustrations.com/wp-content/uploads/2014/09/The-old-clockmaker-01.jpg',
    color: '#8b5e3c',
    author: {
      name: 'Geo Mas',
      avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
      bio: 'Electrical and Computer Engineering student. Builder of things.'
    },
    relatedPosts: [
      { id: '2', title: 'Why I Keep a Personal Website', slug: 'why-personal-website' },
      { id: '3', title: 'Notes on Learning Rust', slug: 'notes-on-learning-rust' },
    ],
    externalLinks: [
      { 
        title: 'The Pragmatic Programmer', 
        url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/',
        description: 'A foundational book on software craftsmanship'
      },
      { 
        title: 'A Philosophy of Software Design', 
        url: 'https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201',
        description: 'John Ousterhout on managing complexity'
      },
      {
        title: 'IndieWeb',
        url: 'https://indieweb.org/',
        description: 'A community of people building things on their own websites'
      },
      {
        title: 'Maggie Appleton — Digital Garden',
        url: 'https://maggieappleton.com/garden',
        description: 'Beautifully crafted notes on programming and design'
      },
    ],
    projectLinks: [
      {
        name: 'esp32OffboardTimerSensor',
        url: 'https://github.com/Je0Dev/esp32OffboardTimerSensor',
        description: 'ESP32 offboard timer sensor — built with care, not speed'
      },
      {
        name: 'personal_website',
        url: 'https://github.com/Je0Dev/personal_website',
        description: 'This very website, a work in progress'
      },
    ],
    tableOfContents: [
      { id: 'myth-quick-fix', title: 'The Myth of the Quick Fix', level: 2 },
      { id: 'craftsmanship', title: 'Craftsmanship as Resistance', level: 2 },
      { id: 'long-game', title: 'The Long Game', level: 2 },
      { id: 'what-endures', title: 'What Endures', level: 2 },
    ],
  },
  {
    id: '2',
    title: 'Why I Keep a Personal Website',
    slug: 'why-personal-website',
    excerpt: 'In an age of social media, owning your own corner of the internet matters more than ever.',
    content: `
I didn't set out to build a personal website. It happened the way most good things happen — gradually, then all at once.

## The Problem with Platforms

Social media platforms are not your home. They are rented rooms where you can hang pictures on the wall, but the landlord can change the locks at any time. Algorithms shift. Accounts get suspended. Platforms die.

Your own website is the one thing on the internet that is truly yours.

## What I've Learned

Keeping a personal website has taught me more about the web than any course or tutorial. Not because the technology is hard, but because it forces you to think about things that platforms abstract away:

- How do I want my words to look?
- How should a reader navigate my thoughts?
- What do I want to be remembered for?

These are design questions, but they're also philosophical ones.

## The Joy of Small Things

My website will never have millions of visitors. It will never trend on any platform. And that is precisely the point.

It exists for the same reason I keep a journal, or take photographs of old buildings, or write code that no one will ever see. Not for the audience. For the practice.

## A Digital Garden

I like the metaphor of a digital garden. Not a blog, not a portfolio — a garden. Some things are fully grown. Others are just seeds. A few are dead and waiting to be composted.

The garden doesn't judge. It just grows.

## Start Small

If you don't have a personal website, start with one page. Write about something you care about. Link to things you find interesting. Let it grow slowly.

The internet needs more small, careful websites. Yours could be one of them.
    `,
    date: 'Mar 8, 2026',
    readTime: '5 min',
    tags: ['IndieWeb', 'Personal Website', 'Digital Garden', 'Web Development'],
    image: 'https://www.oldbookillustrations.com/wp-content/uploads/2016/03/The-garden-01.jpg',
    color: '#6b8b5e',
    author: {
      name: 'Geo Mas',
      avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
      bio: 'Electrical and Computer Engineering student. Builder of things.'
    },
    relatedPosts: [
      { id: '1', title: 'The Quiet Art of Building Things That Last', slug: 'building-things-that-last' },
      { id: '4', title: 'ESP32 and the Joy of Physical Computing', slug: 'esp32-physical-computing' },
    ],
    externalLinks: [
      { 
        title: 'IndieWeb Carnival', 
        url: 'https://indieweb.org/IndieWeb_Carnival',
        description: 'Monthly blogging event in the IndieWeb community'
      },
      { 
        title: 'Digital Gardens', 
        url: 'https://maggieappleton.com/garden-history',
        description: 'Maggie Appleton on the history of digital gardens'
      },
      {
        title: 'fromjason.xyz',
        url: 'https://www.fromjason.xyz/',
        description: 'A wonderful digital garden by Jason Velazquez'
      },
      {
        title: 'People and Blogs',
        url: 'https://manuelmoreale.com/peopleandblogs',
        description: 'Interviews with independent bloggers'
      },
      {
        title: 'The Forest',
        url: 'https://theforest.link',
        description: 'A discovery tool for finding interesting blogs'
      },
    ],
    projectLinks: [
      {
        name: 'personal_website',
        url: 'https://github.com/Je0Dev/personal_website',
        description: 'My personal website — TypeScript, minimal and intentional'
      },
      {
        name: 'lang_website',
        url: 'https://github.com/Je0Dev/lang_website',
        description: 'Another iteration on the personal site concept'
      },
    ],
    tableOfContents: [
      { id: 'problem-platforms', title: 'The Problem with Platforms', level: 2 },
      { id: 'what-learned', title: 'What I\'ve Learned', level: 2 },
      { id: 'joy-small', title: 'The Joy of Small Things', level: 2 },
      { id: 'digital-garden', title: 'A Digital Garden', level: 2 },
      { id: 'start-small', title: 'Start Small', level: 2 },
    ],
  },
  {
    id: '3',
    title: 'Notes on Learning Rust',
    slug: 'notes-on-learning-rust',
    excerpt: 'A JavaScript developer\'s honest account of learning Rust — the frustration, the breakthroughs, and why it\'s worth it.',
    content: `
I started learning Rust because everyone told me to. Not in so many words, but the message was clear: if you care about performance, safety, and the future of systems programming, you need to know Rust.

## The First Week

The first week of learning Rust is humbling. You come from a language where you can just... do things. Want to mutate a variable? Sure. Want to pass a string to a function and keep using it afterwards? Go ahead.

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
    `,
    date: 'Feb 28, 2026',
    readTime: '9 min',
    tags: ['Rust', 'Learning', 'Systems Programming'],
    image: 'https://www.oldbookillustrations.com/wp-content/uploads/2014/11/Anvil-and-forge-01.jpg',
    color: '#dea584',
    author: {
      name: 'Geo Mas',
      avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
      bio: 'Electrical and Computer Engineering student. Builder of things.'
    },
    relatedPosts: [
      { id: '1', title: 'The Quiet Art of Building Things That Last', slug: 'building-things-that-last' },
      { id: '4', title: 'ESP32 and the Joy of Physical Computing', slug: 'esp32-physical-computing' },
    ],
    externalLinks: [
      { 
        title: 'The Rust Programming Language (The Book)', 
        url: 'https://doc.rust-lang.org/book/',
        description: 'The official Rust book — free online'
      },
      { 
        title: 'Rust by Example', 
        url: 'https://doc.rust-lang.org/rust-by-example/',
        description: 'Learn Rust through runnable examples'
      },
      {
        title: 'Zero to Production in Rust',
        url: 'https://www.zero2prod.com/',
        description: 'A practical guide to building backend applications in Rust'
      },
      {
        title: 'Rust for JavaScript Developers',
        url: 'https://rustforjs.dev/',
        description: 'A guide specifically for JS developers learning Rust'
      },
    ],
    projectLinks: [
      {
        name: 'cli_atm_system',
        url: 'https://github.com/Je0Dev/cli_atm_system',
        description: 'CLI ATM system in C — the predecessor to my Rust experiments'
      },
      {
        name: 'cli_task_manager_system',
        url: 'https://github.com/Je0Dev/cli_task_manager_system',
        description: 'CLI task manager — another C project that would be better in Rust'
      },
    ],
    tableOfContents: [
      { id: 'first-week', title: 'The First Week', level: 2 },
      { id: 'borrow-checker', title: 'The Borrow Checker', level: 2 },
      { id: 'js-wrong', title: 'What JavaScript Got Wrong', level: 2 },
      { id: 'practical-rust', title: 'Practical Rust', level: 2 },
      { id: 'verdict', title: 'The Verdict', level: 2 },
    ],
  },
  {
    id: '4',
    title: 'ESP32 and the Joy of Physical Computing',
    slug: 'esp32-physical-computing',
    excerpt: 'There is a special kind of satisfaction in writing code that makes something in the real world move, blink, or beep.',
    content: `
Software development is mostly abstract. We manipulate data structures that exist only in memory, building systems that serve HTTP requests or render pixels on a screen. It's satisfying work, but it's also distant from the physical world.

Physical computing changes that.

## The ESP32

The ESP32 is a remarkable piece of hardware. For a few dollars, you get:

- A dual-core processor
- WiFi and Bluetooth
- Dozens of GPIO pins
- ADC, DAC, PWM, I2C, SPI — the whole alphabet

It's the kind of chip that makes you want to build things just to see what it can do.

## My First Project

My first ESP32 project was an offboard timer sensor. Nothing glamorous. A sensor that reads data at regular intervals and sends it somewhere. But the moment I saw it working — the LED blinking, the data flowing — I felt something that pure software rarely gives me.

The satisfaction of making a thing work in the real world.

## What Hardware Teaches You

Working with hardware teaches you things that software alone cannot:

- **Patience**: Debugging a circuit is harder than debugging code
- **Precision**: A loose wire can ruin hours of work
- **Humility**: The computer does exactly what you tell it, not what you meant

## The Sensor Project

The offboard timer sensor I built reads environmental data and logs it. The code is simple — set up a timer, read the sensor, send the data. But the system as a whole is something I'm proud of because it exists in the world, not just on a screen.

## Why It Matters

We spend so much of our lives building things that are invisible. There's value in making something you can hold, something that interacts with the physical world, something that beeps when you want it to beep.

That's the joy of physical computing.
    `,
    date: 'Feb 15, 2026',
    readTime: '6 min',
    tags: ['ESP32', 'Embedded', 'Hardware', 'IoT', 'Embedded Systems', 'C++'],
    image: 'https://www.oldbookillustrations.com/wp-content/uploads/2014/09/Telegraph-instrument-01.jpg',
    color: '#339933',
    author: {
      name: 'Geo Mas',
      avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
      bio: 'Electrical and Computer Engineering student. Builder of things.'
    },
    relatedPosts: [
      { id: '3', title: 'Notes on Learning Rust', slug: 'notes-on-learning-rust' },
      { id: '5', title: 'The CLI Renaissance', slug: 'cli-renaissance' },
    ],
    externalLinks: [
      { 
        title: 'ESP32 Official Documentation', 
        url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/',
        description: 'Official ESP32 development framework documentation'
      },
      { 
        title: 'PlatformIO', 
        url: 'https://platformio.org/',
        description: 'Professional collaborative platform for embedded development'
      },
      {
        title: 'Making Things Talk',
        url: 'https://makethingsbook.com/',
        description: 'Tom Igoe\'s book on networked physical computing'
      },
      {
        title: 'Adafruit Learning System',
        url: 'https://learn.adafruit.com/',
        description: 'Excellent tutorials for hardware projects'
      },
    ],
    projectLinks: [
      {
        name: 'esp32OffboardTimerSensor',
        url: 'https://github.com/Je0Dev/esp32OffboardTimerSensor',
        description: 'ESP32 offboard timer sensor — my first real hardware project'
      },
    ],
    tableOfContents: [
      { id: 'esp32', title: 'The ESP32', level: 2 },
      { id: 'first-project', title: 'My First Project', level: 2 },
      { id: 'what-hardware-teaches', title: 'What Hardware Teaches You', level: 2 },
      { id: 'sensor-project', title: 'The Sensor Project', level: 2 },
      { id: 'why-matters', title: 'Why It Matters', level: 2 },
    ],
  },
  {
    id: '5',
    title: 'The CLI Renaissance',
    slug: 'cli-renaissance',
    excerpt: 'Why command-line tools are having a moment and what they teach us about good software design.',
    content: `
There was a time when every serious programmer started with the command line. Before IDEs, before frameworks, before the web — there was a terminal and a prompt and whatever you could build with your own hands.

## The Projects

I've built several CLI applications, each one teaching me something different about software:

- **CLI ATM System**: Banking logic, state management, input validation
- **CLI Student Database**: File I/O, data structures, search algorithms
- **CLI Task Manager**: CRUD operations, persistent storage, user experience

These aren't impressive projects on a resume. But they taught me more about programming than any tutorial.

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
4. **The user\'s time is more valuable than yours**

## The Future

CLI tools aren't going anywhere. They're evolving, getting better, becoming more beautiful. Tools like ripgrep, fd, and zoxide prove that command-line software can be both powerful and delightful.

The renaissance isn't about going back. It's about remembering what matters.
    `,
    date: 'Feb 1, 2026',
    readTime: '5 min',
    tags: ['CLI', 'C', 'Unix', 'Software Design', 'Software'],
    image: 'https://www.oldbookillustrations.com/wp-content/uploads/2014/09/Typewriter-01.jpg',
    color: '#6b5540',
    author: {
      name: 'Geo Mas',
      avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
      bio: 'Electrical and Computer Engineering student. Builder of things.'
    },
    relatedPosts: [
      { id: '4', title: 'ESP32 and the Joy of Physical Computing', slug: 'esp32-physical-computing' },
      { id: '1', title: 'The Quiet Art of Building Things That Last', slug: 'building-things-that-last' },
    ],
    externalLinks: [
      { 
        title: 'The Unix Programming Environment', 
        url: 'https://www.amazon.com/Unix-Programming-Environment-Prentice-Hall-Software/dp/013937681X',
        description: 'The classic book by Kernighan and Pike'
      },
      { 
        title: 'ripgrep', 
        url: 'https://github.com/BurntSushi/ripgrep',
        description: 'A line-oriented search tool — CLI done right'
      },
      {
        title: 'Command Line Interface Guidelines',
        url: 'https://clig.dev/',
        description: 'An open-source guide to building great CLIs'
      },
      {
        title: 'The Art of Command Line',
        url: 'https://github.com/jlevy/the-art-of-command-line',
        description: 'Master the command line in one page'
      },
    ],
    projectLinks: [
      {
        name: 'cli_atm_system',
        url: 'https://github.com/Je0Dev/cli_atm_system',
        description: 'CLI ATM system in C — state management and validation'
      },
      {
        name: 'cli_student_database_management_system',
        url: 'https://github.com/Je0Dev/cli_student_database_management_system',
        description: 'Student database with file I/O and search'
      },
      {
        name: 'cli_task_manager_system',
        url: 'https://github.com/Je0Dev/cli_task_manager_system',
        description: 'Task manager with persistent storage'
      },
    ],
    tableOfContents: [
      { id: 'projects', title: 'The Projects', level: 2 },
      { id: 'why-cli', title: 'Why CLI Matters', level: 2 },
      { id: 'unix-philosophy', title: 'The Unix Philosophy', level: 2 },
      { id: 'what-learned', title: 'What I Learned', level: 2 },
      { id: 'future', title: 'The Future', level: 2 },
    ],
  },
  {
    id: '6',
    title: 'On Keeping an IMDB Clone as a Learning Project',
    slug: 'imdb-clone-learning',
    excerpt: 'What building an IMDB clone taught me about data modeling, APIs, and the value of copying good design.',
    content: `
Clone projects get a bad reputation. "You're just copying someone else's idea," people say. But cloning is one of the best ways to learn.

## The IMDB Clone

I built an IMDB clone app in Java. Not because the world needed another movie database, but because IMDB is a well-understood problem with clear requirements:

- Movies have actors, directors, genres
- Users can rate and review
- Search needs to be fast
- Data relationships are complex but not impossible

## What I Learned

### Data Modeling

IMDB's data model is deceptively complex. A movie can have hundreds of cast members. An actor can be in thousands of movies. Modeling these relationships properly taught me more about database design than any course.

### API Design

Building the API layer forced me to think about:

- What data does the client actually need?
- How do I avoid N+1 queries?
- When should I paginate?
- What does a good error response look like?

### The Value of Constraints

Having a real product to copy was liberating. I didn't need to design the UI — I could focus on the architecture. I didn't need to invent features — I could focus on implementation quality.

## Copying Is Learning

Every great artist started by copying. Every great writer started by imitating. Every great programmer started by building something that already existed.

The clone isn't the destination. It's the path.

## What\'s Next

The IMDB clone taught me enough that I want to build more clones. Not to publish them, but to learn from them. Each one is a masterclass in a different kind of problem.

That's the secret: the project isn't the product. The learning is.
    `,
    date: 'Jan 18, 2026',
    readTime: '6 min',
    tags: ['Java', 'API Design', 'Data Modeling', 'Learning', 'Software'],
    image: 'https://www.oldbookillustrations.com/wp-content/uploads/2014/09/The-reading-01.jpg',
    color: '#3b82f6',
    author: {
      name: 'Geo Mas',
      avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
      bio: 'Electrical and Computer Engineering student. Builder of things.'
    },
    relatedPosts: [
      { id: '5', title: 'The CLI Renaissance', slug: 'cli-renaissance' },
      { id: '3', title: 'Notes on Learning Rust', slug: 'notes-on-learning-rust' },
    ],
    externalLinks: [
      { 
        title: 'Domain-Driven Design', 
        url: 'https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215',
        description: 'Eric Evans on modeling complex domains'
      },
      { 
        title: 'REST API Design Rulebook', 
        url: 'https://www.amazon.com/REST-API-Design-Rulebook/dp/1449317901',
        description: 'Practical guidelines for designing RESTful APIs'
      },
      {
        title: 'The OMDb API',
        url: 'http://www.omdbapi.com/',
        description: 'A free RESTful web service to obtain movie information'
      },
      {
        title: 'How to Design Programs',
        url: 'https://htdp.org/',
        description: 'A foundational approach to program design'
      },
    ],
    projectLinks: [
      {
        name: 'ImdbCloneApp',
        url: 'https://github.com/Je0Dev/ImdbCloneApp',
        description: 'IMDB clone in Java — data modeling and API design practice'
      },
    ],
    tableOfContents: [
      { id: 'imdb-clone', title: 'The IMDB Clone', level: 2 },
      { id: 'what-learned', title: 'What I Learned', level: 2 },
      { id: 'copying-learning', title: 'Copying Is Learning', level: 2 },
      { id: 'whats-next', title: 'What\'s Next', level: 2 },
    ],
  },
  {
    id: '7',
    title: 'How I Structure My Language Learning',
    slug: 'language-learning-system',
    excerpt: 'A practical breakdown of the tools, habits, and routines I use to learn German, Spanish, Chinese, and English in parallel.',
    content: `
Learning a language is a marathon, not a sprint. Learning four at once sounds insane — but with the right system, it's surprisingly manageable.

## The Philosophy

I follow a simple principle: **input-first, output-later**. Before you can speak, you need to understand. Before you write, you need to read. This is the comprehensible input (CI) approach popularized by Stephen Krashen.

For each language, I have three buckets:

1. **Daily habits** — 15-30 minutes of non-negotiable practice
2. **Weekly deep work** — 1-2 hours of focused study
3. **Passive exposure** — podcasts, music, YouTube in the background

## Tools I Use

### Anki (All Languages)
Spaced repetition is non-negotiable. I review 10-15 new cards per language per day. The key is consistency — missing a day creates a backlog that kills motivation.

### Dreaming Spanish
The best CI resource for Spanish. I track my hours (currently at 180) and work through the roadmap from superbeginner to advanced. The premium subscription is worth every dollar.

### Nicos Weg (German)
DW's free A1-B1 course is the gold standard for structured German learning. Story-driven, interactive, and completely free.

### DuChinese (Chinese)
Graded readers for Mandarin. The tap-to-translate feature makes reading possible even at HSK2. I read one story daily.

## My Weekly Routine

| Day | Morning (15 min) | Evening (30 min) |
|-----|-----------------|-------------------|
| Mon | Anki reviews | Spanish: Dreaming Spanish |
| Tue | Anki reviews | German: Nicos Weg |
| Wed | Anki reviews | Chinese: DuChinese |
| Thu | Anki reviews | Spanish: Hoy Hablamos podcast |
| Fri | Anki reviews | German: Easy German YouTube |
| Sat | Anki + 1h deep work on weakest language |
| Sun | Rest or passive immersion (movies, music) |

## Tracking Progress

I track hours of CI per language. My current targets:

- **Spanish**: 300h (currently 180h — aiming for B2 by end of year)
- **German**: 150h (currently 60h — solid A2)
- **Chinese**: 200h (currently 40h — slow but steady)
- **English**: Native-level maintenance (reading The Economist, watching TED)

## What Works Best

After two years of this system, here's what I've learned:

- **Consistency beats intensity**. 20 minutes daily beats 3 hours on Sunday.
- **Input first**. Don't force speaking until you can understand naturally.
- **Track everything**. Hours, cards reviewed, streaks — data keeps you honest.
- **One language at a time for output**. I only actively practice speaking Spanish.
- **Use dead time**. Podcasts during commute, Anki while waiting in line.

The system isn't perfect, but it's sustainable. And sustainability is the only thing that matters in language learning.
    `,
    date: 'Feb 10, 2026',
    readTime: '8 min',
    tags: ['Language Learning', 'Learning', 'Personal Development', 'Productivity'],
    image: 'https://www.oldbookillustrations.com/wp-content/uploads/2014/09/The-young-scholar-01.jpg',
    color: '#6b7b4b',
    author: {
      name: 'Geo Mas',
      avatar: 'https://avatars.githubusercontent.com/u/217055154?s=120&v=4',
      bio: 'Electrical and Computer Engineering student. Builder of things.'
    },
    relatedPosts: [
      { id: '3', title: 'Notes on Learning Rust', slug: 'notes-on-learning-rust' },
      { id: '2', title: 'Why I Keep a Personal Website', slug: 'why-personal-website' },
    ],
    externalLinks: [
      {
        title: 'Dreaming Spanish',
        url: 'https://www.dreamingspanish.com/',
        description: 'Comprehensible input-based Spanish learning platform'
      },
      {
        title: 'Nicos Weg',
        url: 'https://learngerman.dw.com/en/nicos-weg/c-36519789',
        description: 'Free German course by Deutsche Welle'
      },
      {
        title: 'DuChinese',
        url: 'https://duchinese.net/',
        description: 'Graded readers for Mandarin Chinese'
      },
      {
        title: 'Anki',
        url: 'https://apps.ankiweb.net/',
        description: 'Spaced repetition flashcard system'
      },
    ],
    projectLinks: [
      {
        name: 'Languages App',
        url: 'https://je0dev.github.io/lang_website/',
        description: 'My language learning web app with resources and tools'
      },
    ],
    tableOfContents: [
      { id: 'philosophy', title: 'The Philosophy', level: 2 },
      { id: 'tools', title: 'Tools I Use', level: 2 },
      { id: 'weekly-routine', title: 'My Weekly Routine', level: 2 },
      { id: 'tracking', title: 'Tracking Progress', level: 2 },
      { id: 'what-works', title: 'What Works Best', level: 2 },
    ],
  },
];

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

export const getPostsByTag = (tag: string): Post[] => {
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getRelatedPosts = (currentSlug: string): Post[] => {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return posts.filter(post => 
    post.slug !== currentSlug &&
    post.tags.some(tag => currentPost.tags.includes(tag))
  ).slice(0, 3);
};
