const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.get("/download", (req, res) => {
  const url = req.query.url;
  const file = "video.mp4";

  exec(`yt-dlp -f mp4 -o "${file}" "${url}"`, (err) => {
    if (err) return res.send("Download gagal");

    res.download(file, () => {
      fs.unlinkSync(file);
    });
  });
});

app.listen(3000, () => console.log("Server running"));
