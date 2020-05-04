const fm = require("front-matter");
const path = require("path");
const fs = require("fs");
const hljs = require("highlight.js");
const mdkatex = require("markdown-it-katex");
const dateFormat = require("dateformat");

var md = require("markdown-it")({
    typographer: true,
    linkify: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    "</code></pre>"
                );
            } catch (__) {}
        }

        return (
            '<pre class="hljs"><code>' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
        );
    },
});
md.use(mdkatex);

function createPost(postPath) {
    let post = {};
    const source = fs.readFileSync(postPath, "utf8");

    const content = fm(source);
    const attribs = content.attributes;
    post.content = md.render(content.body);
    post.title = attribs.title;
    post.author = attribs.author;
    post.description = attribs.description;
    post.epochTime = attribs.date * 1000;
    console.log(post.epochTime);
    post.dateString = dateFormat(new Date(post.epochTime), "mediumDate");
    post.path = postPath;
    post.basename = path.basename(postPath, ".md");

    return post;
}

module.exports = createPost;
