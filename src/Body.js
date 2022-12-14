import React, { useState, useEffect } from "react"
import styled from "styled-components"


const generateColor = () => {
  let color = "#"
  const colors = {
    10: "a",
    11: "b",
    12: "c",
    13: "d",
    14: "e",
    15: "f",
  }
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * 16)
    if (randomNumber > 9) {
      color += colors[randomNumber]
    } else {
      color += randomNumber
    }
  }
  return color
}

const Body = () => {
  const [background, setBackground] = useState("")
  const [answers, setAnswers] = useState([])
  const [isWrong, setIsWrong] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [guess, setGuess] = useState("")

  const checkAnswer = (e) => {
    e.preventDefault()
    const guess = e.target.innerHTML
    setGuess(guess)
    if (guess === background) {
      setCorrect(true)
      setIsWrong(false)
    } else {
      setIsWrong(true)
      setCorrect(false)
    }
  }

  useEffect(() => {
    if (isWrong === true) return
    const actualColor = generateColor()
    setBackground(actualColor)
    setAnswers(
      [actualColor, generateColor(), generateColor()].sort(
        () => 0.5 - Math.random()
      )
    )
  }, [guess])

  return (
    <Wrapper>
      <section
        style={{ backgroundColor: background }}
        className="display-color"
      >
        {background}
      </section>

      <section className="choice-container">
        {answers.map((item, index) => {
          return (
            <button
              className="choice"
              key={index}
              onClick={(e) => checkAnswer(e)}
            >
              {item}
            </button>
          )
        })}
      </section>
      {correct && <h4 className="result">Correct</h4>}
      {isWrong && <h4 className="result ">Wrong</h4>}
    </Wrapper>
  )
}

const Wrapper = styled.main`
  width: 400px;
  margin: 0 auto;

  .display-color {
    margin: 30px 0;
    background-color: grey;
    width: 100%;
    height: 200px;
    border: 1px solid black;
  }
  .choice-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    .choice {
      height: 75px;
      cursor: pointer;
      background-color: beige;
    }
  }
  .result {
    text-align: center;
    margin-top: 20px;
  }
`
export default Body
