const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body);

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        console.log("Dog img writed");
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
