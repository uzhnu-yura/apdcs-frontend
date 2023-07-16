<template>
    <div class="compact-block">
        <div class="label" :style="{ backgroundColor: index % 2 === 1 ? 'white' : '#f3f3f3' }">Height:
            {{ patientIndicators.Height }}</div>
        <div class="label" :style="{ backgroundColor: index % 2 === 1 ? 'white' : '#f3f3f3' }">Weight:
            {{ patientIndicators.Weight }}</div>
        <br>
        <div class="label" :style="{ backgroundColor: index % 2 === 1 ? 'white' : '#f3f3f3' }">Blood Type:
            {{ patientIndicators.BloodType }}</div>
        <div class="label" :style="{ backgroundColor: index % 2 === 1 ? 'white' : '#f3f3f3' }">Sugar Level:
            {{ patientIndicators.SugarLevel }}</div>
        <div class="label" :style="{ backgroundColor: index % 2 === 1 ? 'white' : '#f3f3f3' }">Previous Sugar Level:
            {{ patientIndicators.PrevSugarLevel }}</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        patientID: null,
        index: null,
        isOpen: null,
    },

    data() {
        return {
            patientIndicators: [],
        }
    },

    watch: {
        async isOpen() {
            if (this.isOpen === true) {
                try {
                    const response = await axios.get('http://localhost/APDCS/api/medicalIndicators/' + this.patientID);
                    this.patientIndicators = response.data;
                } catch (error) {
                    console.error(error);
                }
            }
        }
    },


}
</script>


<style scoped>
.label {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;
    text-align: center;
}
</style>