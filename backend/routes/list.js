const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, completed, id } = req.body;
    const existingUser = await User.findById(id);
    console.log(req.file);
    if (existingUser) {
      const list = new List({
        title,
        completed,
        body,
        user: existingUser,
      });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, completed } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, {
      title,
      body,
      completed,
    });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    console.log(req.params.id);
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: {
        list: req.params.id,
      },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});
router.get("/getTasks/:id", async (req, res) => {
  List.find({ user: req.params.id })
    .sort({ createdAt: -1 })
    .then((response) => {
      if (response.length !== 0) {
        res.send(response);
      } else {
        res.status(200).json({ message: "No Tasks" });
      }
    });
});
module.exports = router;
