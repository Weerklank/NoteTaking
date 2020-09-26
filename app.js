const express = require("express")
const htmlRoutes = require("./routes/html-routes")
const apiRoutes = require("./routes/api-routes")

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes)

// app.get("/notes", function(req,res) {
//     console.log("you did try")
//     res.sendFile(path.join(_dirname,"./public/notes.html"))
// })

// app.get("*", function(req,res) {
//     res.sendFile(path.join(_dirname,"./public/index.html"))
// })

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));