const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.use("/blogs/category/:categoryid", async function(req, res) {
    const id = req.params.categoryid;
    try {
        const [blogs, ] = await db.execute("select * from blog where categoryid=?", [id]); 
        const [categories, ] = await db.execute("select * from category");

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory: id
        })
    }
    catch(err) {
        console.log(err);
    }
});

router.use("/blogs/:blogid", async function(req, res) {
    const id = req.params.blogid;
    try {
        const [blogs, ] = await db.execute("select * from blog where blogid=?", [id]);

        const blog = blogs[0];

        if(blog) {
            return res.render("users/blog-details", {
                title: blog.baslik,
                blog: blog
            });
        }
        res.redirect("/");
    }
    catch(err) {
        console.log(err);
    }
});

router.use("/blogs", async function(req, res) {
    try {
        const [blogs, ] = await db.execute("select * from blog where onay=1")
        const [categories, ] = await db.execute("select * from category");

        res.render("users/blogs", {
            title: "Tüm Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory : null
        })
    }
    catch(err) {
        console.log(err);
    }
});

router.use("/", async function(req, res) {
    try {
        const [blogs, ] = await db.execute("select * from blog where onay=1 and anasayfa=1")
        const [categories, ] = await db.execute("select * from category");

        res.render("users/index", {
            title: "Popüler Kurslar",
            blogs: blogs,
            categories: categories,
            selectedCategory : null
        })
    }
    catch(err) {
        console.log(err);
    }
});

/*
router.use("/",function (require, response, next){
    response.sendFile(path.join(__dirname, "..", "views", "users", "index.html"));
});*/

/*
app.use("/blogs/:blogid/users/:username",function (require, response, next){
    console.log(require.params.blogid);
    console.log(require.params.username);
    response.send("blog detay sayfası");
});

app.use(function (require, response, next){
    console.log("middleware 2");
    //response.end("middleware 2");
    next();
});

app.use(function (require, response){
    console.log("middleware 3");
    //response.end("middleware 3");
    response.send("<h1>homapage</h1>");
});
*/
 
module.exports = router;