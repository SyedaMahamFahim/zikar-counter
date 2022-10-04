const express = require("express");
const router = express.Router();
const {
    createCounter,
    addAllocation,
    updateCounter,
    deleteCounter,
    getCounter,
    deleteAllocationCounter
} = require("../controllers/counterController");



// Create Counter
router.route("/create").post(createCounter);

// Update Counter
router.route("/update/:id").put(updateCounter);

// Delete Counter
router.route("/delete/:id").delete(deleteCounter);

// Get Single Counter Details
router.route("/get/:id").get(getCounter);

// Update Single Allocation
router.route("/allocation/create/:id").put(addAllocation); // here id is counter id

// Delete Single Allocation
router.route("/allocation/delete/:id").put(deleteAllocationCounter); // here id is counter id


module.exports = router;

