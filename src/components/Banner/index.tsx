interface BannerProps {
	attempt: number
	handleReset: () => void
	answer: string
}

export default function Banner({ attempt, handleReset, answer }: BannerProps) {
	return (
		<>
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
		</>
	)
}
