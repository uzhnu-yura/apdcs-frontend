<template>
    <div>
        <app-header />
        <RouterView/>
    </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';


export default {
    components: {
        AppHeader,
    }
}

</script>


<style>
*{
font-family: Arial, Helvetica, sans-serif;
}

body{
    margin: 0px;
}

</style>