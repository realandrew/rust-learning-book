<script lang="ts">
  import HighlightedCodeExample from './HighlightedCodeExample.svelte';
</script>

<div class="demo-container">
  <h2 class="text-2xl font-bold text-gray-800 mb-6">🎨 Syntax Highlighting Demo</h2>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="demo-section">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Basic Rust Function</h3>
      <HighlightedCodeExample 
        title="Function with pattern matching"
        code={`fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("fib({}) = {}", i, fibonacci(i));
    }
}`}
      />
    </div>

    <div class="demo-section">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Struct and Implementation</h3>
      <HighlightedCodeExample 
        title="Struct with methods"
        code={`#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(width: u32, height: u32) -> Self {
        Rectangle { width, height }
    }
    
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}`}
      />
    </div>

    <div class="demo-section">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Error Handling</h3>
      <HighlightedCodeExample 
        title="Result and Option types"
        code={`use std::fs::File;
use std::io::Read;

fn read_file_contents(filename: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(filename)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

fn safe_divide(x: f64, y: f64) -> Option<f64> {
    if y != 0.0 {
        Some(x / y)
    } else {
        None
    }
}`}
      />
    </div>

    <div class="demo-section">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Advanced Features</h3>
      <HighlightedCodeExample 
        title="Generics and traits"
        code={`trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}: {}", self.headline, self.content)
    }
}

fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}`}
        showLineNumbers={true}
        highlightLines={[1, 8, 14]}
      />
    </div>
  </div>
</div>

<style lang="postcss">
  .demo-container {
    @apply max-w-6xl mx-auto p-8;
  }
  
  .demo-section {
    @apply space-y-4;
  }
</style>