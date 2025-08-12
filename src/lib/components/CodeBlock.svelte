<script lang="ts">
  export let code: string;
  export let language: string = 'rust';
  export let showLineNumbers: boolean = false;
  export let highlight: string[] = []; // Lines to highlight
  
  // Clean and format the code
  $: formattedCode = code
    .trim()
    .split('\n')
    .map(line => line.replace(/^\s*/, '')) // Remove leading whitespace
    .join('\n');
    
  $: lines = formattedCode.split('\n');
</script>

<div class="code-block">
  <pre class="code-pre"><code class="language-{language}">{#each lines as line, index}
{#if showLineNumbers}<span class="line-number">{index + 1}</span>{/if}<span class="code-line" class:highlighted={highlight.includes((index + 1).toString())}>{line}
</span>{/each}</code></pre>
</div>

<style lang="postcss">
  .code-block {
    @apply bg-gray-800 rounded-lg overflow-x-auto;
  }
  
  .code-pre {
    @apply m-0 p-4 text-sm font-mono text-green-400 overflow-x-auto;
  }
  
  .line-number {
    @apply text-gray-500 mr-4 select-none;
    display: inline-block;
    width: 2em;
    text-align: right;
  }
  
  .code-line {
    @apply block;
  }
  
  .code-line.highlighted {
    @apply bg-yellow-900 bg-opacity-30;
  }
  
  .language-rust .keyword {
    @apply text-purple-400;
  }
  
  .language-rust .string {
    @apply text-yellow-300;
  }
  
  .language-rust .comment {
    @apply text-gray-400;
  }
</style>