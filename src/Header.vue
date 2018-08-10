<template>
	<div>
		<p>{{ siteName }}</p>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				siteName: "Header"
			}
		}
	}
</script>

<style scoped>
	div {
		font-size: 24px;
		color: #888;
		padding: 10px;
		font-family: sans-serif;
		text-transform: uppercase;
	}
</style>