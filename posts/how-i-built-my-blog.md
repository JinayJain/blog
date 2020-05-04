---
title: How I Built My Blog (WIP)
author: Jinay Jain
description: A reflection on how I created the static site generator behind this blog.
date: 1588601471
---

Blogs are almost never written in pure HTML. Behind every Medium, Wordpress,
or Blogger post lies some system that converts a human-friendly document into
something more computer friendly. Like a program compiler, they translate and
link different files that represent your blog into a single site that your
readers will see. To gain a deeper understanding of how exactly these systems
operate, I decided to build my own system. How hard can it be? Before I dive
into the technical explanation of my blog, I'd like to demonstrate some of
the things it can do.

If you would like, you can jump straight to the [technical explanation](#how-it-works)

## Images

![quokka](quokka.jpg)

Of course, any blog needs a way to handle images or graphics.

## Code

A core feature of many technical blogs, I wanted to have a clean way of
displaying code snippets in tandem with my blog writing. Each code block is
automatically highlighted according to what language it's in.

**C++**

```cpp
int main() {
    printf("Hello, world");
    return 0;
}
```

**Python**

```python
if foo:
    print("Hello, world")
else:
    print("Goodbye, world")
```

**HTML**

```html
<div class="container">
    <p>Hello, world</p>
</div>
```

I can even reference code inline: `int x = 5;`

## Math

In some cases, I might need equations to support my explanations. Using LaTeX
syntax, I can embed math into my posts. Once again, they can either be inline
or displayed as a centered block.

$$ L = - \frac{1}{N} \sum_{i=1}{N} [y_i \log (p_i) + (1 - y_i) \log (1 - p_i)] $$

Here is an inline equation: $y = mx+b$

# How It Works {#how-it-works}

The main idea behind this project is to build a **static site generator**,
something that will compile my blogposts into a single, deployable website.
The term, though, can mean many different things, and I had to answer some
questions before I started building.

1. How will I write my blogposts?
2. What tools will I use to compile the blog?
3. How will I deploy the blog?

What I ended up choosing was to use Markdown as my syntax for writing, NodeJS
to build the project, and GitHub pages to deploy (using the `gh-pages` NPM
package).
