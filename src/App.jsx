import { useEffect, useState } from "react";
import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use'
import Die from "./assets/Components/Die";
import { nanoid } from "nanoid";

function App() {

  const { width, height } = useWindowSize()
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)

  // to keep two pieces of state in sync we use useEffect
  useEffect(()=> {
   const allIsHeld = dice.every((die)=> die.isHeld)
   const firstDieValue = dice[0].value
   const allSameValue = dice.every((die)=> die.value === firstDieValue)
   if(allIsHeld && allSameValue){
    setTenzies(true)
    // console.log("You won")
   }
  }, [dice])


        // generate random die number
        function generateNewDie(){
          let randomNumber = Math.floor(Math.random() * 6) + 1;
          return {
          // instead of pushing the number we are pushing the object having certain properties
            id: nanoid(),
            value: randomNumber,
            isHeld: false
          } 
        }

       // push the random number to the array
       function allNewDice() {
        const newArr = [];
        for (let i = 0; i < 10; i++) {
          newArr.push(generateNewDie());
        }
        return newArr;
      }
        
    // hold dice if clicked
    function holdDice(id) {
        setDice((oldDice) =>
        oldDice.map((die) =>
        {
          return die.id === id && !tenzies ?
          {
            ...die,
            isHeld: !die.isHeld
        } : die
        }  
        ))
    }

      // reset new game
    function newGame(){
      setDice(allNewDice())
      setTenzies(false)
    }

      // roll dice 
      function rollDice (){   
        tenzies ? 
         newGame()
        :
      setDice(oldDice => oldDice.map((die)=>
      {
        return die.isHeld === true ? 
        die : 
        generateNewDie()
      })) 
      }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={()=> holdDice(die.id)}
    />
  ));
  return (
    <>
      <main>
        {tenzies && <Confetti
         width={width}
         height={height}
          />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
        </p>
        <div className="dice-container">
          {diceElements}
          </div>
        <button 
        onClick={rollDice} 
        className="roll-btn">
        {tenzies ? "New Game" : "Roll Dice"}
        </button>
      </main>
    </>
  );
}

export default App;
