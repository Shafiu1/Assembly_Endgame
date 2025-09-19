// import { useState } from 'react'
import { languages } from './assets/components/languages'
function App() {
  // const [count, setCount] = useState(0)

  const languagesList = languages.map(language=><span className='chips' style={{
    backgroundColor: language.backgroundColor,
    color:language.color
  }} key={language.name}>{language.name}</span>)
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attemps to keep the programming world safe from Assembly!</p>
      </header>
      <section className='game-status'>
        <h2>You Win!</h2>
        <p>Well Done🎉</p>
      </section>
      <section className='language-chips'>
          {languagesList}
      </section>
    </main>
  )
}

export default App
