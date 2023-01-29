const contacts = require("../services/contacts");
const mongoose = require("mongoose");
const { ParameterError } = require("../helpers/errors");

const getAllContactsController = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: allContacts,
  });
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ParameterError(`Invalid ID`);
  }
  const contact = await contacts.getContactById(id);
  res.json({ status: "sucess", code: 200, contact });
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const contact = await contacts.addContact(name, email, phone, favorite);
  res.status(201).json(contact);
};

const deleteContactController = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ParameterError(`Invalid ID`);
  }
  const removedContact = await contacts.removeContact(id);
  if (!removedContact) {
    throw new ParameterError(`Not found!`);
  }
  res.json({ status: "contact deleted", code: 200, removedContact });
};

const updateContactController = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ParameterError(`Invalid ID`);
  }
  const updatedContact = await contacts.updateContact(id, req.body);
  res.json({ status: "success", code: 200, updatedContact });
};

const updateStatusContactController = async (req, res) => {
  const id = req.params.contactId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ParameterError(`Invalid ID`);
  }

  if (!('favorite' in req.body)) {
    throw new ParameterError(`Missing field favorite`);
  }
  const updatedContact = await contacts.updateStatusContact(id, req.body);
  res.json({ status: "success", code: 200, updatedContact });
};

module.exports = {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
};
