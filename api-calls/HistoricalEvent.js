import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"

const translate = require("google-translate-api")
const API_URL = "https://api.api-ninjas.com/v1/historicalevents?"

const HistoricalEvent = () => {
	const [apiData, setApiData] = useState(null)

	const getCurrentDateParams = () => {
		const currentDate = new Date()
		const month = currentDate.getMonth() + 1
		const day = currentDate.getDate()
		return { month, day }
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { month, day } = getCurrentDateParams()
				const response = await fetch(
					`${API_URL}month=${month}&day=${day}`,
					{
						headers: {
							"X-Api-Key":
								"iBak4ROE3IjzD4viTWwgdQ==vXYMJDAjSyRxSU1G",
						},
					}
				)
				const data = await response.json()
				translate(data[0].event, { to: "fr" })
					.then((res) => {
						data[0].event = res.text
					})
					.catch((err) => {
						console.error(err)
					})
				setApiData(data)
			} catch (error) {
				console.error("Error:", error)
			}
		}
		fetchData()
	}, [])

	return (
		<View style={styles.container}>
			{apiData && (
				<View style={styles.eventContainer}>
					<Text style={styles.dateText}>
						{`Que s'est-il pass(le ${apiData[0].day}/${apiData[0].month}/${apiData[0].year}):`}
					</Text>
					<Text style={styles.eventText}>
						{apiData[0].event}
					</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
	},
	eventContainer: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,

		elevation: 3,
	},
	dateText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	eventText: {
		fontSize: 16,
	},
})

export default HistoricalEvent
