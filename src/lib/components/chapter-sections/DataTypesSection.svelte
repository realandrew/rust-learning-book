<script lang="ts">
  import { onMount } from 'svelte';
  import HighlightedCodeExample from '../HighlightedCodeExample.svelte';

  let sectionElement: HTMLElement;
  let selectedCategory = 'scalar';

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  const scalarTypes = [
    {
      name: 'Integer',
      description: 'Whole numbers without fractional parts',
      sizes: ['i8', 'i16', 'i32', 'i64', 'i128', 'isize', 'u8', 'u16', 'u32', 'u64', 'u128', 'usize'],
      example: 'let x: i32 = 42;',
      defaultType: 'i32'
    },
    {
      name: 'Floating Point',
      description: 'Numbers with decimal points',
      sizes: ['f32', 'f64'],
      example: 'let y: f64 = 3.14;',
      defaultType: 'f64'
    },
    {
      name: 'Boolean',
      description: 'True or false values',
      sizes: ['bool'],
      example: 'let is_rust_fun: bool = true;',
      defaultType: 'bool'
    },
    {
      name: 'Character',
      description: 'Single Unicode characters',
      sizes: ['char'],
      example: 'let letter: char = \'A\';',
      defaultType: 'char'
    }
  ];

  const compoundTypes = [
    {
      name: 'Tuple',
      description: 'Group multiple values of different types',
      example: 'let tup: (i32, f64, char) = (500, 6.4, \'y\');',
      access: 'tup.0, tup.1, tup.2'
    },
    {
      name: 'Array',
      description: 'Collection of same-type elements with fixed size',
      example: 'let arr: [i32; 5] = [1, 2, 3, 4, 5];',
      access: 'arr[0], arr[1], ...'
    }
  ];
</script>

