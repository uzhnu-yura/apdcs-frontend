import { createRouter, createWebHistory } from 'vue-router';

import PatientsList from "@/components/PatientsList.vue";
import CreateEditPatientForm from "@/components/CreateEditPatientForm.vue";


const routes = [
  {
    path: '/patients',
    component: PatientsList
  },
  {
    path: '/create',
    component: CreateEditPatientForm
  },
];


const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;