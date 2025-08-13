<script lang="ts">
  import { onMount } from 'svelte';
  import HighlightedCodeExample from '../HighlightedCodeExample.svelte';
  import CodeMirrorEditor from '../CodeMirrorEditor.svelte';

  let sectionElement: HTMLElement;
  let selectedTab = 'if';
  let codeInput = `fn main() {
    let number = 6;
    
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}`;
  let output = '';
  let isRunning = false;

  const codeExamples = {
    if: `fn main() {
    let number = 6;
    
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}`,
    loop: `fn main() {
    let mut counter = 0;
    
    let result = loop {
        counter += 1;
        
        if counter == 10 {
            break counter * 2;
        }
    };
    
    println!("The result is {}", result);
}`,
    while: `fn main() {
    let mut number = 3;
    
    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }
    
    println!("LIFTOFF!!!");
}`,
    for: `fn main() {
    let a = [10, 20, 30, 40, 50];
    
    for element in a {
        println!("the value is: {}", element);
    }
    
    // Range example
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");
}`
  };

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  function handleCodeChange(event: CustomEvent<string>) {
    codeInput = event.detail;
  }

  function switchTab(tab: string) {
    selectedTab = tab;
    codeInput = codeExamples[tab] || codeExamples.if;
    output = '';
  }

  function runCode() {
    isRunning = true;
    output = '';
    
    setTimeout(() => {
      if (selectedTab === 'if') {
        output = 'number is divisible by 2';
      } else if (selectedTab === 'loop') {
        output = 'The result is 20';
      } else if (selectedTab === 'while') {
        output = '3!\n2!\n1!\nLIFTOFF!!!';
      } else if (selectedTab === 'for') {
        output = 'the value is: 10\nthe value is: 20\nthe value is: 30\nthe value is: 40\nthe value is: 50\n3!\n2!\n1!\nLIFTOFF!!!';
      }
      isRunning = false;
    }, 1000);
  }

  function resetCode() {
    codeInput = codeExamples[selectedTab] || codeExamples.if;
    output = '';
  }
</script>

