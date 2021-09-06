<template>
	<section>
		<div id="osForm" class="content">
			<b-form-group id="input-group-1" label-cols="3" label-size="lg" label="Search Topic" label-for="input-1">
				<b-form-input id="input-1" v-model="user.query" placeholder="enter trend topic" required></b-form-input>
			</b-form-group>
			<div>
				<div>
					<label class="mr-sm-2">Choose a start date</label>
					<b-datepicker class="mb-2 mr-sm-2 mb-sm-0" v-model="user.startDate" ></b-datepicker>
				</div>
				<div>
					<label class="mr-sm-2">End date</label>
					<b-datepicker class="mb-2 mr-sm-2 mb-sm-0" v-model="user.endDate" ></b-datepicker>
				</div>
			</div>
			<b-button @click="getTrends" class="osBtn">Get Data</b-button>
		</div>
		
		<div class="chartBox" v-if="loaded">
			<b-overlay :show="chartShow" rounded="sm">
				<linechart :chart-data="chartData" :options="chartOptions" label="Traffic"></linechart>
			</b-overlay>
		</div>
		
	</section>
</template>

<script>
import LineChart from './trends_chart'
import axios from 'axios'

export default {
	name: 'Trends',
	components: {
		"linechart" : LineChart,
	},
	data() {
		return {
			user: {
				query: "",
				startDate: "",
				endDate: ""
			},
			chartShow: false,
			chartData: {},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false
			},
			loaded: false,
			
		}
	},
	methods: {
		formatData(data) {
			const dates = data.map(d => d.formattedTime)
			let values = data.map(d => (d.value)[0])
			this.chartData = {
				labels: dates,
				datasets: [
					{
						label: "Interests over time",
						backgroundColor: "#f87979",
						data: values
					}
				]
			};
		},
		async getTrends() {
			this.chartShow = true
			const url = `http://localhost:4000/api/trends`
			const topic = this.user
			if (topic.query != "" && topic.startDate != "" && topic.endDate != "") {
				try {
					const response = await axios.post(url, topic)
					// let trendData = response
					// this.arrTrendsVal = trendData.map(d => d.vals)
					this.formatData(response.data)
					this.loaded = true
					this.chartShow = false
				} catch (err) {
					this.error = err
				}
			}
		}
	},
	// mounted() {
	// 	this.getTrends()
	// }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartBox {
	border: 1px solid black
}
.osForm {
	border: 1px solid black
}
#osForm > div {
	display: flex;
	justify-content: space-around;
	width: auto
}
</style>
