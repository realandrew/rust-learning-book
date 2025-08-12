<script>
  import { onMount } from 'svelte';

  let sectionElement;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });
</script>

<section bind:this={sectionElement} class="py-8">
  <div class="max-w-6xl mx-auto px-8">
    <h2 class="text-4xl md:text-5xl text-rust-primary mb-8 text-center font-bold">
      Welcome to Interactive Rust Learning
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div class="path-card">
        <h3 class="text-2xl text-rust-primary mb-4 font-semibold">👁️ Visual Learning</h3>
        <p class="mb-4 text-gray-600">Learn through diagrams, flowcharts, and visual representations of Rust concepts</p>
        <ul class="space-y-2">
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Memory management visualizations
          </li>
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Ownership and borrowing diagrams
          </li>
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Type system illustrations
          </li>
        </ul>
      </div>
      <div class="path-card">
        <h3 class="text-2xl text-rust-primary mb-4 font-semibold">⚡ Interactive Coding</h3>
        <p class="mb-4 text-gray-600">Learn by doing with live code examples and immediate feedback</p>
        <ul class="space-y-2">
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Live code editor with Rust syntax
          </li>
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Instant compilation feedback
          </li>
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Step-by-step code execution
          </li>
        </ul>
      </div>
      <div class="path-card">
        <h3 class="text-2xl text-rust-primary mb-4 font-semibold">🎯 Practical Exercises</h3>
        <p class="mb-4 text-gray-600">Reinforce learning with hands-on challenges and projects</p>
        <ul class="space-y-2">
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Guided coding challenges
          </li>
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Mini-projects
          </li>
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Real-world examples
          </li>
        </ul>
      </div>
      <div class="path-card">
        <h3 class="text-2xl text-rust-primary mb-4 font-semibold">📚 Reference Material</h3>
        <p class="mb-4 text-gray-600">Quick access to syntax, concepts, and best practices</p>
        <ul class="space-y-2">
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Syntax cheat sheets
          </li>
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Common patterns
          </li>
          <li class="text-gray-700 flex items-start">
            <span class="text-green-600 font-bold mr-2">✓</span>
            Error explanations
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  .path-card {
    @apply bg-white p-8 rounded-xl shadow-lg transition-all duration-300;
    transition-timing-function: ease-in-out;
  }
  
  .path-card:hover {
    @apply -translate-y-2 shadow-2xl;
  }
</style>