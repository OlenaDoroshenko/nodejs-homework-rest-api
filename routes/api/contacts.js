const express = require("express");
const contacts = require("../../models/contacts.js");
// const {response} = require("../../app")
const Joi = require("joi");
const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
})

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: allContacts,
    });
  } catch (e) {
    next(e);
  }
})

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await contacts.getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" })
    }
    res.json({ status: "sucess", code: 200, contact });
  } catch (e) {
    next(e)
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(404).json({ message: `${error}` });
    }
    const { name, email, phone } = req.body;
    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId
    const removedContact = await contacts.removeContact(id);
    if (!removedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ status: "contact deleted", code: 200, removedContact });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: `${error}` })
    }

    const updatedContact = await contacts.updateContact(id, req.body)

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ status: "success", code: 200, updatedContact });
  } catch (e) {
    next(e)
  }
});

module.exports = router;
