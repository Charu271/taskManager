const express = require("express");
require("./db/mongoose.js");

const app = express();
const port = process.env.PORT;

const userRouter = require("./Router/userRouter.js");
const taskRouter = require("./Router/taskRouter.js");

// app.use((req, res, next) => {
//   res.status(503).send("Under maintainance");
// });

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("This route is disabled");
//   } else {
//     next();
//   }
// });
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.endsWith(".pdf")) {
    //   cb(new Error("Please upload pdf file"));
    // }
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      cb(new Error("Please upload word document"));
    }
    cb(undefined, true);
    // cb(new error("Please upload pdf file"));
    // cb(undefined,true);
    // cb(undefined,false);
  },
});
app.post(
  "/upload",
  upload.single("picture"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
app.listen(port, () => {
  console.log("server is up at port " + port);
});

// const Task = require("./models/Tasks");
// const User = require("./models/Users");
// const main = async () => {
//   // const task = await Task.findById("5fcb1b8e1d0e2d11001bff48");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);
//   const user = await User.findById("5fc9f7b7bdc6012668a2e4d9");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
// const obj = { name: "Charu" };
// obj.toJSON = function () {
//   console.log(this);
//   return {};
// };
// console.log(obj, "***");
// console.log(JSON.stringify(obj));
// const jwt = require("jsonwebtoken");
// function call() {
//   const token = jwt.sign({ _id: "abc123" }, "nodejscourse");
//   console.log(token);
// }
// call();
// const bcrypt = require("bcrypt");
// const hashPassword = async () => {
//   const pass = "Charu123";
//   const hashPass = await bcrypt.hash(pass, 8);
//   console.log(pass);
//   console.log(hashPass);
// };
// hashPassword();

// const express = require("express");
// require("./db/mongoose.js");
// const user = require("./models/Users.js");
// const task = require("./models/Tasks.js");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// app.post("/users", async (req, res) => {
//   const newUser = new user(req.body);

//   try {
//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (e) {
//     res.status(400).send(e);
//   }

//   // newUser
//   //   .save()
//   //   .then(() => {
//   //     res.status(201).send(newUser);
//   //   })
//   //   .catch((e) => {
//   //     res.status(400).send(e);
//   //   });
// });

// app.get("/users", async (req, res) => {
//   try {
//     const users = await user.find({});
//     res.send(users);
//   } catch (e) {
//     res.status(500).send();
//   }
//   // user
//   //   .find({})
//   //   .then((users) => {
//   //     res.send(users);
//   //   })
//   //   .catch(() => {
//   //     res.status(500).send();
//   //   });
// });

// app.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await user.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }
//   // user
//   //   .findById(_id)
//   //   .then((user) => {
//   //     if (!user) {
//   //       return res.status(404).send();
//   //     }
//   //     res.send(user);
//   //   })
//   //   .catch(() => {
//   //     res.status(500).send();
//   //   });
// });

// app.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   try {
//     const user = await user.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await user.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

// app.post("/tasks", async (req, res) => {
//   const newTask = new task(req.body);
//   try {
//     await newTask.save();
//     res.status(201).send(newTask);
//   } catch (e) {
//     res.status(400).send(e);
//   }
//   // newTask
//   //   .save()
//   //   .then(() => res.status(201).send(newTask))
//   //   .catch((e) => res.status(400).send(e));
// });

// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await task.find({});
//     res.send(tasks);
//   } catch (e) {
//     res.status(500).send();
//   }
//   // task
//   //   .find({})
//   //   .then((tasks) => {
//   //     res.send(tasks);
//   //   })
//   //   .catch(() => {
//   //     res.status(500).send();
//   //   });
// });
// app.get("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const task = await task.findById(_id);
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
//   // task
//   //   .findById(_id)
//   //   .then((task) => {
//   //     if (!task) {
//   //       return res.status(404).send();
//   //     }
//   //     res.send(task);
//   //   })
//   //   .catch(() => {
//   //     res.status(500).send();
//   //   });
// });
// // app.patch("/users/:id", async (req, res) => {
// //   const _id = req.params.id;
// //   console.log(_id + "***");
// //   const updates = Object.keys(req.body);
// //   const allowedUpdates = ["name", "email", "password", "age"];
// //   const isValidOperation = updates.every((update) => {
// //     return allowedUpdates.includes(update);
// //   });
// //   console.log(isValidOperation);
// //   console.log(req.body);
// //   if (!isValidOperation) {
// //     return res.status(400).send({ error: "Invalid operation" });
// //   }
// //   try {
// //     const user = await user.findByIdAndUpdate(req.params.id, req.body, {
// //       new: true,
// //       runValidators: true,
// //     });
// //     console.log(user);
// //     console.log(req.body);
// //     if (!user) {
// //       return res.status(404).send();
// //     }
// //     res.send(user);
// //   } catch (e) {
// //     res.status(500).send(e.message);
// //   }
// // });

// app.listen(port, () => {
//   console.log("server is up at port " + port);
// });
