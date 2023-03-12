const fs = require("fs");
const superagent = require("superagent");

const whiteFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not white the file");
      resolve("Success");
    });
  });
};

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file!");
      resolve(data);
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body);

    return whiteFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random img written!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// some changes
