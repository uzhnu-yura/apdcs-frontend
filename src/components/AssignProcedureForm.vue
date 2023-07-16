<template>
  <div class="block">
    <p>Assign Procedure</p>
    <select v-model="selectedProcedure">
      <option v-for="procedure in procedures" :key="procedure.Id" :value="procedure">
        {{ procedure.Name }}</option>
    </select>
    <button @click="assignProcedure()">Assign</button>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {

  props: {
    patientId: null,
  },

  data() {
    return {
      selectedProcedure: null,
      procedures: [],
    };
  },

  mounted() {
    axios.get('http://localhost/APDCS/api/procedures')
      .then(response => {
        this.procedures = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },

  methods: {
    assignProcedure() {
      const data = {
        patientId: this.patientId,
        procedureName: this.selectedProcedure.Name,
        procedureId: this.selectedProcedure.Id,
      };
      axios.post('http://localhost/APDCS/api/performprocedure', data)
        .then(() => {
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
  
<style scoped>
.block {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
  