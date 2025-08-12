// Navigation and Section Management
class RustLearningApp {
    constructor() {
        this.currentSection = 'overview';
        this.codeEditor = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCodeEditor();
        this.setupInteractiveElements();
        this.loadSection(this.currentSection);
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetSection = e.target.dataset.section;
                this.switchSection(targetSection);
            });
        });
    }

    switchSection(sectionName) {
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionName);
        });

        // Update active section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('active', section.id === sectionName);
        });

        this.currentSection = sectionName;
        this.loadSection(sectionName);
    }

    loadSection(sectionName) {
        const section = document.getElementById(sectionName);
        if (section) {
            section.classList.add('fade-in');
            setTimeout(() => section.classList.remove('fade-in'), 500);

            // Initialize section-specific functionality
            switch (sectionName) {
                case 'interactive':
                    this.initializeCodeEditor();
                    break;
                case 'visual':
                    this.initializeVisualComponents();
                    break;
                case 'exercises':
                    this.initializeExercises();
                    break;
                case 'reference':
                    this.initializeReference();
                    break;
            }
        }
    }

    setupCodeEditor() {
        const codeTextarea = document.getElementById('code-editor');
        if (codeTextarea) {
            this.codeEditor = CodeMirror.fromTextArea(codeTextarea, {
                mode: 'rust',
                theme: 'monokai',
                lineNumbers: true,
                autoCloseBrackets: true,
                matchBrackets: true,
                indentUnit: 4,
                lineWrapping: true,
                extraKeys: {
                    "Ctrl-Space": "autocomplete",
                    "Ctrl-Enter": () => this.runCode()
                }
            });
        }
    }

    initializeCodeEditor() {
        if (!this.codeEditor) {
            this.setupCodeEditor();
        }

        const runButton = document.getElementById('run-code');
        const resetButton = document.getElementById('reset-code');

        if (runButton) {
            runButton.addEventListener('click', () => this.runCode());
        }

        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetCode());
        }
    }

    runCode() {
        const code = this.codeEditor.getValue();
        const output = document.getElementById('code-output');
        
        // Simulate code execution (placeholder)
        output.textContent = 'Simulating Rust execution...\n';
        
        setTimeout(() => {
            // Simple pattern matching for common Rust patterns
            if (code.includes('println!')) {
                const matches = code.match(/println!\("([^"]*)"\)/g);
                if (matches) {
                    let result = '';
                    matches.forEach(match => {
                        const text = match.match(/"([^"]*)"/)[1];
                        result += text + '\n';
                    });
                    output.textContent = result;
                } else {
                    output.textContent = 'Hello, world!\n';
                }
            } else if (code.includes('fn main()')) {
                output.textContent = 'Program compiled successfully!\n(No output to display)';
            } else {
                output.textContent = 'Error: main function not found\n';
            }
        }, 1000);
    }

    resetCode() {
        if (this.codeEditor) {
            this.codeEditor.setValue(`fn main() {
    println!("Hello, world!");
}`);
        }
        document.getElementById('code-output').textContent = 'Click "Run Code" to see output';
    }

    initializeVisualComponents() {
        // Placeholder for visual learning components
        console.log('Initializing visual components...');
        this.createMemoryVisualization();
        this.createOwnershipDiagram();
    }

    createMemoryVisualization() {
        // Placeholder for memory visualization
        const visualPlaceholders = document.querySelectorAll('.visual-placeholder');
        visualPlaceholders.forEach(placeholder => {
            if (placeholder.textContent.includes('memory diagrams')) {
                placeholder.innerHTML = `
                    <div style="border: 2px solid #ce422b; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <h4>Stack Memory</h4>
                        <div style="background: #f0f0f0; padding: 0.5rem; margin: 0.5rem 0;">
                            <code>let x = 5;</code> → Stack: [x: 5]
                        </div>
                    </div>
                    <div style="border: 2px solid #d2691e; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <h4>Heap Memory</h4>
                        <div style="background: #f0f0f0; padding: 0.5rem; margin: 0.5rem 0;">
                            <code>let s = String::from("hello");</code> → Heap: ["hello"]
                        </div>
                    </div>
                `;
            }
        });
    }

    createOwnershipDiagram() {
        // Placeholder for ownership visualization
        const visualPlaceholders = document.querySelectorAll('.visual-placeholder');
        visualPlaceholders.forEach(placeholder => {
            if (placeholder.textContent.includes('Ownership transfer')) {
                placeholder.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem;">
                        <div style="text-align: center;">
                            <div style="border: 2px solid #ce422b; padding: 1rem; border-radius: 8px;">
                                <strong>Variable A</strong><br>
                                <code>String</code>
                            </div>
                        </div>
                        <div style="font-size: 2rem; color: #ce422b;">→</div>
                        <div style="text-align: center;">
                            <div style="border: 2px solid #28a745; padding: 1rem; border-radius: 8px;">
                                <strong>Variable B</strong><br>
                                <code>String</code>
                            </div>
                        </div>
                    </div>
                    <p style="text-align: center; margin-top: 1rem; color: #666;">
                        Ownership moves from A to B
                    </p>
                `;
            }
        });
    }

    initializeExercises() {
        console.log('Initializing exercises...');
        this.createInteractiveExercises();
    }

    createInteractiveExercises() {
        const exercisePlaceholders = document.querySelectorAll('.exercise-placeholder');
        exercisePlaceholders.forEach((placeholder, index) => {
            if (index === 0) { // Variables exercise
                placeholder.innerHTML = `
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #ce422b;">
                        <h4>Challenge: Fix the Variables</h4>
                        <p>Make this code compile by adding the correct keyword:</p>
                        <pre style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
let x = 5;
x = 6; // Error: cannot assign twice to immutable variable</pre>
                        <button class="btn-primary" onclick="alert('Hint: Use the mut keyword!')">Get Hint</button>
                        <button class="btn-secondary" onclick="alert('Answer: let mut x = 5;')">Show Answer</button>
                    </div>
                `;
            }
        });
    }

    initializeReference() {
        console.log('Initializing reference materials...');
        this.loadReferenceContent();
    }

    loadReferenceContent() {
        const refContents = document.querySelectorAll('.ref-content');
        refContents.forEach((content, index) => {
            switch (index) {
                case 0: // Basic Syntax
                    content.innerHTML = `
                        <h4>Variables</h4>
                        <pre><code>let x = 5;          // immutable
let mut y = 10;     // mutable</code></pre>
                        <h4>Functions</h4>
                        <pre><code>fn function_name(param: Type) -> ReturnType {
    // function body
}</code></pre>
                    `;
                    break;
                case 1: // Common Types
                    content.innerHTML = `
                        <h4>Primitive Types</h4>
                        <ul style="text-align: left;">
                            <li><code>i32, i64</code> - signed integers</li>
                            <li><code>u32, u64</code> - unsigned integers</li>
                            <li><code>f32, f64</code> - floating point</li>
                            <li><code>bool</code> - boolean</li>
                            <li><code>char</code> - character</li>
                            <li><code>&str, String</code> - strings</li>
                        </ul>
                    `;
                    break;
                case 2: // Error Messages
                    content.innerHTML = `
                        <h4>Common Errors</h4>
                        <div style="text-align: left;">
                            <p><strong>E0382:</strong> Use after move</p>
                            <p><strong>E0502:</strong> Cannot borrow as mutable</p>
                            <p><strong>E0384:</strong> Cannot assign to immutable variable</p>
                        </div>
                    `;
                    break;
            }
        });
    }

    setupInteractiveElements() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.switchSection('overview');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchSection('visual');
                        break;
                    case '3':
                        e.preventDefault();
                        this.switchSection('interactive');
                        break;
                    case '4':
                        e.preventDefault();
                        this.switchSection('exercises');
                        break;
                    case '5':
                        e.preventDefault();
                        this.switchSection('reference');
                        break;
                }
            }
        });

        // Add tooltips to interactive elements
        this.addTooltips();
    }

    addTooltips() {
        const tooltipElements = [
            { selector: '.nav-btn', text: 'Use Ctrl+1-5 for quick navigation' }
        ];

        tooltipElements.forEach(({ selector, text }) => {
            document.querySelectorAll(selector).forEach(el => {
                el.setAttribute('data-tooltip', text);
                el.classList.add('tooltip');
            });
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rustApp = new RustLearningApp();
    console.log('Rust Learning App initialized!');
});

// Progress tracking
class ProgressTracker {
    constructor() {
        this.progress = {
            overview: false,
            visual: false,
            interactive: false,
            exercises: false,
            reference: false
        };
        this.loadProgress();
    }

    markComplete(section) {
        this.progress[section] = true;
        this.saveProgress();
        this.updateProgressDisplay();
    }

    saveProgress() {
        localStorage.setItem('rustLearningProgress', JSON.stringify(this.progress));
    }

    loadProgress() {
        const saved = localStorage.getItem('rustLearningProgress');
        if (saved) {
            this.progress = { ...this.progress, ...JSON.parse(saved) };
        }
    }

    updateProgressDisplay() {
        const completed = Object.values(this.progress).filter(Boolean).length;
        const total = Object.keys(this.progress).length;
        const percentage = (completed / total) * 100;

        // Update any progress bars if they exist
        document.querySelectorAll('.progress-fill').forEach(fill => {
            fill.style.width = `${percentage}%`;
        });
    }
}