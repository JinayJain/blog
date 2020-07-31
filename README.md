# Blog Generator

The static site generator I built to compile my blog from Markdown, SCSS, and Handlebars to a deployable website.

## Features

* Image embedding with captions
* Code blocks with syntax highlighting for 189 languages using [highlight.js](https://highlightjs.org/)
* LaTeX-like equation rendering
* Customizability through page templates using Handlebars
* Front-matter parsing for post metadata such as the date, author, and hidden flag.

## Usage

Posts are written and stored in the ``posts`` directory, and the final site is built in the ``build`` directory. 
This project uses [Yarn](https://classic.yarnpkg.com/en/) to manage packages and run scripts, but NPM can also be used with minor modifications to the ``package.json``.

To begin compiling your own blog, complete the following steps.

1. Write your posts in Markdown and store them in the ``posts`` folder. For examples of the syntax, look at the existing posts in this repository.
2. During development, use ``yarn watch`` to enable hot-reloading for compiling to the ``build`` folder.
3. To build the project once, use ``yarn build``.
4. For deployment to GitHub pages, use ``yarn deploy`` to a preconfigured GitHub repository.
