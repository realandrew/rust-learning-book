<script lang="ts">
  import { onMount } from 'svelte';
  import { highlightCode } from '../utils/syntax-highlighter';
  
  export let title: string = '';
  export let code: string;
  export let language: string = 'rust';
  export let explanation: string = '';
  export let showLineNumbers: boolean = true;
  export let highlightLines: number[] = [];
  export let isTerminal: boolean = false;
  export let fileName: string = '';
  export let showCopyButton: boolean = true;
  export let maxHeight: string = '';
  export let collapsible: boolean = false;
  
  let highlightedCode = '';
  let codeElement: HTMLElement;
  let codeContainer: HTMLElement;
  let codeContentElement: HTMLElement;
  let isScrollable = false;
  let copySuccess = false;
  let isCollapsed = false;
  
  onMount(() => {
    // Highlight the code when component mounts
    const shouldShowLineNumbers = showLineNumbers && !isTerminal;
    highlightedCode = highlightCode(code, {
      language,
      showLineNumbers: shouldShowLineNumbers,
      highlightLines
    });
    
    // Check if content is scrollable
    checkScrollable();
  });
  
  function checkScrollable() {
    if (codeContentElement) {
      isScrollable = codeContentElement.scrollWidth > codeContentElement.clientWidth;
    }
  }
  
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      copySuccess = true;
      setTimeout(() => {
        copySuccess = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        copySuccess = true;
        setTimeout(() => {
          copySuccess = false;
        }, 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      textArea.remove();
    }
  }
  
  function toggleCollapse() {
    isCollapsed = !isCollapsed;
  }
  
  function getLanguageDisplayName(lang: string): string {
    const langNames: Record<string, string> = {
      'rust': 'Rust',
      'bash': 'Bash',
      'shell': 'Shell',
      'terminal': 'Terminal',
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'json': 'JSON',
      'toml': 'TOML',
      'yaml': 'YAML',
      'html': 'HTML',
      'css': 'CSS',
      'python': 'Python',
      'java': 'Java',
      'cpp': 'C++',
      'c': 'C'
    };
    return langNames[lang] || lang.toUpperCase();
  }
  
  // Re-highlight when code changes
  $: if (code) {
    const shouldShowLineNumbers = showLineNumbers && !isTerminal;
    highlightedCode = highlightCode(code, {
      language,
      showLineNumbers: shouldShowLineNumbers,
      highlightLines
    });
    // Recheck scrollable after code changes
    setTimeout(checkScrollable, 0);
  }
</script>

<div class="code-example-wrapper">
  {#if title}
    <h6 class="code-title">{title}</h6>
  {/if}
  
  <div 
    bind:this={codeContainer}
    class="code-container" 
    class:terminal={isTerminal}
    class:scrollable={isScrollable}
  >
    <div class="code-header" class:terminal-header={isTerminal}>
      <div class="flex items-center gap-3">
        {#if isTerminal}
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span class="text-sm text-gray-400 font-mono">Terminal</span>
        {:else}
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-400 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-500 font-medium">{getLanguageDisplayName(language)}</span>
            {#if fileName}
              <span class="text-gray-400">•</span>
              <span class="text-gray-400 font-mono">{fileName}</span>
            {/if}
            {#if showLineNumbers && !isTerminal}
              <span class="text-gray-400">•</span>
              <span class="text-gray-400 text-xs">{code.split('\n').length} lines</span>
            {/if}
          </div>
        {/if}
      </div>
      
      <div class="flex items-center gap-2">
        {#if collapsible}
          <button 
            on:click={toggleCollapse}
            class="header-button"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {#if isCollapsed}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            {:else}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
            {/if}
          </button>
        {/if}
        
        {#if showCopyButton}
          <button 
            on:click={copyToClipboard}
            class="header-button"
            title="Copy to clipboard"
          >
            {#if copySuccess}
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            {:else}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            {/if}
          </button>
        {/if}
      </div>
    </div>
    
    {#if !isCollapsed}
      <div 
        bind:this={codeContentElement} 
        class="code-content"
        style={maxHeight ? `max-height: ${maxHeight}; overflow-y: auto;` : ''}
      >
        <pre 
          bind:this={codeElement}
          class="code-pre language-{language}"
          class:line-numbers={showLineNumbers && !isTerminal}
        ><code class="language-{language}">{@html highlightedCode}</code></pre>
      </div>
    {/if}
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
    @apply bg-gray-900 rounded-lg overflow-hidden shadow-lg;
    position: relative;
  }
  
  .code-container.terminal {
    @apply bg-black;
  }
  
  /* Fade overlay for scroll indication - only show when scrollable */
  .code-container.scrollable::after {
    content: '';
    position: absolute;
    top: 48px; /* Height of header */
    right: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(to left, rgba(17, 24, 39, 0.8), transparent);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .code-container.scrollable.terminal::after {
    background: linear-gradient(to left, rgba(0, 0, 0, 0.8), transparent);
  }
  
  .code-container.scrollable:hover::after {
    opacity: 1;
  }
  
  .code-header {
    @apply flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700;
    min-height: 48px;
  }
  
  .code-header.terminal-header {
    @apply bg-gray-900 border-gray-600;
  }
  
  .header-button {
    @apply p-1 rounded hover:bg-gray-700 transition-colors duration-200 text-gray-400 hover:text-gray-200;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .header-button:focus {
    @apply outline-none ring-2 ring-gray-500 ring-opacity-50;
  }
  
  .terminal .header-button:hover {
    @apply bg-gray-800;
  }
  
  .code-content {
    @apply p-4 overflow-x-auto;
    /* Custom scrollbar styling */
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) rgba(55, 65, 81, 0.3);
    /* Better touch scrolling on mobile */
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }
  
  /* Webkit scrollbar styling */
  .code-content::-webkit-scrollbar {
    height: 8px;
  }
  
  .code-content::-webkit-scrollbar-track {
    background: rgba(55, 65, 81, 0.3);
    border-radius: 4px;
  }
  
  .code-content::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }
  
  .code-content::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }
  
  .code-pre {
    @apply m-0 text-sm font-mono leading-relaxed;
    background: transparent !important;
    white-space: pre;
    overflow-wrap: normal;
    word-break: normal;
    min-width: fit-content;
  }
  
  /* Tighter line height for line-numbered code blocks */
  .code-pre.line-numbers {
    line-height: 1.1;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 640px) {
    .code-content {
      @apply p-3;
    }
    
    .code-pre {
      @apply text-xs;
    }
    
    .code-header {
      @apply px-3 py-2;
    }
    
    .code-header span {
      @apply text-xs;
    }
  }
  
  .code-explanation {
    @apply text-sm text-gray-600 mt-2;
  }

  /* Prism.js theme customization for dark background */
  :global(.code-pre .token.comment),
  :global(.code-pre .token.prolog),
  :global(.code-pre .token.doctype),
  :global(.code-pre .token.cdata) {
    @apply text-gray-400 italic;
  }

  :global(.code-pre .token.punctuation) {
    @apply text-gray-300;
  }

  :global(.code-pre .token.property),
  :global(.code-pre .token.tag),
  :global(.code-pre .token.boolean),
  :global(.code-pre .token.number),
  :global(.code-pre .token.constant),
  :global(.code-pre .token.symbol),
  :global(.code-pre .token.deleted) {
    @apply text-orange-400;
  }

  :global(.code-pre .token.selector),
  :global(.code-pre .token.attr-name),
  :global(.code-pre .token.string),
  :global(.code-pre .token.char),
  :global(.code-pre .token.builtin),
  :global(.code-pre .token.inserted) {
    @apply text-green-400;
  }

  :global(.code-pre .token.operator),
  :global(.code-pre .token.entity),
  :global(.code-pre .token.url),
  :global(.language-css .token.string),
  :global(.style .token.string) {
    @apply text-yellow-300;
  }

  :global(.code-pre .token.atrule),
  :global(.code-pre .token.attr-value),
  :global(.code-pre .token.keyword) {
    @apply text-purple-400 font-medium;
  }

  :global(.code-pre .token.function),
  :global(.code-pre .token.class-name) {
    @apply text-blue-400;
  }

  :global(.code-pre .token.macro) {
    @apply text-cyan-400 font-bold;
  }

  :global(.code-pre .token.lifetime) {
    @apply text-pink-400 font-medium;
  }

  :global(.code-pre .token.regex),
  :global(.code-pre .token.important),
  :global(.code-pre .token.variable) {
    @apply text-red-400;
  }

  /* Line highlighting */
  :global(.code-pre .line) {
    display: block;
    line-height: inherit;
    margin: 0;
    padding: 0;
  }

  :global(.code-pre .line.highlighted-line) {
    @apply bg-yellow-900 bg-opacity-20 border-l-4 border-yellow-400 pl-2 -ml-2;
  }

  /* Line numbers */
  :global(.code-pre.line-numbers .line-number) {
    @apply text-gray-500 mr-4 select-none inline-block w-8 text-right;
    border-right: 1px solid rgba(75, 85, 99, 0.3);
    padding-right: 8px;
    margin-right: 12px;
    font-variant-numeric: tabular-nums;
  }
  
  :global(.terminal .code-pre.line-numbers .line-number) {
    @apply text-gray-600;
    border-right-color: rgba(75, 85, 99, 0.2);
  }

  /* Default text color */
  :global(.code-pre) {
    @apply text-gray-100;
  }

  /* Terminal-specific highlighting and scrollbar */
  .terminal .code-content::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.4);
  }
  
  .terminal .code-content::-webkit-scrollbar-thumb {
    background: rgba(34, 197, 94, 0.3);
  }
  
  .terminal .code-content::-webkit-scrollbar-thumb:hover {
    background: rgba(34, 197, 94, 0.5);
  }
  
  :global(.terminal .code-pre) {
    @apply text-green-400;
  }

  :global(.terminal .code-pre .token.builtin) {
    @apply text-cyan-400 font-semibold;
  }

  :global(.terminal .code-pre .token.string) {
    @apply text-yellow-300;
  }

  :global(.terminal .code-pre .token.comment) {
    @apply text-gray-500;
  }

  :global(.terminal .code-pre .token.variable) {
    @apply text-purple-400;
  }

  :global(.terminal .code-pre .token.operator) {
    @apply text-white;
  }
</style>