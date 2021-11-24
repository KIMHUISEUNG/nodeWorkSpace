// @ts-check

/** eslint-disable no-console */

const express = require("express")
const { request } = require("http")

const exp = require("constants")

const app = express()
app.use(express.json())
app.set("views", "src/views")
app.set("view engine", "pug")

const myRouter = require("./routers/my")
const userRouter = require("./routers/user")
const mainRouter = require("./routers/mainpage")

app.use("/", myRouter)
app.use("/users", userRouter)
app.use("/main", mainRouter)
app.use("/public", express.static("src/public"))
app.use("/images", express.static("src/images"))
app.use("/uploads", express.static("uploads"))

app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

module.exports = app
