<script lang="ts">
  import { onMount } from 'svelte';
  import HighlightedCodeExample from '../HighlightedCodeExample.svelte';

  let sectionElement: HTMLElement;
  let codeInput = `fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    
    // This will cause an error - uncomment to try:
    // x = 6;
    
    // To make x mutable:
    let mut y = 5;
    println!("The value of y is: {}", y);
    y = 6;
    println!("The value of y is: {}", y);
}`;
  let output = '';
  let isRunning = false;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  function runCode() {
    isRunning = true;
    output = '';
    
    setTimeout(() => {
      if (codeInput.includes('let x = 5') && codeInput.includes('println!("The value of x is: {}", x)')) {
        output = 'The value of x is: 5\nThe value of y is: 5\nThe value of y is: 6';
      } else if (codeInput.includes('x = 6') && !codeInput.includes('let mut')) {
        output = 'error[E0384]: cannot assign twice to immutable variable `x`';
      } else {
        output = 'Compile and run your code to see the output';
      }
      isRunning = false;
    }, 1000);
  }

  function resetCode() {
    codeInput = `fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    
    // This will cause an error - uncomment to try:
    // x = 6;
    
    // To make x mutable:
    let mut y = 5;
    println!("The value of y is: {}", y);
    y = 6;
    println!("The value of y is: {}", y);
}`;
    output = '';
  }
</script>

