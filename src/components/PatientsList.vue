<template >
    <div>
        <div v-if="showEditForm" class="overlay"> </div>
        <div class="patient-list">
            <h2>Patient List</h2>
            <div class="patient-info" style="border-bottom: 2px solid rgba(0, 0, 0, 0.747);">
                <span class="field-head">Full Name</span>
                <span class="field-head">Date of Birth</span>
                <span class="field-head" style="margin-right: 28px;">Phone</span>
            </div>
            <ul class="patient-list">
                <li v-for="(patient, index) in patients" :key="patient.Id"
                    :style="{ backgroundColor: index % 2 === 1 ? '#f3f3f3' : 'white' }">
                    <div class="patient-info hover" @click="toggleDropdown(patient.Id)"
                        style="cursor: pointer; padding: 12px;">
                        <span class="field-body">{{ patient.Firstname + " " + patient.Lastname }}</span>
                        <span class="field-body">{{ patient.DateOfBirth }}</span>
                        <span>{{ patient.Phone }}</span>
                    </div>
                    <div class="dropdown-details" :class="{ show: patient.isOpen }"
                        :style="{ backgroundColor: patient.id % 2 === 0 ? '#f3f3f3' : 'inherit' }">
                        <label>Patient ID: {{ patient.Id }}</label>
                        <medical-indicators :patientID="patient.Id" :isOpen="patient.isOpen" :index="index" />
                        <assign-procedure-form :patientId="patient.Id" />

                        <div class="edit">
                            <button class="btn" @click="editPatient(patient)">Edit</button>
                            <button class="btn" @click="archivePatient(patient.Id)">Archive</button>
                        </div>
                    </div>
                </li>
            </ul>

            <br>
            <create-edit-patient-form :patient="selectedPatientToEdit" :isEditing="true" v-if="showEditForm"
                class="modal-form" @doneEdit='doneEdit' @cancelEdit="cancelEdit" />
        </div>
    </div>
</template>

  
<script>
import axios from 'axios';
import AssignProcedureForm from './AssignProcedureForm.vue';
import MedicalIndicators from './MedicalIndicators.vue';
import CreateEditPatientForm from './CreateEditPatientForm.vue';
export default {
    data() {
        return {
            patients: [],
            selectedPatientToEdit: null,
            showEditForm: false,
        };
    },

    components: {
        AssignProcedureForm, MedicalIndicators,
        CreateEditPatientForm,
    },

    methods: {
        toggleDropdown(id) {
            const openedPatient = this.patients.find(item => item.Id === id);
            openedPatient.isOpen = !openedPatient.isOpen;
        },

        archivePatient(patientId) {
            axios.get('http://localhost/APDCS/api/archive/' + patientId)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log("Ошибка при архивации пациента. Ошибка: ");
                    console.error(error);
                    return;
                });

            //remove patient from list
            this.patients = this.patients.filter(patient => patient.Id !== patientId);

        },

        editPatient(patient) {
            this.showEditForm = true;
            this.selectedPatientToEdit = patient;
        },

        doneEdit(editedPatient) {
            this.showEditForm = false;
            const patient = this.patients.find(patient => patient.Id == editedPatient.id);
            console.log(JSON.stringify(patient));

            patient.Firstname = editedPatient.firstname;
            patient.Lastname = editedPatient.lastname;
            patient.DateOfBirth = editedPatient.dob;
            patient.Phone = editedPatient.phone;
        },

        cancelEdit(){
            this.showEditForm = false;
        },

    },
    mounted() {
        axios.get('http://localhost/APDCS/api/patientsphone')
            .then(response => {
                const data = response.data;
                this.patients = data.map(item => {
                    item.isOpen = false;
                    return item; // Add the return statement here
                });
            })
            .catch(error => {
                console.error(error);
            });
    },

};
</script>

<style scoped>
.modal-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.btn {
    margin: 4px;
    margin-right: 4px;
    font-size: 14px;
}


.patient-list {
    list-style: none;
    padding: 0;
    margin: 0;

    width: 700px;
    margin: 0 auto;


}

.compact-block {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}

.patient-list li {
    padding: 1px;
    border-bottom: 2px solid #ccc;
}

.patient-info {
    display: flex;
    justify-content: space-between;
}

.edit {
    float: right;
}

.hover:hover {
    background-color: rgba(0, 255, 0, 0.13);
}

.field-head {
    font-weight: bold;
}

.field-body {
    width: 200px;
    margin-right: 95px;
}

.dropdown-details {
    display: none;
    padding: 10px;
    background-color: #f2f2f2;
    overflow: hidden;
}

.show {
    display: block;
}

.patient-details {
    display: none;
    background-color: #f0f0f0;
    padding: 10px;
    margin-top: -50px;
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 1;
}
</style>