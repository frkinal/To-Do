const mongoose = require("mongoose");
const conn = async (req, res) => {
  try {
    // "mongodb+srv://inalfaruk295:3gobE|3bWyr3pjY4@cluster0.tbvhbrd.mongodb.net/"
    await mongoose
      .connect(
        "mongodb+srv://inalfaruk295:3gobEI3bWyr3pjY4@cluster0.tbvhbrd.mongodb.net/"
      )
      .then(() => console.log("Connected"));
  } catch (error) {
    // console.log(error);
    res.status(400).json({ message: "Not Connected" });
  }
};
conn();
