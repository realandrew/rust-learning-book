<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { chapters } from '../data/chapters';
  import InstallationSection from './chapter-sections/InstallationSection.svelte';
  import HelloWorldSection from './chapter-sections/HelloWorldSection.svelte';
  import CargoIntroSection from './chapter-sections/CargoIntroSection.svelte';
  import VariablesSection from './chapter-sections/VariablesSection.svelte';
  import DataTypesSection from './chapter-sections/DataTypesSection.svelte';
  import FunctionsSection from './chapter-sections/FunctionsSection.svelte';
  import ControlFlowSection from './chapter-sections/ControlFlowSection.svelte';

  export let chapterId: string;
  
  const dispatch = createEventDispatcher();
  let sectionElement: HTMLElement;
  let activeSection = 0;

  $: chapter = chapters.find(c => c.id === chapterId);
  $: if (chapter) {
    activeSection = 0;
  }

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  function goBack() {
    dispatch('backToOverview');
  }

  function nextSection() {
    if (chapter && activeSection < chapter.sections.length - 1) {
      activeSection++;
    }
  }

  function prevSection() {
    if (activeSection > 0) {
      activeSection--;
    }
  }

  function goToSection(index: number) {
    activeSection = index;
  }
</script>

{#if chapter}
  <section bind:this={sectionElement} class="py-8">
    <div class="max-w-6xl mx-auto px-8">
      <!-- Chapter Header -->
      <div class="mb-8">
        <button 
          on:click={goBack}
          class="flex items-center gap-2 text-rust-primary hover:text-rust-dark mb-4 transition-colors"
        >
          ← Back to Overview
        </button>
        
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 bg-rust-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
            {chapter.number}
          </div>
          <div>
            <h1 class="text-4xl md:text-5xl text-rust-primary font-bold">{chapter.title}</h1>
            <p class="text-xl text-gray-600 mt-2">{chapter.description}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span class="difficulty-badge difficulty-{chapter.difficulty}">
            {chapter.difficulty}
          </span>
          <span>⏱️ {chapter.estimatedTime}</span>
          <span>📚 {chapter.sections.length} sections</span>
        </div>
      </div>

      <!-- Section Navigation -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2">
          {#each chapter.sections as section, index}
            <button
              on:click={() => goToSection(index)}
              class="section-nav-btn"
              class:active={activeSection === index}
            >
              <span class="text-sm">{section.icon}</span>
              <span class="ml-2 text-sm">{section.title}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{activeSection + 1} of {chapter.sections.length}</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            style="width: {((activeSection + 1) / chapter.sections.length) * 100}%"
          ></div>
        </div>
      </div>

      <!-- Section Content -->
      <div class="chapter-content">
        {#if chapter.id === 'getting-started'}
          {#if activeSection === 0}
            <InstallationSection />
          {:else if activeSection === 1}
            <HelloWorldSection />
          {:else if activeSection === 2}
            <CargoIntroSection />
          {/if}
        {:else if chapter.id === 'common-concepts'}
          {#if activeSection === 0}
            <VariablesSection />
          {:else if activeSection === 1}
            <DataTypesSection />
          {:else if activeSection === 2}
            <FunctionsSection />
          {:else if activeSection === 3}
            <ControlFlowSection />
          {/if}
        {:else}
          <div class="text-center py-16">
            <div class="text-6xl mb-4">🚧</div>
            <h3 class="text-2xl text-gray-600 mb-4">Chapter Under Construction</h3>
            <p class="text-gray-500">This chapter is coming soon!</p>
          </div>
        {/if}
      </div>

      <!-- Navigation Controls -->
      <div class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
        <button
          on:click={prevSection}
          disabled={activeSection === 0}
          class="nav-button"
          class:opacity-50={activeSection === 0}
        >
          ← Previous
        </button>

        <div class="flex gap-2">
          {#each chapter.sections as _, index}
            <div 
              class="w-2 h-2 rounded-full transition-colors"
              class:bg-rust-primary={index <= activeSection}
              class:bg-gray-300={index > activeSection}
            ></div>
          {/each}
        </div>

        <button
          on:click={nextSection}
          disabled={activeSection === chapter.sections.length - 1}
          class="nav-button"
          class:opacity-50={activeSection === chapter.sections.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  </section>
{:else}
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <div class="text-6xl mb-4">❌</div>
      <h2 class="text-2xl text-gray-600 mb-4">Chapter Not Found</h2>
      <button on:click={goBack} class="text-rust-primary hover:text-rust-dark">
        ← Back to Overview
      </button>
    </div>
  </div>
{/if}

<style lang="postcss">
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

  .section-nav-btn {
    @apply px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-rust-primary hover:text-rust-primary transition-colors bg-white;
  }

  .section-nav-btn.active {
    @apply bg-rust-primary text-white border-rust-primary;
  }

  .nav-button {
    @apply px-6 py-3 bg-rust-primary text-white rounded-lg hover:bg-rust-dark transition-colors font-medium;
  }

  .nav-button:disabled {
    @apply bg-gray-300 text-gray-500 cursor-not-allowed;
  }

  .chapter-content {
    @apply bg-white rounded-xl shadow-lg p-8 min-h-96;
  }
</style>