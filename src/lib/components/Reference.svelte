<script>
  import { onMount } from 'svelte';
  import HighlightedCodeExample from './HighlightedCodeExample.svelte';

  let sectionElement;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });
</script>

<section bind:this={sectionElement} class="py-8">
  <div class="max-w-6xl mx-auto px-8">
    <h2 class="text-4xl md:text-5xl text-rust-primary mb-8 text-center font-bold">Quick Reference</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Basic Syntax</h3>
        <div class="text-left">
          <h4 class="mb-2 text-gray-800 font-medium">Variables</h4>
          <HighlightedCodeExample 
            code={`let x = 5;          // immutable
let mut y = 10;     // mutable`}
            language="rust"
            showLineNumbers={true}
          />
          <h4 class="mb-2 text-gray-800 font-medium">Functions</h4>
          <HighlightedCodeExample 
            code={`fn function_name(param: Type) -> ReturnType {
    // function body
}`}
            language="rust"
            showLineNumbers={true}
          />
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Common Types</h3>
        <div class="text-left">
          <h4 class="mb-2 text-gray-800 font-medium">Primitive Types</h4>
          <ul class="space-y-2">
            <li class="text-gray-700"><code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">i32, i64</code> - signed integers</li>
            <li class="text-gray-700"><code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">u32, u64</code> - unsigned integers</li>
            <li class="text-gray-700"><code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">f32, f64</code> - floating point</li>
            <li class="text-gray-700"><code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">bool</code> - boolean</li>
            <li class="text-gray-700"><code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">char</code> - character</li>
            <li class="text-gray-700"><code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">&str, String</code> - strings</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Error Messages</h3>
        <div class="text-left">
          <h4 class="mb-2 text-gray-800 font-medium">Common Errors</h4>
          <div class="space-y-3">
            <div class="pb-3 border-b border-gray-200">
              <strong class="text-rust-primary font-mono">E0382:</strong> <span class="text-gray-700">Use after move</span>
            </div>
            <div class="pb-3 border-b border-gray-200">
              <strong class="text-rust-primary font-mono">E0502:</strong> <span class="text-gray-700">Cannot borrow as mutable</span>
            </div>
            <div>
              <strong class="text-rust-primary font-mono">E0384:</strong> <span class="text-gray-700">Cannot assign to immutable variable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>