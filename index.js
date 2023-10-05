const express = require("express");
const chalk = require("chalk");
const { addNote, getNote, removeNote, editNote } = require("./notes.controller");
const path = require('path')


const port = 3004;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNote(),
    created: false
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNote(),
    created: true
  });
});

app.put('/:id', async (req, res) => {
  const text = req.body;
  console.log(text);
  // await editNote(req.params.id, 'test')
  res.render("index", {
    title: "Express App",
    notes: await getNote(),
    created: true
  });
})

app.delete('/:id',async (req, res) => {
  await removeNote(req.params.id)

  res.render("index", {
    title: "Express App",
    notes: await getNote(),
    created: false
  });
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port... ${port}`));
});
