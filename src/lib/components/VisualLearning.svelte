<script>
  import { onMount } from 'svelte';

  let sectionElement;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
    
    // Initialize visual components
    createMemoryVisualization();
    createOwnershipDiagram();
  });

  function createMemoryVisualization() {
    // Enhanced memory visualization
  }

  function createOwnershipDiagram() {
    // Enhanced ownership visualization
  }
</script>

<section bind:this={sectionElement} class="py-8">
  <div class="max-w-6xl mx-auto px-8">
    <h2 class="text-4xl md:text-5xl text-rust-primary mb-8 text-center font-bold">Visual Learning</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Memory Management</h3>
        <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-rust-primary">
          <div class="border-2 border-rust-primary rounded-lg p-4 mb-4">
            <h4 class="font-semibold text-gray-800 mb-2">Stack Memory</h4>
            <div class="bg-gray-100 p-2 rounded">
              <code class="text-sm">let x = 5;</code> → Stack: [x: 5]
            </div>
          </div>
          <div class="border-2 border-rust-secondary rounded-lg p-4">
            <h4 class="font-semibold text-gray-800 mb-2">Heap Memory</h4>
            <div class="bg-gray-100 p-2 rounded">
              <code class="text-sm">let s = String::from("hello");</code> → Heap: ["hello"]
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Ownership & Borrowing</h3>
        <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-rust-primary text-center">
          <div class="flex flex-col md:flex-row items-center justify-between p-4 mb-4">
            <div class="border-2 border-rust-primary rounded-lg p-4 text-center min-w-24 mb-4 md:mb-0">
              <strong class="block">Variable A</strong>
              <code class="text-sm">String</code>
            </div>
            <div class="text-2xl text-rust-primary mx-4 transform md:transform-none rotate-90 md:rotate-0">→</div>
            <div class="border-2 border-green-600 rounded-lg p-4 text-center min-w-24">
              <strong class="block">Variable B</strong>
              <code class="text-sm">String</code>
            </div>
          </div>
          <p class="text-center text-gray-600 italic">
            Ownership moves from A to B
          </p>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Lifetimes</h3>
        <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-rust-primary text-center text-gray-600">
          <p>⏱️ Lifetime scope diagrams</p>
          <p>Reference validity timelines</p>
        </div>
      </div>
    </div>
  </div>
</section>

