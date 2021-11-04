// @ts-check
/* eslint-disable no -restricted-syntax */

/**
 * @typedef Person
 *
 * @property {number} age
 * @property {string} city
 * @property {string | string[]} [pet]
 */

/** @type {Person[]} */
const people = [
  {
    age: 20,
    city: "서울",
    pet: ["cat", "dog"],
  },
  {
    age: 40,
    city: "부산",
  },
  {
    age: 31,
    city: "대구",
    pet: ["cat", "dog"],
  },
  {
    age: 36,
    city: "서울",
  },
  {
    age: 27,
    city: "부산",
    pet: "cat",
  },
  {
    age: 24,
    city: "서울",
    pet: "dog",
  },
]

/**
 * 다음 문제들을 풀어봅시다.
 *
 * A. 30대 미만이 한 명이라도 사는 모든 도시
 * B. 각 도시별로 개와 고양이를 키우는 사람의 수
 */

function solveA() {
  /** @type {string[]} */
  const cities = []

  for (const person of people) {
    if (person.age < 30) {
      if (!cities.find((city) => person.city === city)) {
        cities.push(person.city)
      }
    }
  }

  return cities
}
function solveAModern() {
  const allCities = people.filter(({ age }) => age < 30).map(({ city }) => city)
  const set = new Set(allCities) //배열을 Set()을 이용해 집합으로 변경
  return Array.from(set) //집합을 배열로 바꾸어 return
}

// console.log("solveA ", solveA())
// console.log("solveAModern", solveAModern())

/** B. 각 도시별로 개와 고양이를 키우는 사람의 수 */
/** @typedef {Object.<string, Object.<string, number>>} PetsOfCities */
function solveB() {
  /** @type {PetsOfCities} */
  const result = {}

  for (const person of people) {
    const { city, pet: petOrPets } = person

    if (petOrPets) {
      const petsOfCity = result[city] || {}
      if (typeof petOrPets === "string") {
        const pet = petOrPets

        const origNumPetOfCity = petsOfCity[pet] || 0
        petsOfCity[pet] = origNumPetOfCity + 1
      } else {
        for (const pet of petOrPets) {
          const origNumPetOfCity = petsOfCity[pet] || 0
          petsOfCity[pet] = origNumPetOfCity + 1
        }
      }
      result[city] = petsOfCity
    }
  }
  return result
}

function solveBModern() {
  return people
    .map(({ pet: petOrPets, city }) => {
      const pets =
        (typeof petOrPets === "string" ? [petOrPets] : petOrPets) || []

      return {
        city,
        pets,
      }
      /**
       * [
       *  [
       *    ["서울", "cat"],
       *    ["서울", "dog"],
       *  ],
       *  [
       *    ["부산", "dog"],
       *  ],
       * ]
       */
    })
    .flatMap(({ city, pets }) => pets.map((pet) => [city, pet]))
    .reduce((/** @type {PetsOfCities} */ result, [city, pet]) => {
      if (!city || !pet) {
        return result
      }

      return {
        ...result,
      }
    }, {})
}
console.log("solveB", solveB())
console.log("solveBModern", solveBModern())
