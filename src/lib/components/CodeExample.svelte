<script lang="ts">
  export let title: string = '';
  export let code: string;
  export let language: string = 'rust';
  // Optional future features
  export const showLineNumbers: boolean = false;
  export const highlight: string[] = [];
  export let explanation: string = '';
</script>

<div class="code-example-wrapper">
  {#if title}
    <h6 class="code-title">{title}</h6>
  {/if}
  
  <div class="code-container">
    <div class="code-header">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-red-400 rounded-full"></div>
        <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div class="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
      <span class="text-sm text-gray-500">{language}</span>
    </div>
    
    <div class="code-content">
      <pre class="code-pre"><code class="language-{language}">{code.trim()}</code></pre>
    </div>
  </div>
  
  {#if explanation}
    <p class="code-explanation">{explanation}</p>
  {/if}
</div>

<style lang="postcss">
  .code-example-wrapper {
    @apply space-y-3;
  }
  
  .code-title {
    @apply font-medium text-gray-800 text-sm;
  }
  
  .code-container {
    @apply bg-gray-800 rounded-lg overflow-hidden;
  }
  
  .code-header {
    @apply flex items-center justify-between px-4 py-2 bg-gray-700;
  }
  
  .code-content {
    @apply p-4;
  }
  
  .code-pre {
    @apply m-0 text-sm font-mono text-green-400 overflow-x-auto;
  }
  
  .code-explanation {
    @apply text-sm text-gray-600;
  }
</style>