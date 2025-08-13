<script lang="ts">
  import { onMount } from 'svelte';
  import CodeMirrorEditor from './CodeMirrorEditor.svelte';

  let sectionElement: HTMLElement;
  let currentExercise = 0;
  
  const exercises = [
    {
      id: 'variables',
      title: 'Variables & Mutability',
      description: 'Learn to work with mutable and immutable variables',
      problem: 'Fix the code below to make it compile. The variable x needs to be reassigned.',
      starterCode: `fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    
    x = 6; // This line causes an error
    println!("The value of x is now: {}", x);
}`,
      solution: `fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    
    x = 6;
    println!("The value of x is now: {}", x);
}`,
      hint: 'Use the `mut` keyword to make a variable mutable',
      expectedOutput: 'The value of x is: 5\nThe value of x is now: 6'
    },
    {
      id: 'functions',
      title: 'Function Parameters',
      description: 'Practice writing functions with parameters and return values',
      problem: 'Complete the function below to add two numbers together.',
      starterCode: `fn main() {
    let result = add_numbers(5, 3);
    println!("5 + 3 = {}", result);
}

// TODO: Implement this function
fn add_numbers(a: i32, b: i32) -> i32 {
    // Your code here
}`,
      solution: `fn main() {
    let result = add_numbers(5, 3);
    println!("5 + 3 = {}", result);
}

fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}`,
      hint: 'Remember that the last expression in a function is returned automatically (no semicolon needed)',
      expectedOutput: '5 + 3 = 8'
    },
    {
      id: 'control-flow',
      title: 'Control Flow',
      description: 'Use if statements and loops to control program flow',
      problem: 'Complete the function to check if a number is even or odd.',
      starterCode: `fn main() {
    let number = 7;
    
    // TODO: Use an if statement to check if number is even or odd
    // Print "even" or "odd" accordingly
}`,
      solution: `fn main() {
    let number = 7;
    
    if number % 2 == 0 {
        println!("even");
    } else {
        println!("odd");
    }
}`,
      hint: 'Use the modulo operator (%) to check if a number is divisible by 2',
      expectedOutput: 'odd'
    }
  ];
  
  let userCodes = exercises.map(ex => ex.starterCode);
  let outputs = exercises.map(() => '');
  let showHints = exercises.map(() => false);
  let showSolutions = exercises.map(() => false);
  let isRunning = exercises.map(() => false);

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  function handleCodeChange(exerciseIndex: number) {
    return (event: CustomEvent<string>) => {
      userCodes[exerciseIndex] = event.detail;
    };
  }

  function runCode(exerciseIndex: number) {
    isRunning[exerciseIndex] = true;
    outputs[exerciseIndex] = '';
    
    setTimeout(() => {
      const exercise = exercises[exerciseIndex];
      const userCode = userCodes[exerciseIndex];
      
      // Simple validation logic
      if (exercise.id === 'variables' && userCode.includes('let mut x')) {
        outputs[exerciseIndex] = exercise.expectedOutput;
      } else if (exercise.id === 'functions' && (userCode.includes('a + b') || userCode.includes('return a + b'))) {
        outputs[exerciseIndex] = exercise.expectedOutput;
      } else if (exercise.id === 'control-flow' && userCode.includes('if') && userCode.includes('%')) {
        outputs[exerciseIndex] = exercise.expectedOutput;
      } else {
        outputs[exerciseIndex] = 'Code has compilation errors. Check your solution and try again.';
      }
      
      isRunning[exerciseIndex] = false;
    }, 1000);
  }

  function toggleHint(exerciseIndex: number) {
    showHints[exerciseIndex] = !showHints[exerciseIndex];
  }

  function toggleSolution(exerciseIndex: number) {
    showSolutions[exerciseIndex] = !showSolutions[exerciseIndex];
    if (showSolutions[exerciseIndex]) {
      userCodes[exerciseIndex] = exercises[exerciseIndex].solution;
    } else {
      userCodes[exerciseIndex] = exercises[exerciseIndex].starterCode;
    }
  }

  function resetCode(exerciseIndex: number) {
    userCodes[exerciseIndex] = exercises[exerciseIndex].starterCode;
    outputs[exerciseIndex] = '';
    showHints[exerciseIndex] = false;
    showSolutions[exerciseIndex] = false;
  }
</script>

