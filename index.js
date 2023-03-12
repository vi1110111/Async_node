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

// Async / await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const img = all.map((elem) => {
      return elem.body.message;
    });

    console.log(img);

    await whiteFilePro("dog-img.txt", img.join("\n"));
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY!";
};

(async () => {
  try {
    console.log("1: Start");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Finish");
  } catch (error) {
    console.log("EERRRROOORRR");
  }
})();

// console.log("1: Start");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: Finish");
//   })
//   .catch((err) => {
//     console.log("EERRRROOORRR");
//   });

// Promise
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body);

//     return whiteFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random img written!");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// some changes!
