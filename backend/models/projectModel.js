const mongoose = require("mongoose");

 mongoose.connect('mongodb://127.0.0.1:27017/codeIDE');

// mongoose.connect('mongodb+srv://rishirajtiwari200002:1KOZs66F6i1hTQ1z@cluster0.tnc28.mongodb.net/codeIDE');
const projectSchema = new mongoose.Schema({
  title: String,
  createdBy: String,
  date: {
    type: Date,
    default: Date.now,
  },
  htmlCode: {
    type: String,
    default: `<!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Project</title>
    </head>
    <body>
        <!-- Your content goes here -->
    </body>
    </html>`,
  },
  cssCode: {
    type: String,
    default: `body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }`,
  },

  jsCode: {
    type: String,
    default: `console.log("Hello!");`,
  },
});

module.exports = mongoose.model("Project", projectSchema);