<div bind:this={sectionElement} class="section-content">
  <div class="section-header">
    <h3 class="text-3xl text-rust-primary font-bold mb-4">🔤 Variables and Mutability</h3>
    <p class="text-gray-600 mb-8">Understanding Rust's variable system and immutability by default</p>
  </div>

  <div class="content-grid">
    <!-- Interactive Editor -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Try Variables</h4>
      <div class="editor-container">
        <div class="editor-header">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-400 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span class="text-sm text-gray-500">variables.rs</span>
        </div>
        
        <textarea
          bind:value={codeInput}
          class="code-editor"
          placeholder="Experiment with variables..."
          rows="12"
        ></textarea>
        
        <div class="editor-actions">
          <button on:click={runCode} disabled={isRunning} class="run-button">
            {#if isRunning}
              <span class="animate-spin">⚙️</span> Running...
            {:else}
              ▶️ Run Code
            {/if}
          </button>
          <button on:click={resetCode} class="reset-button">
            🔄 Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Output and Rules -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Output</h4>
      <div class="output-container">
        <div class="output-header">
          <span class="text-sm text-gray-500">Console Output</span>
        </div>
        <div class="output-content">
          {#if output}
            <pre class="text-green-400">{output}</pre>
          {:else}
            <span class="text-gray-500">Click "Run Code" to see output</span>
          {/if}
        </div>
      </div>

      <div class="mt-6">
        <h5 class="font-medium text-gray-800 mb-3">Key Rules</h5>
        <div class="space-y-3">
          <div class="rule-item">
            <span class="rule-icon">🔒</span>
            <div>
              <h6 class="font-medium text-gray-800">Variables are immutable by default</h6>
              <p class="text-sm text-gray-600">Once assigned, you cannot change the value</p>
            </div>
          </div>
          
          <div class="rule-item">
            <span class="rule-icon">🔓</span>
            <div>
              <h6 class="font-medium text-gray-800">Use <code class="inline-code">mut</code> for mutability</h6>
              <p class="text-sm text-gray-600">Add <code class="inline-code">mut</code> keyword to allow changes</p>
            </div>
          </div>
          
          <div class="rule-item">
            <span class="rule-icon">🎭</span>
            <div>
              <h6 class="font-medium text-gray-800">Shadowing is allowed</h6>
              <p class="text-sm text-gray-600">You can declare a new variable with the same name</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Concepts Deep Dive -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Understanding Variables</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="concept-card">
          <h5 class="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span class="text-xl">🔒</span> Immutable Variables
          </h5>
          <HighlightedCodeExample 
            code="let x = 5;"
            language="rust"
          />
          <ul class="concept-list">
            <li>Cannot be changed after assignment</li>
            <li>Prevents accidental mutations</li>
            <li>Enables compiler optimizations</li>
            <li>Makes code more predictable</li>
          </ul>
        </div>

        <div class="concept-card">
          <h5 class="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span class="text-xl">🔓</span> Mutable Variables
          </h5>
          <HighlightedCodeExample 
            code={`let mut x = 5;\nx = 6;`}
            language="rust"
          />
          <ul class="concept-list">
            <li>Can be changed after assignment</li>
            <li>Must explicitly declare with <code class="inline-code">mut</code></li>
            <li>Useful for data that needs to change</li>
            <li>Type must remain the same</li>
          </ul>
        </div>

        <div class="concept-card">
          <h5 class="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span class="text-xl">🎭</span> Shadowing
          </h5>
          <HighlightedCodeExample 
            code={`let x = 5;\nlet x = "hello";`}
            language="rust"
          />
          <ul class="concept-list">
            <li>Declare new variable with same name</li>
            <li>Can change type</li>
            <li>Previous variable is "shadowed"</li>
            <li>Different from mutation</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Constants vs Variables -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Constants vs Variables</h4>
      <div class="comparison-table">
        <div class="comparison-header">
          <div class="comparison-col">Feature</div>
          <div class="comparison-col">Variables</div>
          <div class="comparison-col">Constants</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-col font-medium">Declaration</div>
          <div class="comparison-col"><code class="inline-code">let x = 5;</code></div>
          <div class="comparison-col"><code class="inline-code">const X: i32 = 5;</code></div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-col font-medium">Mutability</div>
          <div class="comparison-col">Can use <code class="inline-code">mut</code></div>
          <div class="comparison-col">Always immutable</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-col font-medium">Type annotation</div>
          <div class="comparison-col">Optional</div>
          <div class="comparison-col">Required</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-col font-medium">Scope</div>
          <div class="comparison-col">Block scope</div>
          <div class="comparison-col">Global scope</div>
        </div>
        
        <div class="comparison-row">
          <div class="comparison-col font-medium">Evaluation</div>
          <div class="comparison-col">Runtime</div>
          <div class="comparison-col">Compile time</div>
        </div>
      </div>
    </div>

    <!-- Practice Exercises -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Practice Exercises</h4>
      <div class="exercises-grid">
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 1: Fix the Error</h5>
          <div class="mb-3">
            <HighlightedCodeExample 
              code={`let x = 5;\nx = 10; // Error!`}
              language="rust"
            />
          </div>
          <p class="text-sm text-gray-600">Make this code compile by allowing x to be mutable.</p>
        </div>
        
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 2: Shadowing</h5>
          <div class="mb-3">
            <HighlightedCodeExample 
              code={`let spaces = "   ";\nlet spaces = spaces.len();`}
              language="rust"
            />
          </div>
          <p class="text-sm text-gray-600">What is the type and value of spaces after the second declaration?</p>
        </div>
        
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 3: Constants</h5>
          <div class="mb-3">
            <HighlightedCodeExample 
              code="const MAX_POINTS: u32 = 100_000;"
              language="rust"
            />
          </div>
          <p class="text-sm text-gray-600">Create a constant for the number of seconds in a day.</p>
        </div>
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

  .editor-container {
    @apply bg-gray-800 rounded-lg overflow-hidden;
  }

  .editor-header {
    @apply flex items-center justify-between px-4 py-2 bg-gray-700;
  }

  .code-editor {
    @apply w-full bg-gray-800 text-green-400 font-mono text-sm p-4 border-none outline-none resize-none;
  }

  .editor-actions {
    @apply flex gap-2 p-3 bg-gray-700;
  }

  .run-button {
    @apply px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium text-sm disabled:opacity-50;
  }

  .reset-button {
    @apply px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-medium text-sm;
  }

  .output-container {
    @apply bg-gray-800 rounded-lg overflow-hidden;
  }

  .output-header {
    @apply px-4 py-2 bg-gray-700 border-b border-gray-600;
  }

  .output-content {
    @apply p-4 font-mono text-sm min-h-24 bg-gray-800;
  }

  .rule-item {
    @apply flex items-start gap-3 p-3 bg-white rounded border border-gray-200;
  }

  .rule-icon {
    @apply text-xl flex-shrink-0;
  }

  .inline-code {
    @apply bg-gray-100 px-1 py-0.5 rounded font-mono text-xs;
  }

  .concept-card {
    @apply p-4 bg-white rounded border border-gray-200;
  }


  .concept-list {
    @apply space-y-1 text-sm text-gray-600;
  }

  .concept-list li {
    @apply flex items-start gap-2;
  }

  .concept-list li::before {
    @apply content-['•'] text-rust-primary font-bold flex-shrink-0 mt-0.5;
  }

  .comparison-table {
    @apply bg-white rounded border border-gray-200 overflow-hidden;
  }

  .comparison-header {
    @apply grid grid-cols-3 bg-gray-100 border-b border-gray-200;
  }

  .comparison-row {
    @apply grid grid-cols-3 border-b border-gray-100 last:border-b-0;
  }

  .comparison-col {
    @apply p-3 text-sm;
  }

  .comparison-header .comparison-col {
    @apply font-semibold text-gray-800;
  }

  .exercises-grid {
    @apply grid grid-cols-1 md:grid-cols-3 gap-4;
  }

  .exercise-card {
    @apply p-4 bg-white rounded border border-gray-200;
  }
</style>