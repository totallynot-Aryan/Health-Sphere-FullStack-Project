// for defining the routes and API endpoints for appointment related operations

import express from "express"
import {postAppointment,getAllAppointments,updateAppointmentStatus,deleteAppointment} from "../controllers/appoinment.controllers.js";
import {isAdminAuthenticated, isPatientAuthenticated, isDoctorAuthenticated} from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post("/post", isPatientAuthenticated ,postAppointment); //ensure that only authenticated patients can post appointments
router.get("/getall", getAllAppointments);
router.put("/update/:id", updateAppointmentStatus);
router.delete("/delete/:id", isDoctorAuthenticated, deleteAppointment); //ensure that only authenticated doctors can delete appointments

export default router; // export the router to be used in the server.js file