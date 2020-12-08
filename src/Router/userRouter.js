const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const user = require("../models/Users.js");
const auth = require("../middleware/auth.js");
const { welcomeEmail, cancellationEmail } = require("../emails/accounts.js");
const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload image"));
    }
    cb(undefined, true);
  },
});
router.post("/users", async (req, res) => {
  const newUser = new user(req.body);

  try {
    await newUser.save();
    welcomeEmail(newUser.email, newUser.name);
    const token = await newUser.getAuthToken();
    res.status(201).send({ newUser, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const User = await user.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await User.getAuthToken();
    res.send({ User, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.User.tokens = req.User.tokens.filter((token) => {
      return token.token !== req.token;
    });
    console.log(req.User.tokens);
    await req.User.save();
    console.log(req.User.tokens);
    res.send();
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.User.tokens = [];
    await req.User.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/users/me", auth, async (req, res) => {
  // req.User = await req.User.getPublicProfile();
  res.send(req.User);
  // try {
  //   const users = await user.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.status(500).send();
  // }
});

// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const User = await user.findById(_id);
//     if (!User) {
//       return res.status(404).send();
//     }
//     res.send(User);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // const User = await user.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    //const User = await user.findById(req.params.id);
    updates.forEach((update) => (req.User[update] = req.body[update]));
    await req.User.save();
    // if (!User) {
    //   return res.status(404).send();
    // }

    res.send(req.User);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const User = await user.findByIdAndDelete(req.params.id);
    // if (!User) {
    //   return res.status(404).send();
    // }
    await req.User.remove();
    cancellationEmail(req.User.email, req.User.name);
    res.send(req.User);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 250, width: 250 })
      .png()
      .toBuffer();
    req.User.avatar = buffer;
    await req.User.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.User.avatar = undefined;
  await req.User.save();
  res.send();
});
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const User = await user.findById(req.params.id);
    if (!User || !User.avatar) {
      throw new Error();
    }
    // By default express sets the content type to /application/json
    // to view the file we have data:image/jpg;base64, <binary>
    res.set({ "Content-Type": "image/png" });
    res.send(User.avatar);
  } catch (e) {
    res.status(400).send();
  }
});
module.exports = router;
