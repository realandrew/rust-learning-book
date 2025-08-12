<script>
  import { onMount } from 'svelte';
  import { chapters } from '../data/chapters';

  let sectionElement;

  // Filter chapters that have visual learning sections
  const visualChapters = chapters.filter(chapter => 
    chapter.sections.some(section => section.type === 'visual')
  );

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });
</script>

<section bind:this={sectionElement} class="py-8">
  <div class="max-w-6xl mx-auto px-8">
    <h2 class="text-4xl md:text-5xl text-rust-primary mb-8 text-center font-bold">Visual Learning</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {#each visualChapters as chapter}
        {#each chapter.sections.filter(s => s.type === 'visual') as section}
          <div class="visual-module-card">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <span class="text-lg">{section.icon}</span>
                <h3 class="text-xl text-rust-primary font-semibold">{section.title}</h3>
              </div>
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Ch. {chapter.number}</span>
            </div>
            
            <p class="text-gray-600 text-sm mb-4">{section.description}</p>
            
            <div class="placeholder-content">
              {#if section.id === 'cargo-intro'}
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div class="text-center">
                    <div class="text-2xl mb-2">📦</div>
                    <div class="text-sm text-gray-500">Cargo Workflow Diagram</div>
                    <div class="text-xs text-gray-400 mt-1">Coming Soon</div>
                  </div>
                </div>
              {:else if section.id === 'data-types'}
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div class="text-center">
                    <div class="text-2xl mb-2">🔢</div>
                    <div class="text-sm text-gray-500">Type System Overview</div>
                    <div class="text-xs text-gray-400 mt-1">Coming Soon</div>
                  </div>
                </div>
              {:else if section.id === 'ownership-rules'}
                <!-- Show the existing ownership demo -->
                <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-rust-primary">
                  <div class="border-2 border-rust-primary rounded-lg p-3 mb-3">
                    <h4 class="font-semibold text-gray-800 mb-2 text-sm">Stack Memory</h4>
                    <div class="bg-gray-100 p-2 rounded">
                      <code class="text-xs">let x = 5;</code> → Stack: [x: 5]
                    </div>
                  </div>
                  <div class="border-2 border-rust-secondary rounded-lg p-3">
                    <h4 class="font-semibold text-gray-800 mb-2 text-sm">Heap Memory</h4>
                    <div class="bg-gray-100 p-2 rounded">
                      <code class="text-xs">let s = String::from("hello");</code> → Heap: ["hello"]
                    </div>
                  </div>
                </div>
              {:else if section.id === 'defining-enums'}
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div class="text-center">
                    <div class="text-2xl mb-2">🔀</div>
                    <div class="text-sm text-gray-500">Enum Variant Tree</div>
                    <div class="text-xs text-gray-400 mt-1">Coming Soon</div>
                  </div>
                </div>
              {:else if section.id === 'packages-crates'}
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div class="text-center">
                    <div class="text-2xl mb-2">📚</div>
                    <div class="text-sm text-gray-500">Module Hierarchy</div>
                    <div class="text-xs text-gray-400 mt-1">Coming Soon</div>
                  </div>
                </div>
              {:else if section.id === 'hashmaps'}
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div class="text-center">
                    <div class="text-2xl mb-2">🗂️</div>
                    <div class="text-sm text-gray-500">Hash Map Structure</div>
                    <div class="text-xs text-gray-400 mt-1">Coming Soon</div>
                  </div>
                </div>
              {:else if section.id === 'generics'}
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div class="text-center">
                    <div class="text-2xl mb-2">🧬</div>
                    <div class="text-sm text-gray-500">Generic Type Substitution</div>
                    <div class="text-xs text-gray-400 mt-1">Coming Soon</div>
                  </div>
                </div>
              {:else}
                <div class="flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div class="text-center">
                    <div class="text-2xl mb-2">{section.icon}</div>
                    <div class="text-sm text-gray-500">Visual Component</div>
                    <div class="text-xs text-gray-400 mt-1">Coming Soon</div>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      {/each}
    </div>
  </div>
</section>

<style lang="postcss">
  .visual-module-card {
    @apply bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100;
  }

  .placeholder-content {
    @apply rounded-lg overflow-hidden;
  }
</style>
