require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    // res.send("This is Discord Embed! Use /embed/?title=Title etc.<br>Params:<br>title: The title<br>desc: The description<br>color: an optional color<br>image: An optional Image<br>big: If the image should be big (set to true)<br>redirect: Redirect on click<br>name: The name....<br>Poor docs ik xD");
    res.sendFile(__dirname + "/index.html");
});

app.get("/embed", (req, res) => {
    const title = req.query.title || "Default Title";
    const desc = req.query.desc || "Default Description";
    const color = req.query.color || "none";
    const image = req.query.img || "none";
    const big = (req.query.big === "true");
    var redirect = req.query.redirect || "none";
    if(!redirect.startsWith("http")) redirect = "http://" + redirect;
    const name = req.query.name || "none";

    var html = "";
    html += '<meta property="og:title" content="' + title + '" />';
    html += '<meta property="og:description" content="' + desc + '" />';
    if(color != "none") html += '<meta name="theme-color" content="#' + color + '" />';
    if(image != "none") html += '<meta property="og:image" content="' + image + '" />';
    if(big) html += '<meta name="twitter:card" content="summary_large_image">';
    if(redirect != "none") html += '<meta http-equiv="refresh" content="0; url=' + redirect + '" />';
    if(redirect != "none") html += '<script>window.location.href = "' + redirect + '";</script>';
    if(name != "none") html += '<meta content="' + name + '" property="og:site_name">';

    html += "This embed was made using <a href='https://github.com/cfpwastaken/discordembed'>Discord Embed</a>! Learn how to make your own <a href='/'>here</a>";

    if(redirect != "none") html += '<br>This link wants to redirect you to <a href="' + redirect + '">this page</a> and it seems like you have noscript or your browser just doesn\'t support it.';

    res.send(html);
})

app.listen(PORT, () => {
    console.log("Ready!");
});