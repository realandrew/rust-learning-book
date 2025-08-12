<script lang="ts">
  import { onMount } from 'svelte';
  import HighlightedCodeExample from '../HighlightedCodeExample.svelte';

  let sectionElement: HTMLElement;
  let codeInput = `fn main() {
    println!("Hello, world!");
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
    
    // Simulate compilation and execution
    setTimeout(() => {
      if (codeInput.includes('println!("Hello, world!")')) {
        output = 'Hello, world!';
      } else if (codeInput.includes('println!')) {
        const match = codeInput.match(/println!\("([^"]+)"\)/);
        output = match ? match[1] : 'Output would appear here';
      } else {
        output = 'No output (did you forget println!?)';
      }
      isRunning = false;
    }, 1000);
  }

  function resetCode() {
    codeInput = `fn main() {
    println!("Hello, world!");
}`;
    output = '';
  }
</script>

<div bind:this={sectionElement} class="section-content">
  <div class="section-header">
    <h3 class="text-3xl text-rust-primary font-bold mb-4">👋 Hello, World!</h3>
    <p class="text-gray-600 mb-8">Your first Rust program</p>
  </div>

  <div class="content-grid">
    <!-- Code Editor -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Interactive Code Editor</h4>
      <div class="editor-container">
        <div class="editor-header">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-400 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span class="text-sm text-gray-500">main.rs</span>
        </div>
        
        <textarea
          bind:value={codeInput}
          class="code-editor"
          placeholder="Write your Rust code here..."
          rows="8"
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

    <!-- Output and Explanation -->
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
        <h5 class="font-medium text-gray-800 mb-3">Understanding the Code</h5>
        <div class="space-y-3">
          <div class="explanation-item">
            <code class="code-highlight">fn main()</code>
            <p class="text-sm text-gray-600">Defines the main function - entry point of your program</p>
          </div>
          
          <div class="explanation-item">
            <code class="code-highlight">println!</code>
            <p class="text-sm text-gray-600">A macro that prints text to the console with a newline</p>
          </div>
          
          <div class="explanation-item">
            <code class="code-highlight">!</code>
            <p class="text-sm text-gray-600">The exclamation mark indicates this is a macro, not a function</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Creating and Running -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Creating and Running Your First Program</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="steps-container">
          <h5 class="font-medium text-gray-800 mb-3">Method 1: Using rustc directly</h5>
          <div class="space-y-3">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <p class="text-sm">Create a file called <code class="bg-gray-100 px-1 rounded">main.rs</code></p>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <p class="text-sm">Add the Hello World code above</p>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <p class="text-sm mb-2">Compile:</p>
                <HighlightedCodeExample 
                  code="rustc main.rs"
                  language="bash"
                  isTerminal={true}
                />
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">4</div>
              <div class="step-content">
                <p class="text-sm mb-2">Run:</p>
                <HighlightedCodeExample 
                  code="./main"
                  language="bash"
                  isTerminal={true}
                  explanation="On Windows use: main.exe"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="steps-container">
          <h5 class="font-medium text-gray-800 mb-3">Method 2: Using Cargo (recommended)</h5>
          <div class="space-y-3">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <p class="text-sm mb-2">Create project:</p>
                <HighlightedCodeExample 
                  code="cargo new hello_world"
                  language="bash"
                  isTerminal={true}
                />
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <p class="text-sm mb-2">Navigate:</p>
                <HighlightedCodeExample 
                  code="cd hello_world"
                  language="bash"
                  isTerminal={true}
                />
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <p class="text-sm">Edit <code class="bg-gray-100 px-1 rounded">src/main.rs</code> with your code</p>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">4</div>
              <div class="step-content">
                <p class="text-sm mb-2">Run:</p>
                <HighlightedCodeExample 
                  code="cargo run"
                  language="bash"
                  isTerminal={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Try It Yourself -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Try It Yourself</h4>
      <div class="challenges-grid">
        <div class="challenge-card">
          <h5 class="font-medium text-gray-800 mb-2">Challenge 1</h5>
          <p class="text-sm text-gray-600 mb-3">Change the message to print your name</p>
          <HighlightedCodeExample 
            code='println!("Hello, [Your Name]!");'
            language="rust"
          />
        </div>
        
        <div class="challenge-card">
          <h5 class="font-medium text-gray-800 mb-2">Challenge 2</h5>
          <p class="text-sm text-gray-600 mb-3">Print multiple lines</p>
          <HighlightedCodeExample 
            code='println!("Line 1");
println!("Line 2");'
            language="rust"
          />
        </div>
        
        <div class="challenge-card">
          <h5 class="font-medium text-gray-800 mb-2">Challenge 3</h5>
          <p class="text-sm text-gray-600 mb-3">Try print! instead of println!</p>
          <HighlightedCodeExample 
            code='print!("Hello, ");
print!("world!");'
            language="rust"
          />
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

  .explanation-item {
    @apply flex items-start gap-3 p-3 bg-white rounded border border-gray-200;
  }

  .code-highlight {
    @apply bg-rust-primary text-white px-2 py-1 rounded text-xs font-mono flex-shrink-0;
  }

  .step-item {
    @apply flex items-start gap-3;
  }

  .step-number {
    @apply w-6 h-6 bg-rust-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1;
  }

  .step-content {
    @apply flex-1;
  }

  .steps-container {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .challenges-grid {
    @apply grid grid-cols-1 md:grid-cols-3 gap-4;
  }

  .challenge-card {
    @apply p-4 bg-white rounded border border-gray-200;
  }
</style>