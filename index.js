const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const createPost = require("./create-post");

const builddir = "build";

const posts = fs
    .readdirSync("posts/")
    .map((postPath) => createPost("posts/" + postPath));

const postFile = fs.readFileSync("./views/post.hbs", "utf8");
const postTemplate = Handlebars.compile(
    fs.readFileSync("./views/post.hbs", "utf8")
);

// TODO: clear build/posts and build/styles for compilation output
fs.rmdirSync(`${builddir}/posts`, {
    recursive: true,
});
fs.mkdirSync(`${builddir}/posts`);

posts.forEach((post) => {
    console.log(`Compiling ${post.path}...`);
    const compiled = postTemplate(post);
    fs.mkdirSync(`${builddir}/posts/${post.basename}`);
    fs.writeFileSync(`${builddir}/posts/${post.basename}/index.html`, compiled);
});
console.log("Posts compiled.");

console.log("Compiling home page.");
const homeTemplate = Handlebars.compile(
    fs.readFileSync("./views/home.hbs", "utf8")
);

fs.writeFileSync(`${builddir}/index.html`, homeTemplate({ posts }));
