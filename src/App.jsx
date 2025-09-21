import { useState } from 'react'
import {clsx} from 'clsx'
import { languages } from './components/languages.js'
import Confetti from 'react-confetti';
import Utils from './components/utils.jsx'
function App() {
  //state values
  const [currentWord,setCurrentWord]=useState("react");
  const [guessedLetters,setGuessedLetters]=useState([]);

  //static value
  const alphabet="abcdefghijklmnopqrstuvwxyz";
  const letterElement = currentWord.toUpperCase().split("").map((word, index) => {
    if (guessedLetters)
      return <span key={index}>{guessedLetters.includes(word) ? word : ""}</span>
  })

  //derived values
  const wrongGuessCount = 
    guessedLetters.filter(letter=>(!currentWord.toUpperCase().split("").includes(letter)));
  
    const isGameWon = currentWord.toUpperCase().split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount.length >=languages.length-1;
  const isGameOver = isGameLost || isGameWon;
  console.log(wrongGuessCount.length);
  const lastGuessLetter = guessedLetters[guessedLetters.length-1];
  const isLastGuessIncorrect =lastGuessLetter && !currentWord.includes(lastGuessLetter)


  function addGuessLetter(letter){
      setGuessedLetters(prevLetter=>
        prevLetter.includes(letter)?prevLetter:[...prevLetter,letter]
      )
  }

  const languagesList = languages.map((language,index)=>{
    const isLanguageLost = wrongGuessCount.length > index;
    const className=clsx("chips ",isLanguageLost && "lost");
  return(<span 
      className={className} 
      style={{
          backgroundColor: language.backgroundColor,
          color:language.color
      }} 
      key={language.name}
      >
        {language.name}
      </span>
    )})

  
  const keyboardElement = alphabet.toUpperCase().split("").map((letter,index)=>{

    const isGuessed=guessedLetters.includes(letter);
    const isCorrect=isGuessed && currentWord.toUpperCase().split("").includes(letter);
    const isWrong = isGuessed && !currentWord.toUpperCase().split("").includes(letter);
    const className=clsx({
      correct:isCorrect,
      wrong:isWrong,
    });
    return (<button 
      className={className}
      key={index} 
      onClick={() => addGuessLetter(letter)}
      >
        {letter}
      </button>
    )
  })
  
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost
  })

  const lang = wrongGuessCount.length>0?languages[wrongGuessCount.length-1].name:"";
  console.log(lang);
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attemps to keep the programming world safe from Assembly!</p>
      </header>
      {wrongGuessCount.length>0 && <section className='farewell-msg'>
        <h2>{<Utils language={lang}/>}</h2>
      </section>}
      <section className={gameStatusClass}>
        {isGameOver ? (
          isGameWon ? (
            <>
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
            </>
          ) : (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly 😭</p>
            </>
          )
        ) : (
          null
        )
        }
      </section>
      <section className='language-chips'>
          {languagesList}
      </section>
      <section className='word'>
          {letterElement}
      </section>
      <section className='keyboard'>
        {keyboardElement}
      </section>
    {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}

export default App