<style lang="postcss">
  .exercise-container {
    @apply bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden;
  }

  .exercise-header {
    @apply p-6 bg-gradient-to-r from-rust-primary/5 to-rust-secondary/5 border-b border-gray-200;
  }

  .exercise-badge {
    @apply bg-rust-primary text-white text-sm font-bold px-3 py-1 rounded-full;
  }

  .exercise-controls {
    @apply flex gap-2;
  }

  .control-button {
    @apply px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 border;
  }

  .reset-button {
    @apply bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400;
  }

  .problem-statement {
    @apply mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg;
  }

  .exercise-workspace {
    @apply grid grid-cols-1 lg:grid-cols-2 gap-6 p-6;
  }

  .code-section {
    @apply space-y-4;
  }

  .output-section {
    @apply space-y-4;
  }

  .section-title {
    @apply flex items-center justify-between pb-2 border-b border-gray-200;
  }

  .editor-actions {
    @apply flex flex-wrap gap-2 p-3 bg-gray-700 rounded-b-lg;
  }

  .run-button {
    @apply text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 text-sm border-none font-medium;
    background-color: #ce422b;
  }

  .run-button:hover:not(:disabled) {
    background-color: #b8371f;
  }

  .run-button:disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .hint-button {
    @apply bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 text-sm border-none font-medium;
  }

  .solution-button {
    @apply bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 text-sm border-none font-medium;
  }

  .output-container {
    @apply bg-gray-900 border border-gray-700 rounded-lg overflow-hidden;
  }

  .output-content {
    @apply p-4 min-h-[120px] flex items-start;
  }

  .output-text {
    @apply font-mono text-sm text-green-400 whitespace-pre-wrap m-0;
  }

  .output-placeholder {
    @apply text-gray-500 text-sm italic;
  }

  .hint-container {
    @apply mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg;
  }

  .hint-header {
    @apply flex items-center gap-2 mb-2;
  }

  .hint-icon {
    @apply text-lg;
  }

  .hint-label {
    @apply font-semibold text-yellow-800 text-sm;
  }

  .hint-text {
    @apply text-yellow-700 text-sm;
  }

  @media (max-width: 768px) {
    .exercise-workspace {
      @apply grid-cols-1;
    }
    
    .editor-actions {
      @apply flex-col;
    }
    
    .run-button, .hint-button, .solution-button {
      @apply w-full;
    }
  }
</style>

<section bind:this={sectionElement} class="py-8">
  <div class="max-w-7xl mx-auto px-8">
    <h2 class="text-4xl md:text-5xl text-rust-primary mb-8 text-center font-bold">Interactive Rust Exercises</h2>
    <p class="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
      Practice Rust programming with these hands-on exercises. Write, edit, and run code directly in your browser.
    </p>
    
    <div class="space-y-12">
      {#each exercises as exercise, index}
        <div class="exercise-container">
          <div class="exercise-header">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-4">
                <div class="exercise-badge">#{index + 1}</div>
                <div>
                  <h3 class="text-2xl text-rust-primary font-bold">{exercise.title}</h3>
                  <p class="text-gray-600 mt-1">{exercise.description}</p>
                </div>
              </div>
              <div class="exercise-controls">
                <button 
                  on:click={() => resetCode(index)}
                  class="control-button reset-button"
                  title="Reset to original code"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
            
            <div class="problem-statement">
              <h4 class="font-semibold text-gray-800 mb-2">🎯 Challenge:</h4>
              <p class="text-gray-700">{exercise.problem}</p>
            </div>
          </div>
          
          <div class="exercise-workspace">
            <div class="code-section">
              <div class="section-title">
                <h4 class="font-semibold text-gray-800">Code Editor</h4>
                <span class="text-sm text-gray-500">Write your Rust code here</span>
              </div>
              
              <CodeMirrorEditor 
                bind:code={userCodes[index]}
                language="rust"
                placeholder="Write your Rust code here..."
                fileName="{exercise.id}.rs"
                on:change={handleCodeChange(index)}
              />
              
              <div class="editor-actions">
                <button 
                  on:click={() => runCode(index)}
                  disabled={isRunning[index]}
                  class="run-button"
                >
                  {#if isRunning[index]}
                    <span class="animate-spin">⚙️</span> Running...
                  {:else}
                    ▶️ Run Code
                  {/if}
                </button>
                
                <button 
                  on:click={() => toggleHint(index)}
                  class="hint-button"
                >
                  💡 {showHints[index] ? 'Hide Hint' : 'Show Hint'}
                </button>
                
                <button 
                  on:click={() => toggleSolution(index)}
                  class="solution-button"
                >
                  {showSolutions[index] ? '🙈 Hide Solution' : '🔍 Show Solution'}
                </button>
              </div>
            </div>
            
            <div class="output-section">
              <div class="section-title">
                <h4 class="font-semibold text-gray-800">Console Output</h4>
                <span class="text-sm text-gray-500">Program execution results</span>
              </div>
              
              <div class="output-container">
                <div class="output-content">
                  {#if outputs[index]}
                    <pre class="output-text">{outputs[index]}</pre>
                  {:else}
                    <span class="output-placeholder">Click "Run Code" to see output</span>
                  {/if}
                </div>
              </div>
              
              {#if showHints[index]}
                <div class="hint-container">
                  <div class="hint-header">
                    <span class="hint-icon">💡</span>
                    <span class="hint-label">Hint</span>
                  </div>
                  <p class="hint-text">{exercise.hint}</p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

