<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SectionId, Section } from '../types';
  
  export let currentSection: SectionId = 'overview';
  
  const dispatch = createEventDispatcher<{
    sectionChange: SectionId;
  }>();
  
  const sections: Section[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'visual', label: 'Visual Learning' },
    { id: 'interactive', label: 'Interactive Code' },
    { id: 'exercises', label: 'Exercises' },
    { id: 'reference', label: 'Reference' }
  ];
  
  function handleSectionClick(sectionId: SectionId): void {
    dispatch('sectionChange', sectionId);
  }
</script>

<nav class="fixed top-0 w-full gradient-rust text-white py-4 shadow-lg z-50">
  <div class="max-w-6xl mx-auto px-8 flex justify-between items-center">
    <h1 class="text-3xl font-bold">🦀 Learn Rust</h1>
    <div class="flex gap-4 md:gap-4">
      {#each sections as section}
        <button 
          class="nav-btn {currentSection === section.id ? 'active' : ''}"
          on:click={() => handleSectionClick(section.id)}
          data-tooltip="Use Ctrl+{sections.indexOf(section) + 1} for quick navigation"
        >
          {section.label}
        </button>
      {/each}
    </div>
  </div>
</nav>

<style lang="postcss">
  .nav-btn {
    @apply text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 text-sm relative;
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .nav-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .nav-btn.active {
    @apply bg-white border-white;
    color: #ce422b;
  }

  @media (max-width: 768px) {
    .nav-btn {
      @apply px-3 py-1 text-xs;
    }
  }
</style>