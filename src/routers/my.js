const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("my-profile")
})

router.get("/self-Intro", (req, res) => {
  res.render("self-Intro")
})

module.exports = router
