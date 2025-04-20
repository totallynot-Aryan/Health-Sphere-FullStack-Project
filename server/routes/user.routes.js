//define the routes for user authentication and registration for API endpoints

import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  userLogin,
  registerPatient,
  registerAdmin,
  registerDoctor,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  logoutDoctor,
  getAllAdmins,
  getAdminById,
  deleteAdmin,
  updateAdmin,
  updateDoctor,
  deleteDoctor
} from "../controllers/user.controllers.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
  isDoctorAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

/*_____________________________________LOGIN ROUTE______________________________________*/
router.route("/login").post(userLogin);

/*______________________________PATIENT ROUTES_________________________________________*/
router
  .route("/patient/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerPatient);  
  // when making a post request, the avatar (profile picture) will be uploaded and saved in the database with 1 max count.

router.get("/patient/profile", isPatientAuthenticated, getUserDetails);
router.get("/patient/logout", logoutPatient);

/*______________________________ADMIN ROUTES___________________________________________*/
router.post("/admin/register",isAdminAuthenticated, registerAdmin);
router.get("/admin/profile",isAdminAuthenticated, getUserDetails);
router.get("/admin/logout", logoutAdmin);

// Get all admins
router.get("/admin/",isAdminAuthenticated, getAllAdmins);
// Get admin by ID
router.get("/admin/:id",isAdminAuthenticated, getAdminById);
// Create admin
router.post("/admin/add",isAdminAuthenticated, registerAdmin);
// Update admin
router.put("/admin/:id", isAdminAuthenticated, updateAdmin);
// Delete admin
router.delete("/admin/:id", isAdminAuthenticated, deleteAdmin);

/*______________________________DOCTOR ROUTES___________________________________________*/
router.get("/doctors", getAllDoctors);
// router
//   .route("/doctor/register")
//   .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerDoctor);
router.post("/doctor/register", registerDoctor);
router.get("/doctor/profile", isDoctorAuthenticated || isAdminAuthenticated, getUserDetails);
router.get("/doctor/logout", logoutDoctor);

// Update doctor
router.put("/doctor/:id", isAdminAuthenticated, updateDoctor);
//Delete doctor
router.delete("/doctor/:id", isAdminAuthenticated, deleteDoctor);

export default router; // export the router to be used in the server.js file
