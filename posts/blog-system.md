---
title: Programmatic Blogging
author: Jinay Jain
description: A reflection on how I created the static site generator behind this blog.
date: 1588601471
---

Blogs are almost never written in pure HTML. Behind every Medium, Wordpress,
or Blogger post lies some system that converts a human-friendly document into
something more computer friendly. Like a program compiler, they translate and
link different files from your blog into a single site, which your
readers will see. To gain a deeper understanding of how exactly these systems
operate, I decided to build my own system. How hard can it be? Before I dive
into the technical explanation of my blog, I'd like to demonstrate some of
the things it can do.

If you would like, you can jump straight to the [technical explanation](#how-it-works)

## Images

![quokka](/images/quokka.jpg)

A quokka {.caption}

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

$$ L = - \frac{1}{N} \sum_{i=1}^{N} [y_i \log (p_i) + (1 - y_i) \log (1 - p_i)] $$

Here is an inline equation: $y = mx+b$

# How It Works {#how-it-works}

The main idea behind this project is to build a **static site generator**,
something that will compile my blogposts into a single, deployable website.
The term, though, can mean many different things depending on how the system
is implemented, so I had to answer some questions before I started building.

1. How will I write my blogposts?
2. What tools will I use to compile the blog?
3. How will I deploy the blog?

What I ended up choosing was to use Markdown as my syntax for writing, NodeJS
to build the project, and GitHub pages to deploy (using the `gh-pages` NPM
package). These initial choices outlined the general series of steps needed to assemble my blog generator.

## Rendering Markdown Files

[Markdown](https://en.wikipedia.org/wiki/Markdown) (the syntax language for
GitHub README's and many texting platforms), has a relatively simple syntax
that enables a writer to define very basic text editing features: headers,
bolding/italics, links, or code. This allows programmers to easily convert Markdown into other formats like LaTeX documents, Beamer presentations, and HTML pages. In fact, the [pandoc](https://pandoc.org/) tool includes native support for converting markdown into a plethora of other file formats, allowing the user to control much of the styling and formatting of the document.

If I wanted to, I might have created a simple parser for Markdown myself.
But---of course---there was a neat NPM package that did the work for me,
[markdown-it](https://github.com/markdown-it/markdown-it). In my code, I
simply read the desired Markdown file as a string and the simple
`md.render(source)` would parse the document and convert it into HTML tags. `markdown-it` has several extensions that add extra syntax support for more specific needs. I added the `markdown-it-katex` package to include math equation rendering.

While rendering, a line like

```
$$ f(x)=\int_{0}^{1} x^2 dx $$
```

is converted into

$$f(x)=\int_{0}^{1} x^2 dx$$

which makes life much easier than trying to explain a loss function with convoluted notation like `(y_i - p_i)^2`.

I plan on adding some other syntax features as my needs evolve, but the ability to extend the core funcitonality of Markdown is why it's such an appealing language for developers.

## Capturing Post Metadata

Some information about the posts---the title, creation date, URL,
etc.---shouldn't be directly shown to the user, so I created a way to handle
that data first before feeding it into `markdown-it`. Most SSG systems either
include this metadata in separate files or within a special section in their
Markdown called the front matter. I chose to use the latter, which meant my
Markdown files would have a small section above the Markdown storing the
metadata. For example, here's the front matter for this post:

```
---
title: How I Built My Blog
author: Jinay Jain
description: A reflection on how I created the static site generator behind this blog.
date: 1588601471
---
```

As is a general theme in this post, an NPM package called `front-matter`
handled the retrieval of this metadata for each file, returning an object
that contains the fields of the metadata as properties. The remaining text
after the front matter is also returned, which I then feed into
`md.render()`.

## Styling and Formatting Posts

After `markdown-it` renders and outputs the HTML content for the post, it is
embedded into the post template written in the HTML templating language
Handlebars. The `post.hbs` file, which outlines the general format of a post,
includes spaces for the site generator to replace with the post's title,
content, and other metadata. The file, although very small, enables me to
customize how posts are formatted and include items like a static footer into
each post. Currently, the code looks like this, but I can iterate and develop
on it as my needs change:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../../styles/post.css" />
        <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/an-old-hope.min.css"
        />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
        />
        <title>{{ title }}</title>
    </head>

    <body>
        <div class="content">
            <div class="header">
                <div class="title-bar">
                    <h1 class="title">{{ title }}</h1>
                    <h3><a href="../..">home</a></h3>
                </div>
                <h3 class="author">
                    {{ author }}<span class="date"> - {{ dateString }}</span>
                </h3>
            </div>
            {{{ content }}}
        </div>
    </body>
</html>
```

The styling for these posts is done through SCSS, which is compiled with the
posts during the `build` script. Since the `post.hbs` file imports the same
CSS for each post, I can change the styling for all posts using a single
`post.scss` SCSS file.

# Final Thoughts

Though I might have had a wider range of prebuilt features from an existing
system like Jekyll, the satisfaction of building the features I need for my
blog supersedes the convenience of using such a system. This post defines
only a tentative view of what features my blog contains, and the true state
of the SSG will be an amalgamation of what features I need from such a
system. Once I have developed the static site generator enough, I hope to
distribute it as open source software for others to use. But for now, it
shall remain a practical tool for maintaining my personal blog and nothing
more.

If you would like to download or inspect the code for this blog, you can find the GitHub repository [here](https://github.com/jinayjain/blog).
