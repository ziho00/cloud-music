<template>
	<div class="tab pointer" :style="`color: ${color};`"  @click="selectNav">
		<span class="ellipsis">{{tab.title}}</span>
	</div>
</template>

<script>
export default {
  props: {
    tab: {
      type: Object,
      default: null
    },
    idx: {
      type: Number,
      default: 0
    },
    active: {
      type: [Number, String]
    },
    color: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectNav(){
			this.$emit('changeNav', this.tab, this.idx)
    }
  }
}
</script>

<style scoped>
.tab {
	position: relative;
	padding: 0 .4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	box-sizing: border-box;
	font-size: var(--name-size);
}

</style>
