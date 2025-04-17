const express = require("express")
const router = express.Router()
const upload = require('../middlewares/multer.middleware')
const { userAuth, getUsers, createProfile, getAllRequests, acceptDoctor, deleteDoctor, getAllDoctors, getUserProfile,updateDoctorProfile, dashboard } = require('../controllers/user.controllers')
const isAuthenticated = require("../middlewares/clerkAuth.middleware")
 
router.post('/auth', userAuth)
router.get('/getUsers', getUsers)
router.get('/dashboard/:userId', dashboard)
router.get('/getallrequests', getAllRequests)
router.get('/getUserProfile/:authId',isAuthenticated, getUserProfile)
router.put('/acceptDoctor/:inboxId', acceptDoctor)
router.put('/updateDoctorProfile/:authId',isAuthenticated, updateDoctorProfile)
router.delete('/rejectDoctor/:inboxId', deleteDoctor)
router.get('/getAllDoctors/', getAllDoctors)
router.post('/create-profile/:authId', upload.fields([
    { name: 'profileImage', maxCount: 1 }, // Single profile image
    { name: 'pdfDocument', maxCount: 5 } // Up to 5 documents
  ]),  createProfile)

  router.get('/hello', isAuthenticated, (req, res) => {
    res.send(`Hello, ${req.user || 'world'}!`);
  });


module.exports = router;