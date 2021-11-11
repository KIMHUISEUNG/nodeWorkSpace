//test의 다른 의미로 spec을 사용한다. 즉 이파일은 js에게 원하는 동장을 정의한다.
/** eslint-disable no-undef */

const supertest = require("supertest")
const app = require("./app")

const request = supertest(app)

test("retrieve user json", async () => {
  const result = await request.get("/users/15").accept("application/json")

  expect(result.body).toMatchObject({
    nickname: expect.any(String),
  })
})

test("retrieve user page", async () => {
  const result = await request.get("/users/15").accept("text/html")

  expect(result.text).toMatch(/^<html>.*<\/html>$/)
})

test("Update nickname", async () => {
  const newNickname = "newNickname"

  const res = await request
    .post("/users/15/nickname")
    .send({ nickname: "newNickname" })
  expect(res.status).toBe(200)

  const userResult = await request.get("/users/15").accept("application/json")
  expect(userResult.status).toBe(200)
  expect(userResult.body).toMatchObject({
    nickname: newNickname,
  })
})
