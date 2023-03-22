import Game from "./components/Game"
import Header from "./components/Header"

import "./reset.css"
import "./styles.css"

function App() {
  return (
    <>
    <div className="wrapper">
      <Header />

      <div className="game-wrapper">
        <Game />
      </div>
    </div>
  </>
  )
}

export default App
