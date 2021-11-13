// @ts-check

const express = require("express")
const multer = require("multer")
const router = express.Router()

const upload = multer({ dest: "uploads/" })

const USERS = {
  15: {
    nickname: "foo",
    profileImageKey: undefined,
  },
  16: {
    nickname: "bar",
    profileImageKey: undefined,
  },
}

router.get("/", (req, res) => {
  res.send("User list")
})

router.param("id", (req, res, next, value) => {
  // @ts-ignore
  const user = USERS[value]
  if (!user) {
    const err = new Error("User not found.")
    // @ts-ignore
    err.statusCode = 404
    throw err
  }
  // @ts-ignore
  req.user = USERS[value]
  next()
})

// /users/15
router.get("/:id", (req, res) => {
  const resMimeType = req.accepts(["json", "html"])

  if (resMimeType === "json") {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === "html") {
    res.render("user-profile", {
      // @ts-ignore
      nickname: req.user.nickname,
      userId: req.params.id,
      //   profileImageURL: "/uploads/618e2fbe7c5b9e1bc45f23b63a1fb9de",
      profileImageURL: `/uploads/${req.user.profileImageKey}`,
    })
  }
})

router.post("/", (req, res) => {
  // Register user
  res.send("User registered.")
})

router.post("/:id/nickname", (req, res) => {
  // req.body: {"nickname": "bar"}
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname
  res.send(`User nickname updated: ${nickname}`)
})

router.post("/:id/profile", upload.single("profile"), (req, res, next) => {
  console.log(req.file)

  const { user } = req
  const { filename } = req.file
  user.profileImageKey = filename
  res.send(`User profile image uploaded: ${filename}`)
})

module.exports = router
