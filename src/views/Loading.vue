<template>
  <h1></h1>
</template>

<script>
export default {
    data: () => ({

    }),
    mounted() {
        setTimeout(() => {
            this.$router.replace({name: 'Dashboard'});
        }, 4000)
    }
}
</script>

<style>

</style>