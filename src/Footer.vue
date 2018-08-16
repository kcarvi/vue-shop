<template>
	<div>
		<hr>
		<p>{{ copyright }}</p>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				copyright: "© 2018 All rights reserved"
			}
		}
	}
</script>

<style scoped>
	div {
		color: #888;
		margin: 1em 0;
		padding-top: 1em;
	}
</style>