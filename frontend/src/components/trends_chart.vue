<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
	extends: Line,
	props: {
		label: {
			type: String
		},
		chartData: {
			type: Array
		},
		options: {
			type: Object
		}
	},
	mixins: [reactiveProp],
	mounted () {
		this.renderChart(this.chartData, this.options)
	}
}
</script>