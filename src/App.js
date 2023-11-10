import React, {useEffect, useState} from "react";

import Header from "./Components/Header/Header";

import darkicon from './Icons/dark.png'
import lighicon from './Icons/light.png'

import './App.css';
import Keypad from "./Components/Keypad/Keypad";

const usedKeyCodes = [
	48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
	const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("calc-mode")) || false);
	const [expression, setExpression] = useState("")
	const [result, setResult] = useState("")
	const [history, setHistory] = useState(JSON.parse(localStorage.getItem("calc-history")) || [])

	const handleKeyPress = (keyCode, key) => {
		// console.log(keyCode, key)
		if (!keyCode) return 
		// keyCode = keyCode + ""
		if (!usedKeyCodes.includes(keyCode)) return

		if (numbers.includes(key)) {
			// console.log("Number")
			if (key === "0") {
				if (expression.length === 0) return
			}
			calculateResult(expression + key)
			setExpression(expression + key)
		}
		else if (operators.includes(key)) {
			// console.log("Operator")
			if (!expression && !(key === "-")) return 

			const lastChar = expression.slice(-1)

			if (operators.includes(lastChar)) return 
			if (lastChar === ".") return 

			setExpression(expression + key)
		}
		else if (key === ".") {
			if (!expression) return

			const lastChar = expression.slice(-1)

			if (!numbers.includes(lastChar)) return
			setExpression(expression + key)
		}
		else if (keyCode === 13) {
			// console.log("Enter")
			if (!expression) return
			calculateResult(expression)

			const tempHistory = [...history]
			if (tempHistory.length > 10) {
				tempHistory.splice(0, 1);
			}

			tempHistory.push(expression);
			setHistory(tempHistory)
		}
		else if (keyCode === 8) {
			// console.log("Backspace")
			if (!expression) return 
			calculateResult(expression.slice(0, -1))
			setExpression(expression.slice(0, -1))
		}
	}

	const calculateResult = (exp) => {
		if (!exp) {
			setResult("");
			return;
		}
		const lastChar = exp.slice(-1);
		if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

		const answer = eval(exp).toFixed(3) + "";
		setResult(answer);
	} 

	useEffect(() => {
		localStorage.setItem("calc-mode", JSON.stringify(isDarkMode))
	}, [isDarkMode])

	useEffect(() => {
		localStorage.setItem("calc-history", JSON.stringify(history))
	}, [history])

	return (
		<div className="app" 
			tabIndex="0"
			onKeyDown={(event)=>handleKeyPress(event.keyCode, event.key)}
			calc-theme={isDarkMode ? "dark" : ""}>
			{/* <h1>Hello</h1> */}
			<div className="app_calc">
				<div className="app_calc_nav">
					<div className="app_calc_nav_toggle"
						onClick={() => setIsDarkMode(!isDarkMode)}
					>
						<div className={`app_calc_nav_toggle_circle ${
							isDarkMode ? "app_calc_nav_toggle_circle_active" : ""
						}`} />
					</div>
					<img src={isDarkMode ? darkicon : lighicon} alt="mode" />
				</div>

				<Header expression={expression} result={result} history={history} />
				<Keypad handleKeyPress={handleKeyPress}/>
			</div>
		</div>
	);
}

export default App;
