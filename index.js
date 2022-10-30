const fs = require("fs");

const extractFrames = require("ffmpeg-extract-frames");
const seurat = require("seurat");
const imageToAscii = require("image-to-ascii");

let fps = 37.5;

async function extract() {
  await extractFrames({
    input: "./badapple.mp4",
    output: "./frames/frame-%d.png",
  });
}

async function play() {
  let files = fs.readdirSync("./frames/");

  files.sort(function (a, b) {
    return a.split(".")[0].split("-")[1] - b.split(".")[0].split("-")[1];
  });

  (function loop() {
    setTimeout(function () {
      console.clear();

      seurat
        .convert(`./frames/${files[0]}`, {
          width: 100,
          height: 50,
          threshold: 25,
        })
        .then(function (result) {
          console.log(result);
          files.shift();
        });

      if (files.length > 0) {
        loop();
      }
    }, 1000 / fps);
  })();
}

async function playGif() {
  let files = fs.readdirSync("./gif/");

  files.sort(function (a, b) {
    return a.split(".")[0].split("-")[1] - b.split(".")[0].split("-")[1];
  });

  (function loop() {
    setTimeout(function () {
      console.clear();

      imageToAscii(`./gif/${files[0]}`, (err, result) => {
        console.log(result);
        files.shift();
      });

      if (files.length > 0) {
        loop();
      }
    }, 1000 / fps);
  })();
}

play();
