import Prism from 'prismjs';

// Import Rust language support
import 'prismjs/components/prism-rust';

// Import additional languages we might need
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-powershell';

// Custom Rust tokens for better highlighting
const rustTokens = {
  'keyword': /\b(?:abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|Self|static|struct|super|trait|true|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
  'function': /\b[a-z_]\w*(?=\s*\()/,
  'macro': /\b\w+!/,
  'number': /\b(?:0x[\da-f]+|0o[0-7]+|0b[01]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
  'string': {
    pattern: /(r#*|b#*|br#*)"(?:[^"\\]|\\[\s\S])*"#*/,
    greedy: true
  },
  'char': /'(?:[^'\\]|\\(?:[nrt0\\'"']|x[\da-f]{2}|u\{[\da-f]{1,6}\}))'/,
  'lifetime': /'[a-zA-Z_]\w*/,
  'operator': /[-+*\/%=!<>&|^]+/,
  'punctuation': /[{}[\];(),.:]/
};

// Extend Prism's Rust grammar
Prism.languages.rust = {
  ...Prism.languages.rust,
  ...rustTokens
};

// Enhanced bash/shell grammar for better terminal command highlighting
const shellTokens = {
  'comment': {
    pattern: /(^|[^"{\\$])#.*/,
    lookbehind: true
  },
  'string': {
    pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
    greedy: true
  },
  'variable': [
    {
      pattern: /\$?\(\([\s\S]+?\)\)/,
      greedy: true,
      inside: {
        'punctuation': /\$?\(\(|\)\)/,
        'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/
      }
    },
    {
      pattern: /\$\((?:\([^)]+\)|[^()])+\)/,
      greedy: true,
      inside: {
        'punctuation': /\$\(|\)/
      }
    },
    /\$(?:[\w#?*!@$]+|\{[^}]+\})/
  ],
  'builtin': /\b(?:alias|bg|bind|break|builtin|caller|cd|command|compgen|complete|compopt|continue|declare|dirs|disown|echo|enable|eval|exec|exit|export|fc|fg|getopts|hash|help|history|jobs|kill|let|local|logout|mapfile|popd|printf|pushd|pwd|read|readonly|return|set|shift|shopt|source|suspend|test|times|trap|type|typeset|ulimit|umask|unalias|unset|wait|cargo|rustc|rustup|npm|node|git|curl|wget|cat|ls|mkdir|rm|cp|mv|chmod|chown|sudo|apt|yum|brew|pip|python|java|javac)\b/,
  'keyword': /\b(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|until|do|done|time)\b/,
  'function': /\w+(?=\s*\(\s*\))/,
  'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
  'file-descriptor': /\b\d+(?=\s*[<>])/,
  'operator': /--?|\+\+?|!=?|=~|=?=|<=?|>=?|&&|\|\||[&|;<>(){}[\]]/,
  'punctuation': /[,.:]/
};

// Update bash grammar
Prism.languages.bash = {
  ...Prism.languages.bash,
  ...shellTokens
};

// Create aliases for different shell types
Prism.languages.shell = Prism.languages.bash;
Prism.languages.terminal = Prism.languages.bash;

export interface HighlightOptions {
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

export function highlightCode(code: string, options: HighlightOptions = {}): string {
  const { language = 'rust', showLineNumbers = false, highlightLines = [] } = options;
  
  try {
    // Clean the code
    const cleanCode = code.trim();
    
    // Get the language grammar
    const grammar = Prism.languages[language];
    if (!grammar) {
      console.warn(`Language '${language}' not found, falling back to plain text`);
      return escapeHtml(cleanCode);
    }
    
    // Highlight the code
    let highlighted = Prism.highlight(cleanCode, grammar, language);
    
    // Add line numbers if requested
    if (showLineNumbers || highlightLines.length > 0) {
      highlighted = addLineNumbers(highlighted, highlightLines);
    }
    
    return highlighted;
  } catch (error) {
    console.error('Syntax highlighting failed:', error);
    return escapeHtml(code);
  }
}

function addLineNumbers(code: string, highlightLines: number[] = []): string {
  const lines = code.split('\n');
  return lines
    .map((line, index) => {
      const lineNumber = index + 1;
      const isHighlighted = highlightLines.includes(lineNumber);
      const lineClass = isHighlighted ? 'highlighted-line' : '';
      
      return `<span class="line ${lineClass}"><span class="line-number">${lineNumber}</span>${line}</span>`;
    })
    .join('\n');
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Export Prism for direct use if needed
export { Prism };