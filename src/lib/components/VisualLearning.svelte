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
                <div class="cargo-workflow-visual">
                  <div class="workflow-step-visual">
                    <div class="workflow-icon-visual">📁</div>
                    <div class="workflow-text-visual">
                      <div class="text-xs font-medium text-gray-800">Create</div>
                      <code class="text-xs">cargo new</code>
                    </div>
                  </div>
                  
                  <div class="workflow-arrow-visual">→</div>
                  
                  <div class="workflow-step-visual">
                    <div class="workflow-icon-visual">✏️</div>
                    <div class="workflow-text-visual">
                      <div class="text-xs font-medium text-gray-800">Code</div>
                      <code class="text-xs">src/main.rs</code>
                    </div>
                  </div>
                  
                  <div class="workflow-arrow-visual">→</div>
                  
                  <div class="workflow-step-visual">
                    <div class="workflow-icon-visual">🚀</div>
                    <div class="workflow-text-visual">
                      <div class="text-xs font-medium text-gray-800">Run</div>
                      <code class="text-xs">cargo run</code>
                    </div>
                  </div>
                </div>
              {:else if section.id === 'data-types'}
                <div class="data-types-visual">
                  <div class="types-overview">
                    <div class="type-category">
                      <h4 class="text-sm font-semibold text-gray-800 mb-2">📊 Scalar Types</h4>
                      <div class="scalar-types">
                        <div class="type-item integer">
                          <span class="type-name">Integer</span>
                          <span class="type-example">i32, u32, i64...</span>
                        </div>
                        <div class="type-item float">
                          <span class="type-name">Float</span>
                          <span class="type-example">f32, f64</span>
                        </div>
                        <div class="type-item boolean">
                          <span class="type-name">Bool</span>
                          <span class="type-example">true, false</span>
                        </div>
                        <div class="type-item character">
                          <span class="type-name">Char</span>
                          <span class="type-example">'a', '🦀'</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="type-category">
                      <h4 class="text-sm font-semibold text-gray-800 mb-2">📦 Compound Types</h4>
                      <div class="compound-types">
                        <div class="type-item tuple">
                          <span class="type-name">Tuple</span>
                          <span class="type-example">(i32, f64, char)</span>
                        </div>
                        <div class="type-item array">
                          <span class="type-name">Array</span>
                          <span class="type-example">[i32; 5]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="type-size-demo">
                    <div class="size-bar integer-size" title="Integer: 4 bytes (i32)"></div>
                    <div class="size-bar float-size" title="Float: 8 bytes (f64)"></div>
                    <div class="size-bar bool-size" title="Boolean: 1 byte"></div>
                    <div class="size-bar char-size" title="Char: 4 bytes (UTF-8)"></div>
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

  .cargo-workflow-visual {
    @apply flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-rust-primary/10 to-rust-secondary/10 rounded-lg border border-rust-primary/20;
  }

  .workflow-step-visual {
    @apply flex flex-col items-center gap-1 p-2 bg-white rounded border border-gray-200 shadow-sm;
  }

  .workflow-icon-visual {
    @apply text-lg;
  }

  .workflow-text-visual {
    @apply text-center;
  }

  .workflow-arrow-visual {
    @apply text-rust-primary text-lg font-bold;
  }

  /* Data Types Visual Styling */
  .data-types-visual {
    @apply space-y-4;
  }

  .types-overview {
    @apply space-y-3;
  }

  .type-category {
    @apply p-3 bg-gray-50 rounded-lg border border-gray-200;
  }

  .scalar-types, .compound-types {
    @apply grid grid-cols-2 gap-2;
  }

  .type-item {
    @apply flex flex-col items-center p-2 rounded-md text-center transition-all duration-200 hover:scale-105;
  }

  .type-item.integer {
    @apply bg-blue-100 border border-blue-200 text-blue-800;
  }

  .type-item.float {
    @apply bg-green-100 border border-green-200 text-green-800;
  }

  .type-item.boolean {
    @apply bg-purple-100 border border-purple-200 text-purple-800;
  }

  .type-item.character {
    @apply bg-pink-100 border border-pink-200 text-pink-800;
  }

  .type-item.tuple {
    @apply bg-orange-100 border border-orange-200 text-orange-800;
  }

  .type-item.array {
    @apply bg-yellow-100 border border-yellow-200 text-yellow-800;
  }

  .type-name {
    @apply font-semibold text-xs;
  }

  .type-example {
    @apply text-xs font-mono opacity-75 mt-1;
  }

  .type-size-demo {
    @apply flex items-end gap-1 p-3 bg-gray-50 rounded-lg border border-gray-200;
  }

  .size-bar {
    @apply rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer;
  }

  .size-bar.integer-size {
    @apply bg-blue-400 w-8 h-8;
  }

  .size-bar.float-size {
    @apply bg-green-400 w-8 h-12;
  }

  .size-bar.bool-size {
    @apply bg-purple-400 w-8 h-2;
  }

  .size-bar.char-size {
    @apply bg-pink-400 w-8 h-8;
  }
</style>
