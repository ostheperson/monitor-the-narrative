<template>
	<div>
		<section>
			<b-jumbotron fluid id="osJumbo" header-tag="h4" header-level=4 text-variant="white">
				<template #header>Monitor the narrative</template>
				<template #lead>
					News? is it real?
				</template>
			</b-jumbotron>
		</section>
		<section class="main-container" align="center">
			<b-tabs pills card justified fill id="ostabs" active-nav-item-class="font-weight-bold text-uppercase">
				<b-tab active>
					<template #title>
						Detector
					</template>
					<classifier></classifier>
				</b-tab>
				<b-tab title="Tracker" >
					<trends></trends>
				</b-tab>
			</b-tabs>
			<b-alert
				:show="dismissCountDown"
				dismissible
				@dismissed="dismissCountDown=0"
				variant="primary">Saved
			</b-alert>
		</section>
	</div>
</template>

<script>
import Classifier from '../components/Classifier'
import Trends from '../components/Trends'

export default {
	name: "Dashboard",
	components: {
		"classifier" : Classifier,
		"Trends" : Trends,
		"report" : Report,
		"forum" : Forum
	},
	data () {
		return {
			errors: "",
			dismissSecs: 10,
			dismissCountDown: 0,
		}
	},
	methods: {
		showAlert() {
			this.dismissCountDown = this.dismissSecs
		},
		
	}
}
</script>

<style>
.osBtn {
	margin: 10px;
}
.top-container {
	font-size: 1.5em;
}
#osJumbo {
	margin: 0px;
	font-size: 3.5vw;
	font-weight: 200;
	background-image: url("background.png");
	background-size: 100% auto;
}
#side {
	display: flexbox;
}

pills {
	background-color: success !important;;
}

.main-container {
	margin: auto;
	font-size: 1em;
}

#ostabs {
	border-radius: 15px;
}
.oslist {
	border: 1px solid black;
	border-radius: 15px;
	padding: 2px;
}

.content {
	margin: auto;
	max-width: 600px;
	padding: 5px;
}
</style>