<script lang="ts">
  import Navbar from './lib/components/Navbar.svelte';
  import Overview from './lib/components/Overview.svelte';
  import VisualLearning from './lib/components/VisualLearning.svelte';
  import InteractiveCode from './lib/components/InteractiveCode.svelte';
  import Exercises from './lib/components/Exercises.svelte';
  import Reference from './lib/components/Reference.svelte';
  import type { SectionId } from './lib/types';

  let currentSection: SectionId = 'overview';

  function switchSection(sectionName: SectionId): void {
    currentSection = sectionName;
  }

  // Keyboard shortcuts
  function handleKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '1':
          event.preventDefault();
          switchSection('overview');
          break;
        case '2':
          event.preventDefault();
          switchSection('visual');
          break;
        case '3':
          event.preventDefault();
          switchSection('interactive');
          break;
        case '4':
          event.preventDefault();
          switchSection('exercises');
          break;
        case '5':
          event.preventDefault();
          switchSection('reference');
          break;
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main class="min-h-screen bg-gray-100">
  <Navbar {currentSection} on:sectionChange={(e) => switchSection(e.detail)} />
  
  <div class="pt-20 min-h-screen md:pt-24">
    {#if currentSection === 'overview'}
      <Overview />
    {:else if currentSection === 'visual'}
      <VisualLearning />
    {:else if currentSection === 'interactive'}
      <InteractiveCode />
    {:else if currentSection === 'exercises'}
      <Exercises />
    {:else if currentSection === 'reference'}
      <Reference />
    {/if}
  </div>
</main>