<script lang="ts">
  import { onMount } from 'svelte';
  import HighlightedCodeExample from '../HighlightedCodeExample.svelte';
  import CodeMirrorEditor from '../CodeMirrorEditor.svelte';

  let sectionElement: HTMLElement;
  let currentExercise = 0;
  
  const exercises = [
    {
      title: "Basic Function",
      description: "Write a function that takes two parameters and returns their sum",
      starter: `fn main() {
    let result = add_numbers(5, 3);
    println!("Result: {}", result);
}

// TODO: Implement the add_numbers function
`,
      solution: `fn main() {
    let result = add_numbers(5, 3);
    println!("Result: {}", result);
}

fn add_numbers(x: i32, y: i32) -> i32 {
    x + y
}`,
      output: "Result: 8"
    },
    {
      title: "Function with No Return",
      description: "Write a function that prints a greeting message",
      starter: `fn main() {
    greet_user("Alice");
}

// TODO: Implement the greet_user function
`,
      solution: `fn main() {
    greet_user("Alice");
}

fn greet_user(name: &str) {
    println!("Hello, {}! Welcome to Rust!", name);
}`,
      output: "Hello, Alice! Welcome to Rust!"
    },
    {
      title: "Expression vs Statement",
      description: "Complete the function to return the larger of two numbers",
      starter: `fn main() {
    let result = max_number(10, 7);
    println!("Max: {}", result);
}

fn max_number(a: i32, b: i32) -> i32 {
    // TODO: Return the larger number using an if expression
}`,
      solution: `fn main() {
    let result = max_number(10, 7);
    println!("Max: {}", result);
}

fn max_number(a: i32, b: i32) -> i32 {
    if a > b {
        a
    } else {
        b
    }
}`,
      output: "Max: 10"
    }
  ];

  let userCode = exercises[0].starter;
  let output = '';
  let showSolution = false;
  let isRunning = false;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  function handleCodeChange(event: CustomEvent<string>) {
    userCode = event.detail;
  }

  function nextExercise() {
    if (currentExercise < exercises.length - 1) {
      currentExercise++;
      userCode = exercises[currentExercise].starter;
      output = '';
      showSolution = false;
    }
  }

  function prevExercise() {
    if (currentExercise > 0) {
      currentExercise--;
      userCode = exercises[currentExercise].starter;
      output = '';
      showSolution = false;
    }
  }

  function runCode() {
    isRunning = true;
    output = '';
    
    setTimeout(() => {
      const exercise = exercises[currentExercise];
      if (userCode.includes('fn add_numbers') && userCode.includes('x + y')) {
        output = exercise.output;
      } else if (userCode.includes('fn greet_user') && userCode.includes('println!')) {
        output = exercise.output;
      } else if (userCode.includes('if a > b')) {
        output = exercise.output;
      } else if (userCode.includes('TODO')) {
        output = 'Complete the TODO to see output';
      } else {
        output = 'Check your function implementation';
      }
      isRunning = false;
    }, 1000);
  }

  function toggleSolution() {
    showSolution = !showSolution;
    if (showSolution) {
      userCode = exercises[currentExercise].solution;
    } else {
      userCode = exercises[currentExercise].starter;
    }
    output = '';
  }
</script>

<div bind:this={sectionElement} class="section-content">
  <div class="section-header">
    <h3 class="text-3xl text-rust-primary font-bold mb-4">⚡ Functions</h3>
    <p class="text-gray-600 mb-8">Building blocks of Rust programs</p>
  </div>

  <div class="content-grid">
    <!-- Function Anatomy -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Function Anatomy</h4>
      <div class="anatomy-diagram">
        <div class="code-example">
          <pre><code><span class="highlight-keyword">fn</span> <span class="highlight-name">function_name</span>(<span class="highlight-param">param: Type</span>) <span class="highlight-return">-> ReturnType</span> &#123;
    <span class="highlight-body">// function body</span>
    <span class="highlight-expression">expression</span>
