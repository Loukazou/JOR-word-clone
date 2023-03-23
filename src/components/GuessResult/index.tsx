import { GameState } from "../../App"
import { NUM_OF_LETTERS_ALLOWED } from "../../constants"

interface GuessResultProps {
   guessList: ReturnType<GameState['guessList']>
}

export default function GuessResult({guessList}: GuessResultProps) {
	return (
		<>
			<div className="guess-results">
				{guessList.map(({ guess, id }) => {
					return (
						<p className="guess" key={id}>
							{guess.length > 0
								? guess.map(({ letter, status }, i) => {
										return (
											<span
												className={`cell ${status || ""}`}
												key={i}
											>
												{letter}
											</span>
										)
								  })
								: Array.from({
										length: NUM_OF_LETTERS_ALLOWED,
								  }).map((_, i) => {
										return <span className="cell" key={i}></span>
								  })}
						</p>
					)
				})}
			</div>
		</>
	)
}
