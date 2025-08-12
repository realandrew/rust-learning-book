<script lang="ts">
  import { onMount } from 'svelte';
  import HighlightedCodeExample from '../HighlightedCodeExample.svelte';

  let sectionElement: HTMLElement;

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });
</script>

<div bind:this={sectionElement} class="section-content">
  <div class="section-header">
    <h3 class="text-3xl text-rust-primary font-bold mb-4">🔧 Installation and Setup</h3>
    <p class="text-gray-600 mb-8">Get Rust up and running on your system</p>
  </div>

  <div class="content-grid">
    <!-- Installation Steps -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Installing Rust</h4>
      <div class="space-y-4">
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <h5 class="font-medium text-gray-800">Visit the Official Website</h5>
            <p class="text-sm text-gray-600 mt-1">Go to <code class="bg-gray-100 px-2 py-1 rounded">rustup.rs</code> for the official installer</p>
          </div>
        </div>
        
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <h5 class="font-medium text-gray-800">Run the Installation Command</h5>
            <div class="mt-2">
              <HighlightedCodeExample 
                code="curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
                language="bash"
                isTerminal={true}
              />
            </div>
          </div>
        </div>
        
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <h5 class="font-medium text-gray-800">Restart Your Shell</h5>
            <p class="text-sm text-gray-600 mt-1">Or run:</p>
            <div class="mt-2">
              <HighlightedCodeExample 
                code="source ~/.bashrc"
                language="bash"
                isTerminal={true}
              />
            </div>
          </div>
        </div>
        
        <div class="step-item">
          <div class="step-number">4</div>
          <div class="step-content">
            <h5 class="font-medium text-gray-800">Verify Installation</h5>
            <div class="mt-2">
              <HighlightedCodeExample 
                code="rustc --version"
                language="bash"
                isTerminal={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Platform-Specific Instructions -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Platform-Specific Notes</h4>
      <div class="space-y-4">
        <div class="platform-card">
          <h5 class="font-medium text-gray-800 flex items-center gap-2">
            <span class="text-lg">🪟</span> Windows
          </h5>
          <p class="text-sm text-gray-600 mt-1">
            You may need Visual Studio C++ Build Tools. The installer will guide you through this.
          </p>
        </div>
        
        <div class="platform-card">
          <h5 class="font-medium text-gray-800 flex items-center gap-2">
            <span class="text-lg">🍎</span> macOS
          </h5>
          <p class="text-sm text-gray-600 mt-1 mb-2">
            Requires Xcode command line tools. Run:
          </p>
          <HighlightedCodeExample 
            code="xcode-select --install"
            language="bash"
            isTerminal={true}
          />
        </div>
        
        <div class="platform-card">
          <h5 class="font-medium text-gray-800 flex items-center gap-2">
            <span class="text-lg">🐧</span> Linux
          </h5>
          <p class="text-sm text-gray-600 mt-1 mb-2">
            Usually works out of the box. You might need build-essential on Ubuntu:
          </p>
          <HighlightedCodeExample 
            code="sudo apt install build-essential"
            language="bash"
            isTerminal={true}
          />
        </div>
      </div>
    </div>

    <!-- What You Get -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">What's Installed</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="tool-card">
          <div class="text-2xl mb-2">⚙️</div>
          <h5 class="font-medium text-gray-800">rustc</h5>
          <p class="text-sm text-gray-600">The Rust compiler</p>
        </div>
        
        <div class="tool-card">
          <div class="text-2xl mb-2">📦</div>
          <h5 class="font-medium text-gray-800">Cargo</h5>
          <p class="text-sm text-gray-600">Build system and package manager</p>
        </div>
        
        <div class="tool-card">
          <div class="text-2xl mb-2">🔧</div>
          <h5 class="font-medium text-gray-800">rustup</h5>
          <p class="text-sm text-gray-600">Toolchain installer and updater</p>
        </div>
      </div>
    </div>

    <!-- Quick Verification -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Quick Verification</h4>
      <div class="verification-steps">
        <div class="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <span class="text-green-600 text-xl">✅</span>
          <div class="verification-content">
            <h5 class="font-medium text-green-800">Check if everything works:</h5>
            <div class="mt-2">
              <HighlightedCodeExample 
                code="rustc --version && cargo --version && rustup --version"
                language="bash"
                isTerminal={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .section-content {
    @apply space-y-8;
  }

  .section-header {
    @apply text-center;
  }

  .content-grid {
    @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
  }

  .content-card {
    @apply bg-gray-50 rounded-lg p-6 border border-gray-200;
  }

  .content-card.full-width {
    @apply lg:col-span-2;
  }

  .step-item {
    @apply flex items-start gap-3;
  }

  .step-number {
    @apply w-6 h-6 bg-rust-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1;
  }

  .step-content {
    @apply flex-1;
    min-width: 0; /* Allow flex item to shrink below content size */
  }


  .platform-card {
    @apply p-3 bg-white rounded border border-gray-200;
  }

  .tool-card {
    @apply text-center p-4 bg-white rounded border border-gray-200;
  }

  .verification-steps {
    @apply space-y-3;
  }

  .verification-content {
    flex: 1;
    min-width: 0; /* Allow flex item to shrink below content size */
  }

</style>