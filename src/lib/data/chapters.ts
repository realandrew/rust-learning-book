export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  sections: Section[];
  prerequisites?: string[];
}

export interface Section {
  id: string;
  title: string;
  type: 'traditional' | 'visual' | 'interactive' | 'exercises';
  icon: string;
  description: string;
  implemented: boolean;
}

export const chapters: Chapter[] = [
  {
    id: 'getting-started',
    number: 1,
    title: 'Getting Started',
    description: 'Install Rust, write your first program, and learn about Cargo',
    difficulty: 'beginner',
    estimatedTime: '30 minutes',
    sections: [
      {
        id: 'installation',
        title: 'Installation and Setup',
        type: 'traditional',
        icon: '⚙️',
        description: 'Learn how to install Rust and set up your development environment',
        implemented: true
      },
      {
        id: 'hello-world',
        title: 'Hello World',
        type: 'interactive',
        icon: '👋',
        description: 'Write and run your first Rust program',
        implemented: true
      },
      {
        id: 'cargo-intro',
        title: 'Cargo Introduction',
        type: 'visual',
        icon: '📦',
        description: 'Understand Rust\'s build system and package manager',
        implemented: true
      }
    ]
  },
  {
    id: 'common-concepts',
    number: 2,
    title: 'Common Programming Concepts',
    description: 'Variables, data types, functions, and control flow in Rust',
    difficulty: 'beginner',
    estimatedTime: '1 hour',
    prerequisites: ['getting-started'],
    sections: [
      {
        id: 'variables',
        title: 'Variables and Mutability',
        type: 'interactive',
        icon: '🔤',
        description: 'Learn about variable declarations and mutability rules',
        implemented: true
      },
      {
        id: 'data-types',
        title: 'Data Types',
        type: 'visual',
        icon: '🔢',
        description: 'Explore Rust\'s type system with interactive examples',
        implemented: true
      },
      {
        id: 'functions',
        title: 'Functions',
        type: 'exercises',
        icon: '⚡',
        description: 'Practice writing and calling functions',
        implemented: true
      },
      {
        id: 'control-flow',
        title: 'Control Flow',
        type: 'interactive',
        icon: '🔀',
        description: 'Master if expressions, loops, and pattern matching',
        implemented: true
      }
    ]
  },
  {
    id: 'ownership',
    number: 3,
    title: 'Understanding Ownership',
    description: 'Rust\'s most unique feature - ownership, borrowing, and lifetimes',
    difficulty: 'intermediate',
    estimatedTime: '2 hours',
    prerequisites: ['common-concepts'],
    sections: [
      {
        id: 'ownership-rules',
        title: 'What is Ownership?',
        type: 'visual',
        icon: '🏠',
        description: 'Visualize how Rust manages memory without a garbage collector',
        implemented: false
      },
      {
        id: 'references-borrowing',
        title: 'References and Borrowing',
        type: 'interactive',
        icon: '🔗',
        description: 'Interactive examples of borrowing rules and lifetime',
        implemented: false
      },
      {
        id: 'slices',
        title: 'The Slice Type',
        type: 'exercises',
        icon: '🍰',
        description: 'Practice working with string and array slices',
        implemented: false
      }
    ]
  },
  {
    id: 'structs',
    number: 4,
    title: 'Using Structs',
    description: 'Structure related data and define methods',
    difficulty: 'beginner',
    estimatedTime: '45 minutes',
    prerequisites: ['ownership'],
    sections: [
      {
        id: 'defining-structs',
        title: 'Defining and Instantiating Structs',
        type: 'interactive',
        icon: '📦',
        description: 'Create custom data types with structs',
        implemented: false
      },
      {
        id: 'method-syntax',
        title: 'Method Syntax',
        type: 'exercises',
        icon: '⚙️',
        description: 'Add behavior to structs with methods',
        implemented: false
      }
    ]
  },
  {
    id: 'enums',
    number: 5,
    title: 'Enums and Pattern Matching',
    description: 'Define types with multiple variants and handle them safely',
    difficulty: 'intermediate',
    estimatedTime: '1.5 hours',
    prerequisites: ['structs'],
    sections: [
      {
        id: 'defining-enums',
        title: 'Defining an Enum',
        type: 'visual',
        icon: '🔀',
        description: 'Understand enum variants and their uses',
        implemented: false
      },
      {
        id: 'option-enum',
        title: 'The Option Enum',
        type: 'interactive',
        icon: '❓',
        description: 'Handle null values safely with Option<T>',
        implemented: false
      },
      {
        id: 'match-control',
        title: 'Match Control Flow',
        type: 'exercises',
        icon: '🎯',
        description: 'Master pattern matching with match expressions',
        implemented: false
      }
    ]
  },
  {
    id: 'modules',
    number: 6,
    title: 'Managing Growing Projects',
    description: 'Organize code with modules, packages, and crates',
    difficulty: 'intermediate',
    estimatedTime: '1 hour',
    prerequisites: ['enums'],
    sections: [
      {
        id: 'packages-crates',
        title: 'Packages and Crates',
        type: 'visual',
        icon: '📚',
        description: 'Understand Rust\'s module system architecture',
        implemented: false
      },
      {
        id: 'defining-modules',
        title: 'Defining Modules',
        type: 'interactive',
        icon: '🏗️',
        description: 'Organize code with modules and visibility',
        implemented: false
      }
    ]
  },
  {
    id: 'collections',
    number: 7,
    title: 'Common Collections',
    description: 'Work with vectors, strings, and hash maps',
    difficulty: 'beginner',
    estimatedTime: '1.5 hours',
    prerequisites: ['modules'],
    sections: [
      {
        id: 'vectors',
        title: 'Storing Lists with Vectors',
        type: 'interactive',
        icon: '📋',
        description: 'Dynamic arrays and list operations',
        implemented: false
      },
      {
        id: 'strings',
        title: 'Storing Text with Strings',
        type: 'exercises',
        icon: '📝',
        description: 'String manipulation and UTF-8 handling',
        implemented: false
      },
      {
        id: 'hashmaps',
        title: 'Hash Maps',
        type: 'visual',
        icon: '🗂️',
        description: 'Key-value storage and retrieval',
        implemented: false
      }
    ]
  },
  {
    id: 'error-handling',
    number: 8,
    title: 'Error Handling',
    description: 'Handle failures gracefully with Result and panic',
    difficulty: 'intermediate',
    estimatedTime: '1 hour',
    prerequisites: ['collections'],
    sections: [
      {
        id: 'panic',
        title: 'Unrecoverable Errors with panic!',
        type: 'traditional',
        icon: '💥',
        description: 'When and how to use panic for unrecoverable errors',
        implemented: false
      },
      {
        id: 'result',
        title: 'Recoverable Errors with Result',
        type: 'interactive',
        icon: '✅',
        description: 'Handle errors gracefully with Result<T, E>',
        implemented: false
      }
    ]
  },
  {
    id: 'generics-traits-lifetimes',
    number: 9,
    title: 'Generic Types, Traits, and Lifetimes',
    description: 'Write flexible, reusable code with generics and traits',
    difficulty: 'advanced',
    estimatedTime: '2.5 hours',
    prerequisites: ['error-handling'],
    sections: [
      {
        id: 'generics',
        title: 'Generic Data Types',
        type: 'visual',
        icon: '🧬',
        description: 'Visualize how generics work at compile time',
        implemented: false
      },
      {
        id: 'traits',
        title: 'Traits: Defining Shared Behavior',
        type: 'interactive',
        icon: '🎭',
        description: 'Define and implement traits for shared behavior',
        implemented: false
      },
      {
        id: 'lifetimes',
        title: 'Validating References with Lifetimes',
        type: 'exercises',
        icon: '⏱️',
        description: 'Master lifetime annotations and borrow checker',
        implemented: false
      }
    ]
  },
  {
    id: 'testing',
    number: 10,
    title: 'Writing Automated Tests',
    description: 'Test your code with unit and integration tests',
    difficulty: 'intermediate',
    estimatedTime: '1 hour',
    prerequisites: ['generics-traits-lifetimes'],
    sections: [
      {
        id: 'writing-tests',
        title: 'How to Write Tests',
        type: 'interactive',
        icon: '🧪',
        description: 'Write and run unit tests',
        implemented: false
      },
      {
        id: 'test-organization',
        title: 'Test Organization',
        type: 'exercises',
        icon: '📊',
        description: 'Organize tests and measure coverage',
        implemented: false
      }
    ]
  }
];

export const learningPaths = {
  beginner: {
    title: '🚀 Beginner Track',
    description: 'Start your Rust journey with fundamentals',
    chapters: ['getting-started', 'common-concepts', 'ownership', 'structs', 'collections'],
    estimatedTime: '6-8 hours'
  },
  intermediate: {
    title: '🏃 Intermediate Track', 
    description: 'Build practical skills and understanding',
    chapters: ['enums', 'modules', 'error-handling', 'testing', 'generics-traits-lifetimes'],
    estimatedTime: '8-12 hours'
  },
  advanced: {
    title: '👨‍💻 Advanced Track',
    description: 'Master advanced concepts and patterns',
    chapters: ['smart-pointers', 'concurrency', 'oop-features', 'patterns', 'advanced-features'],
    estimatedTime: '15-20 hours'
  }
};