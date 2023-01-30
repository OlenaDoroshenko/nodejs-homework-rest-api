const express = require("express");
// const {response} = require("../../app")
const router = express.Router();
const {
  createContactSchema,
  idValidation,
  favoriteFieldSchema
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

router.get("/:contactId", idValidation, asyncWrapper(getContactByIdController));

router.post("/", createContactSchema, asyncWrapper(addContactController));

router.delete("/:contactId", idValidation, asyncWrapper(deleteContactController));

router.put("/:contactId", idValidation, createContactSchema, asyncWrapper(updateContactController));

router.patch("/:contactId/favorite", idValidation, favoriteFieldSchema, asyncWrapper(updateStatusContactController));

module.exports = router;
