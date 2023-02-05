const express = require("express");

const router = express.Router();
const {
  contactValidationSchema,
  idValidation,
  favoriteFieldSchema,
} = require("../../middlewares/contactValidationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", asyncWrapper(getAllContactsController));

router.get("/:contactId", idValidation, asyncWrapper(getContactByIdController));

router.post("/", contactValidationSchema, asyncWrapper(addContactController));

router.delete(
  "/:contactId",
  idValidation,
  asyncWrapper(deleteContactController)
);

router.put(
  "/:contactId",
  idValidation,
  contactValidationSchema,
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  idValidation,
  favoriteFieldSchema,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
