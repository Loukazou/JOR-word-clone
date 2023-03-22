import { ChangeEvent, FormEvent, useState } from "react"
import { initialState } from "../../App"
import { NUM_OF_GUESSES_ALLOWED } from "../../constants"
import { checkGuess } from "../../game-helpers"

export type Guess = {
	letter: string
	status: string
}[]

interface GameProps {
	addGuessToList: (guess: Guess, attempt: number) => void
	initialGuess?: { guess: string }
	resetGuessList: () => void
	answer: string
}

function Game({
	addGuessToList,
	resetGuessList,
	answer,
	initialGuess = { guess: "" },
}: GameProps) {
	const [state, setState] = useState(initialGuess)
	const [status, setStatus] = useState(initialState.status)
	const [attempt, setAttempt] = useState(initialState.count)

	const handleWin = () => setStatus("win")
	const handleLose = () => setStatus("lose")
	const handleReset = () => {
		setState(initialGuess)
		setStatus(initialState.status)
		setAttempt(initialState.count)
		resetGuessList()
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const validGuess = state.guess.length === 5
		if (!validGuess) return

		const result = checkGuess(state.guess, answer)
		if (!result) return

		const everyLetterIsCorrect = result.every(
			(letter) => letter.status === "correct",
		)
		const maxAttemptReached = attempt === NUM_OF_GUESSES_ALLOWED - 1

		addGuessToList(result, attempt)
		setAttempt(attempt + 1)

		if (everyLetterIsCorrect) handleWin()
		else if (maxAttemptReached) handleLose()

    // Reset input
		setState(initialGuess)
	}

	const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const guess = e.target.value
			.replace(/[^a-zA-Z]/g, "")
			.slice(0, 6)
			.toUpperCase()
		setState({ guess })
	}
	return (
		<>
			<form className="guess-input-wrapper" onSubmit={handleSubmit}>
				{status === "play" ? (
					<>
						<label htmlFor="guess-input">Enter guess:</label>
						<input
							value={state.guess}
							onChange={inputChange}
							required
							minLength={5}
							maxLength={5}
							pattern="[a-zA-Z]{5}"
							title="Please enter a guess of 5 letters"
							type="text"
							name="guess"
							id="guess-input"
						/>
					</>
				) : (
					<div className={`${status === "win" ? "happy" : "sad"} banner`}>
						{status === "win" ? (
							<p>
								<strong>Congratulations!</strong> Got it in{" "}
								<strong>{attempt} guesses</strong>.
								<button onClick={handleReset} className="restart-btn">
									Restart Game
								</button>
							</p>
						) : (
							<p>
								Sorry, the correct answer is <strong>{answer}</strong>.
								<button onClick={handleReset} className="restart-btn">
									Restart Game
								</button>
							</p>
						)}
					</div>
				)}
			</form>
		</>
	)
}

export default Game
