<template>
	<section>
		<div v-if="prediction">
			<b-alert
				:show="dismissCountDown"
				dismissible
				@dismissed="dismissCountDown=0"
				variant="primary"><h3>FACTUAL CONTENT</h3>
			</b-alert>
		</div>
		<div v-if="prediction === false">
			<b-alert
				:show="dismissCountDown"
				dismissible
				@dismissed="dismissCountDown=0"
				variant="danger"><h3>WARNING FAKE NEWS!</h3>
			</b-alert>
		</div>
		<div class="content">
			<span>Enter text to be classified</span>
			<b-form-textarea id="osTextarea" rows="3" max-rows="20" v-model="article" rows: placeholder="Enter a piece of text"></b-form-textarea>
			<b-button variant="primary" v-on:click="classify()" class="osBtn">Classify</b-button>
		</div>
		
	</section>
</template>

<script>
import axios from 'axios'
export default {
	name: 'Classifier',
	data() {
		return {
			isPosts: true,
			prediction: "",
			article: "",
			errors: "",
			dismissSecs: 10,
			dismissCountDown: 0,
		}
	},
	methods: {
		classify() {
			this.prediction = ""
			const url = `http://localhost:4000/api/classify`
			const data = {
				"data": this.article
			}
			try {
				axios.post(url, data).then(response => {
					if (response.data.prediction == "FAKE") {
						this.prediction = false
					} else this.prediction = true
					this.showAlert()
					//console.log(this.prediction.prediction)
				}).catch(err => this.errors = err.message)
			} catch (err) {
				this.errors = err.response.data
			}
		},
		showAlert() {
			this.dismissCountDown = this.dismissSecs
		},
	},
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
