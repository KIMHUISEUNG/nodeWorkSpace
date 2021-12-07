const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("my-profile")
})

router.get("/self-Intro", (req, res) => {
  res.render("self-Intro")
})

router.get("/dev-stack", (req, res) => {
  res.render("dev-stack")
})

router.get("/about", (req, res) => {
  res.render("about")
})

router.get("/connection", (req, res) => {
  res.render("connection")
})

module.exports = router
