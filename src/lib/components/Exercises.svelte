<script lang="ts">
  import { onMount } from 'svelte';

  let sectionElement: HTMLElement;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  function showHint(exerciseId: string): void {
    switch(exerciseId) {
      case 'variables':
        alert('Hint: Use the mut keyword!');
        break;
      default:
        alert('Hint coming soon!');
    }
  }

  function showAnswer(exerciseId: string): void {
    switch(exerciseId) {
      case 'variables':
        alert('Answer: let mut x = 5;');
        break;
      default:
        alert('Answer coming soon!');
    }
  }
</script>

<section bind:this={sectionElement} class="py-8">
  <div class="max-w-6xl mx-auto px-8">
    <h2 class="text-4xl md:text-5xl text-rust-primary mb-8 text-center font-bold">Practice Exercises</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Variables & Mutability</h3>
        <p class="mb-4 text-gray-600">Practice declaring and modifying variables</p>
        <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-rust-primary">
          <h4 class="mb-4 text-gray-800 font-semibold">Challenge: Fix the Variables</h4>
          <p class="mb-4 text-gray-600">Make this code compile by adding the correct keyword:</p>
          <pre class="bg-code-bg text-gray-200 p-4 rounded font-mono text-sm overflow-x-auto mb-4">let x = 5;
x = 6; // Error: cannot assign twice to immutable variable</pre>
          <div class="flex gap-4">
            <button class="bg-rust-primary text-white px-4 py-2 rounded-md hover:bg-rust-dark transition-colors" on:click={() => showHint('variables')}>Get Hint</button>
            <button class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors" on:click={() => showAnswer('variables')}>Show Answer</button>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Functions</h3>
        <p class="mb-4 text-gray-600">Create and call functions with parameters</p>
        <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-rust-primary text-center text-gray-600">
          <p>🎯 Interactive exercises coming soon</p>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1">
        <h3 class="text-xl text-rust-primary mb-4 font-semibold">Ownership Challenges</h3>
        <p class="mb-4 text-gray-600">Solve ownership and borrowing puzzles</p>
        <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-rust-primary text-center text-gray-600">
          <p>🎯 Interactive exercises coming soon</p>
        </div>
      </div>
    </div>
  </div>
</section>

