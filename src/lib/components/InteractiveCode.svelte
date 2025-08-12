<script lang="ts">
  import { onMount } from 'svelte';

  let sectionElement: HTMLElement;
  let codeEditor: any;
  let editorContainer: HTMLElement;
  let codeOutput: string = 'Click "Run Code" to see output';

  const defaultCode: string = `fn main() {
    println!("Hello, world!");
}`;

  let currentCode: string = defaultCode;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
    
    // Initialize CodeMirror
    setupCodeEditor();
  });

  function setupCodeEditor(): void {
    // For now, use a simple textarea
    // In a real implementation, you would integrate CodeMirror here
    const textarea = editorContainer.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = currentCode;
      textarea.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        currentCode = target.value;
      });
    }
  }

  function runCode(): void {
    codeOutput = 'Simulating Rust execution...\n';
    
    setTimeout(() => {
      // Simple pattern matching for common Rust patterns
      if (currentCode.includes('println!')) {
        const matches = currentCode.match(/println!\("([^"]*)"\)/g);
        if (matches) {
          let result = '';
          matches.forEach(match => {
            const textMatch = match.match(/"([^"]*)"/);
            if (textMatch) {
              result += textMatch[1] + '\n';
            }
          });
          codeOutput = result;
        } else {
          codeOutput = 'Hello, world!\n';
        }
      } else if (currentCode.includes('fn main()')) {
        codeOutput = 'Program compiled successfully!\n(No output to display)';
      } else {
        codeOutput = 'Error: main function not found\n';
      }
    }, 1000);
  }

  function resetCode(): void {
    currentCode = defaultCode;
    const textarea = editorContainer.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = currentCode;
    }
    codeOutput = 'Click "Run Code" to see output';
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      runCode();
    }
  }
</script>

<section bind:this={sectionElement} class="py-8">
  <div class="max-w-6xl mx-auto px-8">
    <h2 class="text-4xl md:text-5xl text-rust-primary mb-8 text-center font-bold">
      Interactive Code Examples
    </h2>
    <div class="mt-8">
      <div class="bg-white p-8 rounded-xl shadow-lg col-span-full">
        <h3 class="text-2xl text-rust-primary mb-4 font-semibold">Hello World</h3>
        <div class="bg-code-bg rounded-lg overflow-hidden mb-4" bind:this={editorContainer}>
          <textarea 
            class="code-editor"
            bind:value={currentCode}
            on:keydown={handleKeydown}
            spellcheck="false"
          ></textarea>
          <div class="px-4 py-3 bg-code-dark flex gap-4">
            <button class="btn-primary" on:click={runCode}>▶ Run Code</button>
            <button class="btn-secondary" on:click={resetCode}>🔄 Reset</button>
          </div>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 class="text-rust-primary mb-2 font-semibold">Output:</h4>
          <pre class="code-output">{codeOutput}</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  .code-editor {
    @apply w-full border-none p-4 font-mono text-sm outline-none resize-y;
    background-color: #2d3748;
    color: #e2e8f0;
    min-height: 200px;
  }

  .btn-primary {
    @apply text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 text-sm border-none;
    background-color: #ce422b;
  }

  .btn-primary:hover {
    background-color: #b8371f;
  }

  .btn-secondary {
    @apply bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 text-sm border-none;
  }

  .btn-secondary:hover {
    @apply bg-gray-700;
  }

  .code-output {
    @apply p-4 rounded font-mono text-sm whitespace-pre-wrap overflow-x-auto m-0;
    background-color: #1a202c;
    color: #e2e8f0;
  }

  @media (max-width: 768px) {
    .btn-primary, .btn-secondary {
      @apply w-full;
    }
  }
</style>