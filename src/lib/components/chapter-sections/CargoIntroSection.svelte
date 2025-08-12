<script lang="ts">
  import { onMount } from 'svelte';
  import HighlightedCodeExample from '../HighlightedCodeExample.svelte';

  let sectionElement: HTMLElement;
  let selectedTab = 'overview';

  onMount(() => {
    sectionElement.classList.add('fade-in');
    setTimeout(() => sectionElement.classList.remove('fade-in'), 500);
  });

  function switchTab(tab: string) {
    selectedTab = tab;
  }
</script>

<div bind:this={sectionElement} class="section-content">
  <div class="section-header">
    <h3 class="text-3xl text-rust-primary font-bold mb-4">📦 Introduction to Cargo</h3>
    <p class="text-gray-600 mb-8">Rust's build system and package manager</p>
  </div>

  <div class="content-grid">
    <!-- What is Cargo -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">What is Cargo?</h4>
      <div class="space-y-4">
        <div class="feature-item">
          <span class="feature-icon">🔨</span>
          <div>
            <h5 class="font-medium text-gray-800">Build System</h5>
            <p class="text-sm text-gray-600">Compiles your code and manages dependencies</p>
          </div>
        </div>
        
        <div class="feature-item">
          <span class="feature-icon">📚</span>
          <div>
            <h5 class="font-medium text-gray-800">Package Manager</h5>
            <p class="text-sm text-gray-600">Downloads and manages external libraries (crates)</p>
          </div>
        </div>
        
        <div class="feature-item">
          <span class="feature-icon">🧪</span>
          <div>
            <h5 class="font-medium text-gray-800">Test Runner</h5>
            <p class="text-sm text-gray-600">Runs your tests and benchmarks</p>
          </div>
        </div>
        
        <div class="feature-item">
          <span class="feature-icon">📋</span>
          <div>
            <h5 class="font-medium text-gray-800">Documentation Generator</h5>
            <p class="text-sm text-gray-600">Creates documentation from your code</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Visual Workflow -->
    <div class="content-card">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Cargo Workflow</h4>
      <div class="workflow-diagram">
        <div class="workflow-step">
          <div class="workflow-icon">📁</div>
          <div class="workflow-text">
            <h5 class="font-medium text-gray-800">1. Create Project</h5>
            <code class="text-xs">cargo new my_project</code>
          </div>
        </div>
        
        <div class="workflow-arrow">⬇️</div>
        
        <div class="workflow-step">
          <div class="workflow-icon">✏️</div>
          <div class="workflow-text">
            <h5 class="font-medium text-gray-800">2. Write Code</h5>
            <code class="text-xs">src/main.rs</code>
          </div>
        </div>
        
        <div class="workflow-arrow">⬇️</div>
        
        <div class="workflow-step">
          <div class="workflow-icon">🔧</div>
          <div class="workflow-text">
            <h5 class="font-medium text-gray-800">3. Build & Run</h5>
            <code class="text-xs">cargo run</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabbed Content -->
    <div class="content-card full-width">
      <div class="tab-container">
        <div class="tab-header">
          <button 
            class="tab-button" 
            class:active={selectedTab === 'overview'}
            on:click={() => switchTab('overview')}
          >
            📋 Overview
          </button>
          <button 
            class="tab-button" 
            class:active={selectedTab === 'commands'}
            on:click={() => switchTab('commands')}
          >
            ⚡ Commands
          </button>
          <button 
            class="tab-button" 
            class:active={selectedTab === 'toml'}
            on:click={() => switchTab('toml')}
          >
            📄 Cargo.toml
          </button>
          <button 
            class="tab-button" 
            class:active={selectedTab === 'structure'}
            on:click={() => switchTab('structure')}
          >
            🏗️ Project Structure
          </button>
        </div>

        <div class="tab-content">
          {#if selectedTab === 'overview'}
            <div class="overview-content">
              <h5 class="font-medium text-gray-800 mb-4">Why Use Cargo?</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="benefit-card">
                  <h6 class="font-medium text-green-800 mb-2">🚀 Productivity</h6>
                  <p class="text-sm text-gray-600">Focus on code, not build configuration</p>
                </div>
                <div class="benefit-card">
                  <h6 class="font-medium text-blue-800 mb-2">🔄 Consistency</h6>
                  <p class="text-sm text-gray-600">Standard project structure across all Rust projects</p>
                </div>
                <div class="benefit-card">
                  <h6 class="font-medium text-purple-800 mb-2">📦 Dependencies</h6>
                  <p class="text-sm text-gray-600">Easy dependency management from crates.io</p>
                </div>
                <div class="benefit-card">
                  <h6 class="font-medium text-orange-800 mb-2">🧪 Testing</h6>
                  <p class="text-sm text-gray-600">Built-in testing framework and test runner</p>
                </div>
              </div>
            </div>
          {:else if selectedTab === 'commands'}
            <div class="commands-content">
              <h5 class="font-medium text-gray-800 mb-4">Essential Cargo Commands</h5>
              <div class="space-y-3">
                <div class="command-item">
                  <HighlightedCodeExample 
                    code="cargo new project_name"
                    language="bash"
                    isTerminal={true}
                  />
                  <p class="text-sm text-gray-600">Create a new Rust project</p>
                </div>
                <div class="command-item">
                  <HighlightedCodeExample 
                    code="cargo build"
                    language="bash"
                    isTerminal={true}
                  />
                  <p class="text-sm text-gray-600">Compile the project (debug mode)</p>
                </div>
                <div class="command-item">
                  <HighlightedCodeExample 
                    code="cargo run"
                    language="bash"
                    isTerminal={true}
                  />
                  <p class="text-sm text-gray-600">Compile and run the project</p>
                </div>
                <div class="command-item">
                  <HighlightedCodeExample 
                    code="cargo test"
                    language="bash"
                    isTerminal={true}
                  />
                  <p class="text-sm text-gray-600">Run all tests</p>
                </div>
                <div class="command-item">
                  <HighlightedCodeExample 
                    code="cargo build --release"
                    language="bash"
                    isTerminal={true}
                  />
                  <p class="text-sm text-gray-600">Build with optimizations</p>
                </div>
                <div class="command-item">
                  <HighlightedCodeExample 
                    code="cargo check"
                    language="bash"
                    isTerminal={true}
                  />
                  <p class="text-sm text-gray-600">Check code without building</p>
                </div>
              </div>
            </div>
          {:else if selectedTab === 'toml'}
            <div class="toml-content">
              <h5 class="font-medium text-gray-800 mb-4">Cargo.toml Configuration</h5>
              <div class="toml-example">
                <div class="code-header">
                  <span class="text-sm text-gray-500">Cargo.toml</span>
                </div>
                <HighlightedCodeExample 
                  code={`[package]
name = "hello_world"
version = "0.1.0"
edition = "2021"

[dependencies]
# Add external crates here
# serde = "1.0"
# tokio = "1.0"`}
                  language="toml"
                />
              </div>
              <div class="mt-4 space-y-2">
                <div class="toml-explanation">
                  <code class="inline-code">[package]</code>
                  <span class="text-sm text-gray-600">Project metadata section</span>
                </div>
                <div class="toml-explanation">
                  <code class="inline-code">name</code>
                  <span class="text-sm text-gray-600">Project name (must be valid crate name)</span>
                </div>
                <div class="toml-explanation">
                  <code class="inline-code">version</code>
                  <span class="text-sm text-gray-600">Semantic version (SemVer)</span>
                </div>
                <div class="toml-explanation">
                  <code class="inline-code">edition</code>
                  <span class="text-sm text-gray-600">Rust edition (2015, 2018, 2021)</span>
                </div>
                <div class="toml-explanation">
                  <code class="inline-code">[dependencies]</code>
                  <span class="text-sm text-gray-600">External libraries your project uses</span>
                </div>
              </div>
            </div>
          {:else if selectedTab === 'structure'}
            <div class="structure-content">
              <h5 class="font-medium text-gray-800 mb-4">Project Structure</h5>
              <div class="file-tree">
                <div class="file-item">
                  <span class="file-icon">📁</span>
                  <span class="file-name">my_project/</span>
                </div>
                <div class="file-item level-1">
                  <span class="file-icon">📄</span>
                  <span class="file-name">Cargo.toml</span>
                  <span class="file-desc">Project configuration</span>
                </div>
                <div class="file-item level-1">
                  <span class="file-icon">📁</span>
                  <span class="file-name">src/</span>
                </div>
                <div class="file-item level-2">
                  <span class="file-icon">🦀</span>
                  <span class="file-name">main.rs</span>
                  <span class="file-desc">Entry point</span>
                </div>
                <div class="file-item level-1">
                  <span class="file-icon">📁</span>
                  <span class="file-name">target/</span>
                  <span class="file-desc">(generated by cargo)</span>
                </div>
                <div class="file-item level-2">
                  <span class="file-icon">📁</span>
                  <span class="file-name">debug/</span>
                  <span class="file-desc">Debug builds</span>
                </div>
                <div class="file-item level-2">
                  <span class="file-icon">📁</span>
                  <span class="file-name">release/</span>
                  <span class="file-desc">Release builds</span>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Quick Start -->
    <div class="content-card full-width">
      <h4 class="text-xl font-semibold text-gray-800 mb-4">Quick Start Guide</h4>
      <div class="quick-start-steps">
        <div class="quick-step">
          <div class="step-header">
            <span class="step-icon">1️⃣</span>
            <h5 class="font-medium text-gray-800">Create a new project</h5>
          </div>
          <HighlightedCodeExample 
            code="cargo new hello_cargo --bin"
            language="bash"
            isTerminal={true}
          />
          <p class="text-sm text-gray-600 mt-2">The <code class="inline-code">--bin</code> flag creates a binary (executable) project</p>
        </div>

        <div class="quick-step">
          <div class="step-header">
            <span class="step-icon">2️⃣</span>
            <h5 class="font-medium text-gray-800">Navigate to the project</h5>
          </div>
          <HighlightedCodeExample 
            code="cd hello_cargo"
            language="bash"
            isTerminal={true}
          />
        </div>

        <div class="quick-step">
          <div class="step-header">
            <span class="step-icon">3️⃣</span>
            <h5 class="font-medium text-gray-800">Run the project</h5>
          </div>
          <HighlightedCodeExample 
            code="cargo run"
            language="bash"
            isTerminal={true}
          />
          <p class="text-sm text-gray-600 mt-2">This builds and runs your project in one command!</p>
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

  .feature-item {
    @apply flex items-start gap-3 p-3 bg-white rounded border border-gray-200;
  }

  .feature-icon {
    @apply text-xl flex-shrink-0;
  }

  .workflow-diagram {
    @apply flex flex-col items-center space-y-4 py-4;
  }

  .workflow-step {
    @apply flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 w-full max-w-sm;
  }

  .workflow-icon {
    @apply text-2xl flex-shrink-0;
  }

  .workflow-arrow {
    @apply text-rust-primary text-xl;
  }

  .tab-container {
    @apply bg-white rounded-lg overflow-hidden border border-gray-200;
  }

  .tab-header {
    @apply flex bg-gray-100 border-b border-gray-200;
  }

  .tab-button {
    @apply px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-colors flex-1 text-center;
  }

  .tab-button.active {
    @apply bg-white text-rust-primary border-b-2 border-rust-primary;
  }

  .tab-content {
    @apply p-6;
  }

  .benefit-card {
    @apply p-3 bg-gray-50 rounded border border-gray-200;
  }

  .command-item {
    @apply flex items-start gap-3 p-3 bg-gray-50 rounded;
  }


  .toml-example {
    @apply bg-gray-800 rounded-lg overflow-hidden;
  }

  .code-header {
    @apply px-4 py-2 bg-gray-700 border-b border-gray-600;
  }


  .toml-explanation {
    @apply flex items-center gap-3;
  }

  .inline-code {
    @apply bg-gray-100 px-2 py-1 rounded font-mono text-sm;
  }

  .file-tree {
    @apply font-mono text-sm space-y-1;
  }

  .file-item {
    @apply flex items-center gap-2;
  }

  .file-item.level-1 {
    @apply ml-4;
  }

  .file-item.level-2 {
    @apply ml-8;
  }

  .file-icon {
    @apply flex-shrink-0;
  }

  .file-name {
    @apply font-medium;
  }

  .file-desc {
    @apply text-gray-500 text-xs ml-auto;
  }

  .quick-start-steps {
    @apply space-y-6;
  }

  .quick-step {
    @apply p-4 bg-white rounded border border-gray-200;
  }

  .step-header {
    @apply flex items-center gap-3 mb-3;
  }

  .step-icon {
    @apply text-xl;
  }

</style>