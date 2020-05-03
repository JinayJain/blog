const fm = require("front-matter");
const path = require("path");
const fs = require("fs");
const marked = require("marked");

marked.setOptions({
    highlight: function (code, lang) {
        const hljs = require("highlight.js");
        const validLanguage = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(validLanguage, code).value;
    },
});

function createPost(postPath) {
    let post = {};
    const source = fs.readFileSync(postPath, "utf8");

    const content = fm(source);
    const attribs = content.attributes;
    post.content = marked(content.body);
    post.title = attribs.title;
    post.author = attribs.author;
    post.path = postPath;
    post.basename = path.basename(postPath, ".md");

    return post;
}

module.exports = createPost;
