<template>
	<div>
		<hr>
		<p>{{ siteName }}</p>
		<hr>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				siteName: "Fruits and Vegetables"
			}
		}
	}
</script>

<style scoped>
	div {
		text-transform: uppercase;
		color: #888;
	}
</style>