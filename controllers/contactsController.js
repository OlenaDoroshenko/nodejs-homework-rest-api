const contacts = require("../services/contacts");
const { ParameterError } = require("../helpers/errors");

const getAllContactsController = async (req, res) => {
  const { _id: ownerId } = req.user;
  const { page, limit, favorite } = req.query;
  const allContacts = await contacts.listContacts(
    ownerId,
    page,
    limit,
    favorite
  );
  res.json(allContacts);
};

const getContactByIdController = async (req, res) => {
  const { _id: ownerId } = req.user;
  const id = req.params.contactId;
  const contact = await contacts.getContactById(id, ownerId);
  res.json(contact);
};

const addContactController = async (req, res) => {
  const { _id: ownerId } = req.user;
  const { name, email, phone, favorite } = req.body;
  const contact = await contacts.addContact(
    name,
    email,
    phone,
    favorite,
    ownerId
  );
  res.status(201).json(contact);
};

const deleteContactController = async (req, res) => {
  const { _id: ownerId } = req.user;
  const id = req.params.contactId;
  const removedContact = await contacts.removeContact(id, ownerId);
  if (!removedContact) {
    throw new ParameterError(`Not found!`);
  }
  res.json({ status: "contact deleted", removedContact });
};

const updateContactController = async (req, res) => {
  const { _id: ownerId } = req.user;
  const id = req.params.contactId;
  const updatedContact = await contacts.updateContact(id, req.body, ownerId);
  res.json(updatedContact);
};

const updateStatusContactController = async (req, res) => {
  const { _id: ownerId } = req.user;
  const id = req.params.contactId;
  const updatedContact = await contacts.updateStatusContact(
    id,
    req.body,
    ownerId
  );
  res.json(updatedContact);
};

module.exports = {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
};
