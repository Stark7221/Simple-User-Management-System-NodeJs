const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/", customerController.homepage);
router.get("/add", customerController.addCustomer)
router.post("/add",customerController.postCustomer)
router.get("/view/:id", customerController.view)
router.get("/edit/:id", customerController.edit)
router.put("/edit/:id", customerController.editPost)
router.delete("/edit/:id", customerController.deletePost)
router.post("/search",customerController.search)


















module.exports = router;