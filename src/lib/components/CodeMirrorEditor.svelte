<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { EditorView, basicSetup } from 'codemirror';
  import { EditorState } from '@codemirror/state';
  import { rust } from '@codemirror/lang-rust';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { placeholder as cmPlaceholder } from '@codemirror/view';

  export let code: string = '';
  export let language: string = 'rust';
  export let placeholder: string = 'Enter code here...';
  export let fileName: string = '';
  export let readonly: boolean = false;

  const dispatch = createEventDispatcher<{
    change: string;
  }>();

  let editorContainer: HTMLDivElement;
  let editorView: EditorView | null = null;

  onMount(() => {
    if (editorContainer) {
      initializeEditor();
    }
  });

  onDestroy(() => {
    if (editorView) {
      editorView.destroy();
    }
  });

  function initializeEditor() {
    const extensions = [
      basicSetup,
      oneDark,
      rust(),
      cmPlaceholder(placeholder),
      EditorView.theme({
        '&': {
          fontSize: '14px',
          fontFamily: '"Monaco", "Menlo", "Ubuntu Mono", monospace'
        },
        '.cm-content': {
          padding: '16px',
          minHeight: '200px'
        },
        '.cm-editor': {
          borderRadius: '0px'
        },
        '.cm-focused': {
          outline: 'none'
        },
        '.cm-scroller': {
          fontFamily: '"Monaco", "Menlo", "Ubuntu Mono", monospace'
        },
        '.cm-placeholder': {
          color: '#9CA3AF !important', /* gray-400 */
          fontStyle: 'italic !important'
        }
      }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const newCode = update.state.doc.toString();
          if (newCode !== code) {
            code = newCode;
            dispatch('change', code);
          }
        }
      }),
      EditorState.readOnly.of(readonly)
    ];

    const startState = EditorState.create({
      doc: code,
      extensions
    });

    editorView = new EditorView({
      state: startState,
      parent: editorContainer
    });
  }

  // Update editor content when code prop changes
  $: if (editorView && code !== editorView.state.doc.toString()) {
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: code
      }
    });
  }
</script>

<div class="editor-wrapper">
  <div class="editor-header">
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 bg-red-400 rounded-full"></div>
      <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
      <div class="w-3 h-3 bg-green-400 rounded-full"></div>
    </div>
    {#if fileName}
      <span class="text-sm text-gray-400 font-mono">{fileName}</span>
    {:else}
      <span class="text-sm text-gray-500 font-medium">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
    {/if}
  </div>
  
  <div bind:this={editorContainer} class="editor-container"></div>
</div>

<style lang="postcss">
  .editor-wrapper {
    @apply bg-gray-900 rounded-t-lg overflow-hidden shadow-lg;
  }

  .editor-header {
    @apply flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700;
    min-height: 40px;
  }

  .editor-container {
    @apply relative;
  }

  /* Override CodeMirror's default styling to match our theme */
  :global(.cm-editor) {
    background: transparent !important;
  }

  :global(.cm-content) {
    background: transparent !important;
  }

  :global(.cm-gutters) {
    background: #374151 !important; /* gray-700 */
    border-right: 1px solid #4B5563 !important; /* gray-600 */
  }

  :global(.cm-lineNumbers .cm-gutterElement) {
    color: #9CA3AF !important; /* gray-400 */
    font-variant-numeric: tabular-nums;
  }

  :global(.cm-activeLineGutter) {
    background: #4B5563 !important; /* gray-600 */
  }

  :global(.cm-activeLine) {
    background: rgba(75, 85, 99, 0.2) !important; /* gray-600 with opacity */
  }

  /* Custom scrollbar for CodeMirror */
  :global(.cm-scroller::-webkit-scrollbar) {
    width: 12px;
    height: 12px;
  }

  :global(.cm-scroller::-webkit-scrollbar-track) {
    background: #374151; /* gray-700 */
  }

  :global(.cm-scroller::-webkit-scrollbar-thumb) {
    background: #6B7280; /* gray-500 */
    border-radius: 6px;
  }

  :global(.cm-scroller::-webkit-scrollbar-thumb:hover) {
    background: #9CA3AF; /* gray-400 */
  }

  /* Firefox scrollbar */
  :global(.cm-scroller) {
    scrollbar-width: thin;
    scrollbar-color: #6B7280 #374151;
  }
</style>