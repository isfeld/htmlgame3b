import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.75
  const CACTUS_INTERVAL_MIN = 500
  const CACTUS_INTERVAL_MAX = 2000
  const worldElem = document.querySelector("[data-world]")
  
  let nextCactusTime
  export function setupShoe() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-shoe]").forEach(shoe => {
      shoe.remove()
    })
  }
  
  export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-shoe]").forEach(shoe => {
      incrementCustomProperty(shoe, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(shoe, "--left") <= -100) {
        shoe.remove()
      }
    })
  
    if (nextShoeTime <= 0) {
      createShoe()
      nextShoeTime =
        randomNumberBetween(SHOE_INTERVAL_MIN, SHOE_INTERVAL_MAX) / speedScale
    }
    nextShoeTime -= delta
  }
  
  export function getShoeRects() {
    return [...document.querySelectorAll("[data-shoe]")].map(shoe => {
      return shoe.getBoundingClientRect()
    })
  }
  function createShoe() {
    const Shoe = document.createElement("img")
    Shoe.dataset.cactus = true
    Shoe.src = "imgs/shoe.png"
    Shoe.classList.add("Shoe")
    setCustomProperty(Shoe, "--left", 100)
    worldElem.append(Shoe)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }