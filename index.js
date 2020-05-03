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

posts.forEach((post) => {
    console.log(`Compiling ${post.path}...`);
    const compiled = postTemplate(post);
    fs.writeFileSync(`${builddir}/posts/${post.basename}.html`, compiled);
});
console.log("Posts compiled.");

const homeTemplate = Handlebars.compile(
    fs.readFileSync("./views/home.hbs", "utf8")
);

fs.writeFileSync(`${builddir}/home.html`, homeTemplate({ posts }));
