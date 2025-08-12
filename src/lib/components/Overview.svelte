<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { chapters } from '../data/chapters';

  const dispatch = createEventDispatcher();
  let sectionElement;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  function openChapter(chapterId) {
    dispatch('openChapter', chapterId);
  }

  function isChapterAvailable(chapter) {
    return chapter.sections.some(section => section.implemented);
  }
</script>

<section bind:this={sectionElement} class="py-8">
  <div class="max-w-6xl mx-auto px-8">
    <h2 class="text-4xl md:text-5xl text-rust-primary mb-8 text-center font-bold">
      Welcome to Interactive Rust Learning
    </h2>
    
    <!-- Learning Modalities -->
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

    <!-- Learning Paths -->
    <div class="mt-16">
      <h3 class="text-3xl text-rust-primary mb-8 text-center font-bold">🎯 Choose Your Learning Path</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="path-card">
          <h4 class="text-xl text-rust-primary mb-3 font-semibold">🚀 Beginner Track</h4>
          <p class="text-gray-600 mb-4">Start your Rust journey with fundamentals</p>
          <div class="text-sm text-gray-500 mb-4">⏱️ Estimated time: 6-8 hours</div>
          <div class="space-y-1 text-sm">
            <div class="bg-gray-100 px-2 py-1 rounded">1. Getting Started</div>
            <div class="bg-gray-100 px-2 py-1 rounded">2. Common Concepts</div>
            <div class="bg-gray-100 px-2 py-1 rounded">3. Ownership</div>
            <div class="bg-gray-100 px-2 py-1 rounded">4. Structs</div>
            <div class="bg-gray-100 px-2 py-1 rounded">5. Collections</div>
          </div>
          <button class="mt-4 w-full bg-rust-primary text-white py-2 px-4 rounded-md hover:bg-rust-dark transition-colors" disabled>
            Coming Soon
          </button>
        </div>

        <div class="path-card">
          <h4 class="text-xl text-rust-primary mb-3 font-semibold">🏃 Intermediate Track</h4>
          <p class="text-gray-600 mb-4">Build practical skills and understanding</p>
          <div class="text-sm text-gray-500 mb-4">⏱️ Estimated time: 8-12 hours</div>
          <div class="space-y-1 text-sm">
            <div class="bg-gray-100 px-2 py-1 rounded">6. Enums & Pattern Matching</div>
            <div class="bg-gray-100 px-2 py-1 rounded">7. Modules</div>
            <div class="bg-gray-100 px-2 py-1 rounded">8. Error Handling</div>
            <div class="bg-gray-100 px-2 py-1 rounded">9. Generics & Traits</div>
            <div class="bg-gray-100 px-2 py-1 rounded">10. Testing</div>
          </div>
          <button class="mt-4 w-full bg-rust-primary text-white py-2 px-4 rounded-md hover:bg-rust-dark transition-colors" disabled>
            Coming Soon
          </button>
        </div>

        <div class="path-card">
          <h4 class="text-xl text-rust-primary mb-3 font-semibold">👨‍💻 Advanced Track</h4>
          <p class="text-gray-600 mb-4">Master advanced concepts and patterns</p>
          <div class="text-sm text-gray-500 mb-4">⏱️ Estimated time: 15-20 hours</div>
          <div class="space-y-1 text-sm">
            <div class="bg-gray-100 px-2 py-1 rounded">Smart Pointers</div>
            <div class="bg-gray-100 px-2 py-1 rounded">Fearless Concurrency</div>
            <div class="bg-gray-100 px-2 py-1 rounded">OOP Features</div>
            <div class="bg-gray-100 px-2 py-1 rounded">Advanced Features</div>
            <div class="bg-gray-100 px-2 py-1 rounded">Final Projects</div>
          </div>
          <button class="mt-4 w-full bg-rust-primary text-white py-2 px-4 rounded-md hover:bg-rust-dark transition-colors" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>

    <!-- Chapter Browser -->
    <div class="mt-16">
      <h3 class="text-3xl text-rust-primary mb-8 text-center font-bold">📚 Browse All Chapters</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each chapters as chapter}
          <div class="chapter-card">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-rust-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {chapter.number}
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">{chapter.title}</h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="difficulty-badge difficulty-{chapter.difficulty}">
                      {chapter.difficulty}
                    </span>
                    <span class="text-xs text-gray-500">⏱️ {chapter.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p class="text-gray-600 text-sm mb-4">{chapter.description}</p>
            
            <div class="flex flex-wrap gap-1 mb-4">
              {#each chapter.sections as section}
                <div class="section-tag section-{section.type}" title="{section.description}">
                  <span class="text-xs">{section.icon}</span>
                  <span class="text-xs ml-1">{section.type}</span>
                </div>
              {/each}
            </div>

            <div class="flex items-center justify-between">
              <div class="text-xs text-gray-500">
                {chapter.sections.length} sections
              </div>
              <button 
                class="text-rust-primary hover:text-rust-dark text-sm font-medium"
                class:opacity-50={!isChapterAvailable(chapter)}
                disabled={!isChapterAvailable(chapter)}
                on:click={() => openChapter(chapter.id)}
              >
                {isChapterAvailable(chapter) ? 'Start Learning →' : 'Coming Soon →'}
              </button>
            </div>
          </div>
        {/each}
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

  .chapter-card {
    @apply bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-rust-primary/20;
  }

  .difficulty-badge {
    @apply px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide;
  }

  .difficulty-beginner {
    @apply bg-green-100 text-green-800;
  }

  .difficulty-intermediate {
    @apply bg-yellow-100 text-yellow-800;
  }

  .difficulty-advanced {
    @apply bg-red-100 text-red-800;
  }

  .section-tag {
    @apply px-2 py-1 rounded text-xs font-medium flex items-center;
  }

  .section-traditional {
    @apply bg-blue-100 text-blue-800;
  }

  .section-visual {
    @apply bg-purple-100 text-purple-800;
  }

  .section-interactive {
    @apply bg-green-100 text-green-800;
  }

  .section-exercises {
    @apply bg-orange-100 text-orange-800;
  }
</style>