<div bind:this={sectionElement} class="section-content">
  <div class="section-header">
    <h3 class="text-3xl text-rust-primary font-bold mb-4">🔀 Control Flow</h3>
    <p class="text-gray-600 mb-8">Control the execution path of your programs</p>
  </div>

  <div class="content-grid">
    <!-- Control Flow Overview -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Control Flow Constructs</h4>
      <div class="constructs-grid">
        <div class="construct-card">
          <div class="construct-icon">🤔</div>
          <h5 class="font-medium text-gray-800">if/else</h5>
          <p class="text-sm text-gray-600">Make decisions based on conditions</p>
        </div>
        
        <div class="construct-card">
          <div class="construct-icon">🔄</div>
          <h5 class="font-medium text-gray-800">loop</h5>
          <p class="text-sm text-gray-600">Infinite loops with break/continue</p>
        </div>
        
        <div class="construct-card">
          <div class="construct-icon">⏰</div>
          <h5 class="font-medium text-gray-800">while</h5>
          <p class="text-sm text-gray-600">Loop while condition is true</p>
        </div>
        
        <div class="construct-card">
          <div class="construct-icon">📋</div>
          <h5 class="font-medium text-gray-800">for</h5>
          <p class="text-sm text-gray-600">Iterate over collections and ranges</p>
        </div>
      </div>
    </div>

    <!-- Interactive Examples -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Interactive Examples</h4>
      
      <div class="tab-container">
        <div class="tab-header">
          <button 
            class="tab-button" 
            class:active={selectedTab === 'if'}
            on:click={() => switchTab('if')}
          >
            🤔 if/else
          </button>
          <button 
            class="tab-button" 
            class:active={selectedTab === 'loop'}
            on:click={() => switchTab('loop')}
          >
            🔄 loop
          </button>
          <button 
            class="tab-button" 
            class:active={selectedTab === 'while'}
            on:click={() => switchTab('while')}
          >
            ⏰ while
          </button>
          <button 
            class="tab-button" 
            class:active={selectedTab === 'for'}
            on:click={() => switchTab('for')}
          >
            📋 for
          </button>
        </div>

        <div class="tab-content">
          <div class="code-workspace">
            <div class="editor-section">
              <div class="editor-container">
                <CodeMirrorEditor 
                  bind:code={codeInput}
                  language="rust"
                  placeholder="Experiment with control flow..."
                  fileName="control_flow.rs"
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
                  <button on:click={resetCode} class="reset-button">
                    🔄 Reset
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
                    <span class="text-gray-500">Run the code to see output</span>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- if Expressions -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">if Expressions</h4>
      <div class="space-y-4">
        <HighlightedCodeExample 
          title="Basic if/else"
          code={`if condition {
    // do something
} else {
    // do something else
}`}
        />
        
        <HighlightedCodeExample 
          title="if is an expression"
          code={`let number = if condition { 5 } else { 6 };`}
          explanation="Both arms must return the same type"
        />
        
        <HighlightedCodeExample 
          title="Multiple conditions"
          code={`if number % 4 == 0 {
    println!("divisible by 4");
} else if number % 3 == 0 {
    println!("divisible by 3");
} else {
    println!("not divisible by 4 or 3");
}`}
        />
        
        <div class="note-box">
          <h6 class="font-medium text-blue-800 mb-1">💡 Note</h6>
          <p class="text-sm text-blue-700">Conditions must be <code class="inline-code">bool</code>. Rust won't automatically convert other types to boolean.</p>
        </div>
      </div>
    </div>

    <!-- Loops -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Loops</h4>
      <div class="space-y-4">
        <div class="loop-type">
          <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <span class="text-lg">🔄</span> loop
          </h5>
          <HighlightedCodeExample 
            code={`loop {
    println!("again!");
    break; // Exit the loop
}`}
            explanation="Infinite loop until explicit break"
          />
        </div>
        
        <div class="loop-type">
          <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <span class="text-lg">⏰</span> while
          </h5>
          <HighlightedCodeExample 
            code={`while condition {
    // loop body
}`}
            explanation="Loop while condition is true"
          />
        </div>
        
        <div class="loop-type">
          <h5 class="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <span class="text-lg">📋</span> for
          </h5>
          <HighlightedCodeExample 
            code={`for item in collection {
    // process item
}`}
            explanation="Iterate over collections safely"
          />
        </div>
      </div>
    </div>

    <!-- Loop Control -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Loop Control</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="control-section">
          <h5 class="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span class="text-xl">🛑</span> break
          </h5>
          <HighlightedCodeExample 
            code={`loop {
    if condition {
        break;
    }
}`}
            explanation="Exit the loop immediately"
          />
        </div>

        <div class="control-section">
          <h5 class="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span class="text-xl">⏭️</span> continue
          </h5>
          <HighlightedCodeExample 
            code={`for i in 0..10 {
    if i % 2 == 0 {
        continue;
    }
    println!("{}", i);
}`}
            explanation="Skip to next iteration"
          />
        </div>

        <div class="control-section">
          <h5 class="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <span class="text-xl">↩️</span> Return from loop
          </h5>
          <HighlightedCodeExample 
            code={`let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;
    }
};`}
            explanation="Return a value from loop"
          />
        </div>
      </div>
    </div>

    <!-- for Loop Details -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">for Loop Patterns</h4>
      <div class="patterns-grid">
        <div class="pattern-card">
          <HighlightedCodeExample 
            title="Iterate over array"
            code={`let a = [10, 20, 30, 40, 50];
for element in a {
    println!("{}", element);
}`}
          />
        </div>
        
        <div class="pattern-card">
          <HighlightedCodeExample 
            title="Range (exclusive)"
            code={`for i in 0..5 {
    println!("{}", i); // 0,1,2,3,4
}`}
          />
        </div>
        
        <div class="pattern-card">
          <HighlightedCodeExample 
            title="Range (inclusive)"
            code={`for i in 0..=5 {
    println!("{}", i); // 0,1,2,3,4,5
}`}
          />
        </div>
        
        <div class="pattern-card">
          <HighlightedCodeExample 
            title="Reverse range"
            code={`for i in (1..4).rev() {
    println!("{}", i); // 3,2,1
}`}
          />
        </div>
        
        <div class="pattern-card">
          <HighlightedCodeExample 
            title="With index"
            code={`let a = ["a", "b", "c"];
for (i, item) in a.iter().enumerate() {
    println!("{}: {}", i, item);
}`}
          />
        </div>
        
        <div class="pattern-card">
          <HighlightedCodeExample 
            title="Step by"
            code={`for i in (0..10).step_by(2) {
    println!("{}", i); // 0,2,4,6,8
}`}
          />
        </div>
      </div>
    </div>

    <!-- Practice Exercises -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Practice Exercises</h4>
      <div class="exercises-grid">
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 1: FizzBuzz</h5>
          <p class="text-sm text-gray-600 mb-3">
            Print numbers 1-15. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", 
            for multiples of both print "FizzBuzz".
          </p>
          <HighlightedCodeExample 
            code={`for i in 1..=15 {
    // Your code here
}`}
          />
        </div>
        
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 2: Temperature Converter</h5>
          <p class="text-sm text-gray-600 mb-3">
            Convert temperatures between Fahrenheit and Celsius using if expressions.
          </p>
          <HighlightedCodeExample 
            code={`let temp_f = 32;
let temp_c = if /* condition */ {
    // conversion formula
} else {
    // handle invalid input
};`}
          />
        </div>
        
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 3: Fibonacci</h5>
          <p class="text-sm text-gray-600 mb-3">
            Generate the first 10 Fibonacci numbers using a loop.
          </p>
          <HighlightedCodeExample 
            code={`let mut a = 0;
let mut b = 1;
// Use a loop to generate sequence`}
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

  .constructs-grid {
    @apply grid grid-cols-1 md:grid-cols-4 gap-4;
  }

  .construct-card {
    @apply p-4 bg-white rounded border border-gray-200 text-center;
  }

  .construct-icon {
    @apply text-2xl mb-2;
  }

  .tab-container {
    @apply bg-white rounded-lg overflow-hidden border border-gray-200;
  }

  .tab-header {
    @apply flex bg-gray-100 border-b border-gray-200;
  }

  .tab-button {
    @apply px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-colors flex-1 text-center;
  }

  .tab-button.active {
    @apply bg-white text-rust-primary border-b-2 border-rust-primary;
  }

  .tab-content {
    @apply p-6;
  }

  .code-workspace {
    @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
  }

  .editor-container {
    @apply bg-gray-800 rounded-lg overflow-hidden;
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
    @apply p-4 font-mono text-sm min-h-32 bg-gray-800;
  }

  .note-box {
    @apply p-3 bg-blue-50 rounded border border-blue-200;
  }

  .loop-type {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .control-section {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .patterns-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
  }

  .pattern-card {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .exercises-grid {
    @apply grid grid-cols-1 md:grid-cols-3 gap-6;
  }

  .exercise-card {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .inline-code {
    @apply bg-gray-100 px-1 py-0.5 rounded font-mono text-xs;
  }
</style>