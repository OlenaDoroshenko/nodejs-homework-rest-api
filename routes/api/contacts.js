const express = require("express");
// const {response} = require("../../app")
const router = express.Router();
const {
  addPostValidation
} = require('../../middlewares/validationMiddleware');
const {asyncWrapper} = require('../../helpers/apiHelpers');
const {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");


router.get("/", asyncWrapper(getAllContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", addPostValidation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.put("/:contactId", addPostValidation, asyncWrapper(updateContactController));

router.patch("/:contactId", asyncWrapper(updateStatusContactController));

module.exports = router;