<div bind:this={sectionElement} class="section-content">
  <div class="section-header">
    <h3 class="text-3xl text-rust-primary font-bold mb-4">🔢 Data Types</h3>
    <p class="text-gray-600 mb-8">Exploring Rust's rich type system</p>
  </div>

  <div class="content-grid">
    <!-- Type Categories -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Type Categories</h4>
      <div class="category-tabs">
        <button 
          class="tab-button" 
          class:active={selectedCategory === 'scalar'}
          on:click={() => selectedCategory = 'scalar'}
        >
          📊 Scalar Types
        </button>
        <button 
          class="tab-button" 
          class:active={selectedCategory === 'compound'}
          on:click={() => selectedCategory = 'compound'}
        >
          📦 Compound Types
        </button>
      </div>
    </div>

    {#if selectedCategory === 'scalar'}
      <!-- Scalar Types -->
      <div class="content-card full-width">
        <h4 class="text-xl font-semibold text-gray-800 mb-4">Scalar Types</h4>
        <p class="text-gray-600 mb-6">Scalar types represent single values</p>
        
        <div class="types-grid">
          {#each scalarTypes as type}
            <div class="type-card">
              <h5 class="font-semibold text-gray-800 mb-2">{type.name}</h5>
              <p class="text-sm text-gray-600 mb-4">{type.description}</p>
              
              <div class="mb-4">
                <HighlightedCodeExample 
                  code={type.example}
                  language="rust"
                  showLineNumbers={false}
                />
              </div>
              
              <div class="type-variants">
                <h6 class="text-sm font-medium text-gray-700 mb-2">Available Types:</h6>
                <div class="variants-grid">
                  {#each type.sizes as size}
                    <span 
                      class="variant-badge" 
                      class:default={size === type.defaultType}
                    >
                      {size}
                      {#if size === type.defaultType}
                        <span class="default-indicator">default</span>
                      {/if}
                    </span>
                  {/each}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Integer Details -->
      <div class="content-card">
        <h4 class="text-xl font-semibold text-gray-800 mb-4">Integer Types Detail</h4>
        <div class="integer-table">
          <div class="table-header">
            <div class="table-col">Type</div>
            <div class="table-col">Range</div>
            <div class="table-col">Size</div>
          </div>
          
          <div class="table-row">
            <div class="table-col font-mono">i8</div>
            <div class="table-col">-128 to 127</div>
            <div class="table-col">8 bits</div>
          </div>
          
          <div class="table-row">
            <div class="table-col font-mono">i16</div>
            <div class="table-col">-32,768 to 32,767</div>
            <div class="table-col">16 bits</div>
          </div>
          
          <div class="table-row">
            <div class="table-col font-mono">i32</div>
            <div class="table-col">-2³¹ to 2³¹-1</div>
            <div class="table-col">32 bits</div>
          </div>
          
          <div class="table-row">
            <div class="table-col font-mono">i64</div>
            <div class="table-col">-2⁶³ to 2⁶³-1</div>
            <div class="table-col">64 bits</div>
          </div>
          
          <div class="table-row">
            <div class="table-col font-mono">u32</div>
            <div class="table-col">0 to 2³²-1</div>
            <div class="table-col">32 bits (unsigned)</div>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <h6 class="font-medium text-blue-800 mb-1">💡 Tip</h6>
          <p class="text-sm text-blue-700">Use <code class="inline-code">isize</code> and <code class="inline-code">usize</code> for array indexing - they match your system's pointer size</p>
        </div>
      </div>

      <!-- Number Literals -->
      <div class="content-card">
        <h4 class="text-xl font-semibold text-gray-800 mb-4">Number Literals</h4>
        <div class="literals-examples">
          <div class="literal-item">
            <code class="literal-code">98_222</code>
            <span class="literal-desc">Decimal (underscore for readability)</span>
          </div>
          
          <div class="literal-item">
            <code class="literal-code">0xff</code>
            <span class="literal-desc">Hexadecimal</span>
          </div>
          
          <div class="literal-item">
            <code class="literal-code">0o77</code>
            <span class="literal-desc">Octal</span>
          </div>
          
          <div class="literal-item">
            <code class="literal-code">0b1111_0000</code>
            <span class="literal-desc">Binary</span>
          </div>
          
          <div class="literal-item">
            <code class="literal-code">b'A'</code>
            <span class="literal-desc">Byte (u8 only)</span>
          </div>
          
          <div class="literal-item">
            <code class="literal-code">57u8</code>
            <span class="literal-desc">Type suffix</span>
          </div>
        </div>
      </div>
    {:else}
      <!-- Compound Types -->
      <div class="content-card full-width">
        <h4 class="text-xl font-semibold text-gray-800 mb-4">Compound Types</h4>
        <p class="text-gray-600 mb-6">Compound types group multiple values into one type</p>
        
        <div class="compound-grid">
          {#each compoundTypes as type}
            <div class="compound-card">
              <h5 class="font-semibold text-gray-800 mb-2">{type.name}</h5>
              <p class="text-sm text-gray-600 mb-4">{type.description}</p>
              
              <div class="mb-3">
                <HighlightedCodeExample 
                  code={type.example}
                  language="rust"
                  showLineNumbers={false}
                />
              </div>
              
              <div class="access-info">
                <h6 class="text-sm font-medium text-gray-700 mb-1">Access elements:</h6>
                <code class="text-xs bg-gray-100 p-1 rounded">{type.access}</code>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Tuple Deep Dive -->
      <div class="content-card">
        <h4 class="text-xl font-semibold text-gray-800 mb-4">Tuples in Detail</h4>
        <div class="space-y-4">
          <div class="example-section">
            <h6 class="font-medium text-gray-800 mb-2">Creating tuples:</h6>
            <HighlightedCodeExample 
              code="let tup: (i32, f64, u8) = (500, 6.4, 1);"
              language="rust"
              showLineNumbers={false}
            />
          </div>
          
          <div class="example-section">
            <h6 class="font-medium text-gray-800 mb-2">Destructuring:</h6>
            <HighlightedCodeExample 
              code="let (x, y, z) = tup;"
              language="rust"
              showLineNumbers={false}
            />
          </div>
          
          <div class="example-section">
            <h6 class="font-medium text-gray-800 mb-2">Accessing by index:</h6>
            <HighlightedCodeExample 
              code={`let five_hundred = tup.0;\nlet six_point_four = tup.1;`}
              language="rust"
              showLineNumbers={false}
            />
          </div>
          
          <div class="example-section">
            <h6 class="font-medium text-gray-800 mb-2">Unit tuple (empty):</h6>
            <HighlightedCodeExample 
              code={'let unit = (); // Represents "no value"'}
              language="rust"
              showLineNumbers={false}
            />
          </div>
        </div>
      </div>

      <!-- Array Deep Dive -->
      <div class="content-card">
        <h4 class="text-xl font-semibold text-gray-800 mb-4">Arrays in Detail</h4>
        <div class="space-y-4">
          <div class="example-section">
            <h6 class="font-medium text-gray-800 mb-2">Creating arrays:</h6>
            <HighlightedCodeExample 
              code={`let a = [1, 2, 3, 4, 5];\nlet b: [i32; 5] = [1, 2, 3, 4, 5];`}
              language="rust"
              showLineNumbers={false}
            />
          </div>
          
          <div class="example-section">
            <h6 class="font-medium text-gray-800 mb-2">Initialize with same value:</h6>
            <HighlightedCodeExample 
              code="let a = [3; 5]; // [3, 3, 3, 3, 3]"
              language="rust"
              showLineNumbers={false}
            />
          </div>
          
          <div class="example-section">
            <h6 class="font-medium text-gray-800 mb-2">Accessing elements:</h6>
            <HighlightedCodeExample 
              code={`let first = a[0];\nlet second = a[1];`}
              language="rust"
              showLineNumbers={false}
            />
          </div>
          
          <div class="warning-box">
            <h6 class="font-medium text-red-800 mb-1">⚠️ Important</h6>
            <p class="text-sm text-red-700">Arrays have fixed size and are stack-allocated. For dynamic arrays, use <code class="inline-code">Vec&lt;T&gt;</code></p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Type Inference -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Type Inference</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="inference-section">
          <h5 class="font-medium text-gray-800 mb-3">Explicit Type Annotation</h5>
          <div class="mb-3">
            <HighlightedCodeExample 
              code={`let x: i32 = 5;\nlet y: f64 = 3.14;\nlet z: bool = true;`}
              language="rust"
            />
          </div>
          <p class="text-sm text-gray-600">Explicitly tell Rust what type to use</p>
        </div>
        
        <div class="inference-section">
          <h5 class="font-medium text-gray-800 mb-3">Type Inference</h5>
          <div class="mb-3">
            <HighlightedCodeExample 
              code={`let x = 5;      // i32 (default)\nlet y = 3.14;   // f64 (default)\nlet z = true;   // bool`}
              language="rust"
            />
          </div>
          <p class="text-sm text-gray-600">Let Rust figure out the type from usage</p>
        </div>
      </div>
      
      <div class="mt-6 p-4 bg-green-50 rounded border border-green-200">
        <h6 class="font-medium text-green-800 mb-2">💡 Best Practice</h6>
        <p class="text-sm text-green-700">Use type inference when the type is obvious, and explicit annotations when it improves code clarity or when required by the compiler.</p>
      </div>
    </div>

    <!-- Practice Section -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Practice Exercises</h4>
      <div class="exercises-grid">
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 1: Type Annotations</h5>
          <div class="mb-3">
            <HighlightedCodeExample 
              code='let guess = "42".parse().expect("Not a number!");'
              language="rust"
              showLineNumbers={false}
            />
          </div>
          <p class="text-sm text-gray-600">Add a type annotation to make this compile. What type should <code class="inline-code">guess</code> be?</p>
        </div>
        
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 2: Tuple Destructuring</h5>
          <div class="mb-3">
            <HighlightedCodeExample 
              code='let person = ("Alice", 30, true);'
              language="rust"
              showLineNumbers={false}
            />
          </div>
          <p class="text-sm text-gray-600">Extract the name, age, and married status into separate variables.</p>
        </div>
        
        <div class="exercise-card">
          <h5 class="font-medium text-gray-800 mb-2">Exercise 3: Array Operations</h5>
          <div class="mb-3">
            <HighlightedCodeExample 
              code='let months = ["Jan", "Feb", "Mar", ...];'
              language="rust"
              showLineNumbers={false}
            />
          </div>
          <p class="text-sm text-gray-600">Create an array of all 12 months and access the 4th month.</p>
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

  .category-tabs {
    @apply flex bg-gray-100 rounded-lg p-1;
  }

  .tab-button {
    @apply flex-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-md transition-colors;
  }

  .tab-button.active {
    @apply bg-white text-rust-primary shadow-sm;
  }

  .types-grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-6;
  }

  .type-card {
    @apply p-4 bg-white rounded border border-gray-200;
  }


  .type-variants {
    @apply mt-4;
  }

  .variants-grid {
    @apply flex flex-wrap gap-2;
  }

  .variant-badge {
    @apply px-2 py-1 bg-gray-100 rounded text-xs font-mono border border-gray-200 flex items-center gap-1;
  }

  .variant-badge.default {
    @apply bg-rust-primary text-white border-rust-primary;
  }

  .default-indicator {
    @apply text-xs font-normal;
  }

  .integer-table {
    @apply bg-white rounded border border-gray-200 overflow-hidden;
  }

  .table-header {
    @apply grid grid-cols-3 bg-gray-100 border-b border-gray-200;
  }

  .table-row {
    @apply grid grid-cols-3 border-b border-gray-100 last:border-b-0;
  }

  .table-col {
    @apply p-3 text-sm;
  }

  .table-header .table-col {
    @apply font-semibold text-gray-800;
  }

  .literals-examples {
    @apply space-y-3;
  }

  .literal-item {
    @apply flex items-center justify-between p-3 bg-white rounded border border-gray-200;
  }

  .literal-code {
    @apply bg-gray-800 text-green-400 px-2 py-1 rounded font-mono text-sm;
  }

  .literal-desc {
    @apply text-sm text-gray-600;
  }

  .compound-grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-6;
  }

  .compound-card {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .access-info {
    @apply mt-3 p-2 bg-gray-50 rounded;
  }

  .example-section {
    @apply p-3 bg-white rounded border border-gray-200;
  }

  .warning-box {
    @apply p-3 bg-red-50 rounded border border-red-200;
  }

  .inference-section {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .inline-code {
    @apply bg-gray-100 px-1 py-0.5 rounded font-mono text-xs;
  }

  .exercises-grid {
    @apply grid grid-cols-1 md:grid-cols-3 gap-4;
  }

  .exercise-card {
    @apply p-4 bg-white rounded border border-gray-200;
  }
</style>