&#125;</code></pre>
        </div>
        
        <div class="anatomy-labels">
          <div class="label-item">
            <span class="label-color keyword"></span>
            <span class="label-text">Keyword to declare function</span>
          </div>
          <div class="label-item">
            <span class="label-color name"></span>
            <span class="label-text">Function name (snake_case)</span>
          </div>
          <div class="label-item">
            <span class="label-color param"></span>
            <span class="label-text">Parameters with types</span>
          </div>
          <div class="label-item">
            <span class="label-color return"></span>
            <span class="label-text">Return type (optional)</span>
          </div>
          <div class="label-item">
            <span class="label-color expression"></span>
            <span class="label-text">Return value (no semicolon)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Function Examples -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Common Patterns</h4>
      <div class="space-y-4">
        <HighlightedCodeExample 
          title="No parameters, no return"
          code={`fn say_hello() {
    println!("Hello!");
}`}
        />
        
        <HighlightedCodeExample 
          title="With parameters"
          code={`fn greet(name: &str) {
    println!("Hello, {}!", name);
}`}
        />
        
        <HighlightedCodeExample 
          title="With return value"
          code={`fn add(x: i32, y: i32) -> i32 {
    x + y
}`}
          fileName="math.rs"
        />
        
        <HighlightedCodeExample 
          title="Early return"
          code={`fn divide(x: f64, y: f64) -> f64 {
    if y == 0.0 {
        return 0.0;
    }
    x / y
}`}
        />
      </div>
    </div>

    <!-- Interactive Exercise -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Practice: Function Exercises</h4>
      
      <div class="exercise-header">
        <div class="exercise-info">
          <h5 class="font-medium text-gray-800">Exercise {currentExercise + 1} of {exercises.length}: {exercises[currentExercise].title}</h5>
          <p class="text-sm text-gray-600">{exercises[currentExercise].description}</p>
        </div>
        
        <div class="exercise-controls">
          <button on:click={prevExercise} disabled={currentExercise === 0} class="nav-button">
            ← Previous
          </button>
          <button on:click={nextExercise} disabled={currentExercise === exercises.length - 1} class="nav-button">
            Next →
          </button>
        </div>
      </div>

      <div class="exercise-workspace">
        <div class="code-section">
          <div class="editor-container">
            <CodeMirrorEditor 
              bind:code={userCode}
              language="rust"
              placeholder="Write your function here..."
              fileName="functions.rs"
              on:change={handleCodeChange}
            />
            
            <div class="editor-actions">
              <button on:click={runCode} disabled={isRunning} class="run-button">
                {#if isRunning}
                  <span class="animate-spin">⚙️</span> Running...
                {:else}
                  ▶️ Run Code
                {/if}
              </button>
              <button on:click={toggleSolution} class="solution-button">
                {showSolution ? '🙈 Hide Solution' : '💡 Show Solution'}
              </button>
            </div>
          </div>
        </div>

        <div class="output-section">
          <div class="output-container">
            <div class="output-header">
              <span class="text-sm text-gray-500">Console Output</span>
            </div>
            <div class="output-content">
              {#if output}
                <pre class="text-green-400">{output}</pre>
              {:else}
                <span class="text-gray-500">Run your code to see output</span>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statements vs Expressions -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Statements vs Expressions</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="concept-section">
          <h5 class="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span class="text-xl">📋</span> Statements
          </h5>
          <p class="text-sm text-gray-600 mb-4">Instructions that perform actions but don't return values</p>
          
          <div class="examples-list">
            <div class="example-item">
              <code class="example-code">let x = 5;</code>
              <span class="example-desc">Variable declaration</span>
            </div>
            
            <div class="example-item">
              <code class="example-code">fn main() &#123; &#125;</code>
              <span class="example-desc">Function definition</span>
            </div>
            
            <div class="example-item">
              <code class="example-code">return x;</code>
              <span class="example-desc">Early return statement</span>
            </div>
          </div>
        </div>

        <div class="concept-section">
          <h5 class="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span class="text-xl">🎯</span> Expressions
          </h5>
          <p class="text-sm text-gray-600 mb-4">Evaluate to values and can be used in other expressions</p>
          
          <div class="examples-list">
            <div class="example-item">
              <code class="example-code">5</code>
              <span class="example-desc">Literal value</span>
            </div>
            
            <div class="example-item">
              <code class="example-code">x + 1</code>
              <span class="example-desc">Math operation</span>
            </div>
            
            <div class="example-item">
              <code class="example-code">&#123; let x = 5; x &#125;</code>
              <span class="example-desc">Block expression</span>
            </div>
            
            <div class="example-item">
              <code class="example-code">if condition &#123; a &#125; else &#123; b &#125;</code>
              <span class="example-desc">Conditional expression</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="important-note">
        <h6 class="font-medium text-orange-800 mb-2">⚠️ Key Difference</h6>
        <p class="text-sm text-orange-700">
          Expressions don't end with semicolons when used as return values. 
          Adding a semicolon turns an expression into a statement!
        </p>
        <HighlightedCodeExample 
          code={`fn returns_five() -> i32 {
    5     // Expression: returns 5
}

fn returns_nothing() -> () {
    5;    // Statement: returns ()
}`}
        />
      </div>
    </div>

    <!-- Function Parameters -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Parameters & Arguments</h4>
      <div class="space-y-4">
        <HighlightedCodeExample 
          title="Multiple Parameters"
          code={`fn print_coordinates(x: i32, y: i32) {
    println!("Point: ({}, {})", x, y);
}`}
        />
        
        <HighlightedCodeExample 
          title="Type Annotations Required"
          code={`// ❌ Error: missing type
fn add(x, y) -> i32 { x + y }

// ✅ Correct
fn add(x: i32, y: i32) -> i32 { x + y }`}
        />
      </div>
    </div>

    <!-- Return Values -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Return Values</h4>
      <div class="space-y-4">
        <HighlightedCodeExample 
          title="Implicit Return"
          code={`fn add(x: i32, y: i32) -> i32 {
    x + y // No semicolon!
}`}
          explanation="Last expression is returned automatically"
        />
        
        <HighlightedCodeExample 
          title="Explicit Return"
          code={`fn add(x: i32, y: i32) -> i32 {
    return x + y; // Early return
}`}
          explanation="Use return for early returns"
        />
        
        <HighlightedCodeExample 
          title="Unit Type (No Return)"
          code={`fn print_hello() {
    println!("Hello!");
} // Returns () implicitly`}
          explanation="Functions without return type return ()"
        />
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .section-content {
    @apply space-y-8;
  }

  .section-header {
    @apply text-center;
  }

  .content-grid {
    @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
  }

  .content-card {
    @apply bg-gray-50 rounded-lg p-6 border border-gray-200;
  }

  .content-card.full-width {
    @apply lg:col-span-2;
  }

  .anatomy-diagram {
    @apply space-y-4;
  }


  .highlight-keyword {
    @apply text-purple-400;
  }

  .highlight-name {
    @apply text-blue-400;
  }

  .highlight-param {
    @apply text-yellow-400;
  }

  .highlight-return {
    @apply text-orange-400;
  }

  .highlight-body {
    @apply text-gray-400;
  }

  .highlight-expression {
    @apply text-green-400;
  }

  .anatomy-labels {
    @apply space-y-2;
  }

  .label-item {
    @apply flex items-center gap-3 text-sm;
  }

  .label-color {
    @apply w-4 h-4 rounded;
  }

  .label-color.keyword {
    @apply bg-purple-400;
  }

  .label-color.name {
    @apply bg-blue-400;
  }

  .label-color.param {
    @apply bg-yellow-400;
  }

  .label-color.return {
    @apply bg-orange-400;
  }

  .label-color.expression {
    @apply bg-green-400;
  }

  .label-text {
    @apply text-gray-700;
  }

  .exercise-header {
    @apply flex items-start justify-between mb-6 flex-wrap gap-4;
  }

  .exercise-controls {
    @apply flex gap-2;
  }

  .nav-button {
    @apply px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .exercise-workspace {
    @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
  }



  .editor-actions {
    @apply flex gap-2 p-3 bg-gray-700 rounded-b-lg;
  }

  .run-button {
    @apply px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium text-sm disabled:opacity-50;
  }

  .solution-button {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium text-sm;
  }

  .output-container {
    @apply bg-gray-800 rounded-lg overflow-hidden;
  }

  .output-header {
    @apply px-4 py-2 bg-gray-700 border-b border-gray-600;
  }

  .output-content {
    @apply p-4 font-mono text-sm min-h-32 bg-gray-800;
  }

  .concept-section {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .examples-list {
    @apply space-y-3;
  }

  .example-item {
    @apply flex items-start justify-between gap-3;
  }

  .example-code {
    @apply bg-gray-800 text-green-400 px-2 py-1 rounded font-mono text-xs flex-shrink-0;
  }

  .example-desc {
    @apply text-sm text-gray-600;
  }

  .important-note {
    @apply mt-6 p-4 bg-orange-50 rounded border border-orange-200;
  }

  /* Function anatomy diagram styling */
  .code-example {
    @apply bg-gray-900 rounded p-4 font-mono text-sm overflow-x-auto;
  }

  .code-example pre {
    @apply m-0 text-gray-100;
  }

  .code-example code {
    @apply text-gray-100;
  }


</style>