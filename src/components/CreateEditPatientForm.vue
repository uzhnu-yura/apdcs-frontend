<template>
    <div class="container">
        <h2 v-if="isEditing">Edit Patient Questionnaire</h2>
        <h2 v-else>Create Patient Questionnaire</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="firstname">Firstname:</label>
                <input type="text" maxlength="20" name="firstname" v-model="firstname" required>
            </div>
            <div class="form-group">
                <label for="lastname">Lastname:</label>
                <input type="text" maxlength="25" name="lastname" v-model="lastname" required>
            </div>
            <div class="form-group">
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" v-model="dob" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" v-model="phone" maxlength="12" minlength="9" required>
            </div>
            <div class="buttons-block">
                <button v-if="isEditing" type="submit" class="btn">Edit</button>
                <button v-if="isEditing" @click="cancel()" class="btn" style="margin-left: 260px;">Cancel</button>

                <button v-else type="submit" class="btn">Create</button>

            </div>

        </form>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    props: {
        isEditing: { default: false },
        patient: null,

    },
    data() {
        return {
            firstname: '',
            lastname: '',
            dob: '',
            phone: ''
        };
    },
    methods: {
        handleSubmit() {
            const data = {
                firstname: this.firstname,
                lastname: this.lastname,
                dob: this.dob,
                phone: this.phone
            };
            if (this.isEditing)
                this.editUser(data);
            else
                this.createUser(data);
        },

        createUser(data) {
            axios.post('http://localhost/APDCS/api/patient', data)
                .then(response => {
                    console.log(response.data);
                    this.firstname = '';
                    this.lastname = '';
                    this.dob = '';
                    this.phone = '';
                })
                .catch(error => {
                    console.error(error);
                });
        },

        editUser(data) {
            data.id = this.patient.Id;
            axios.put('http://localhost/APDCS/api/patient', data)
                .then(() => {
                }).catch(error => {
                    console.error(error);
                });
            this.$emit('doneEdit', data);
        },

        updateFormData() {
            this.firstname = this.patient.Firstname;
            this.lastname = this.patient.Lastname;
            this.dob = this.patient.DateOfBirth;
            this.phone = this.patient.Phone;
        },

        cancel() {
            this.$emit('cancelEdit');
        }
    },

    watch: {
        async patient() {
            this.updateFormData();
        }
    },

    mounted() {
        if(this.isEditing)
        this.updateFormData();
    }

};
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    padding: 20px;
}

.buttons-block {
    display: flex;
    width: 100%;
    overflow: auto;
}

.container {
    max-width: 500px;
    margin: 70px auto;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 4px solid #ccc;
    position: relative;
}

h2 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
input[type="tel"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    font-size: 16px;
    transition: border-bottom-color 0.3s;
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="tel"]:focus {
    border-bottom-color: #4CAF50;
    outline: none;
}

.btn {

    display: block;
    width: 24%;
    background-color: #4CAF50;
    color: #fff;
    padding: 10px;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border: none;
    margin-top: 20px;
}

.btn:hover {
    background-color: #45a049;
}

.form-group::after {
    content: "";
    display: block;
    width: calc(100% - 30px);
    height: 2px;
    background-color: #ccc;
    position: absolute;
    bottom: -12px;
    left: 15px;
}
</style>