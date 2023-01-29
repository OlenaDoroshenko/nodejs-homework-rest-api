const { Contact } = require("../db/contactModel");
const { ParameterError } = require("../helpers/errors");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findOne({ _id: id });
  if (!contact) {
    throw new ParameterError(`Not found!`);
  }
  return contact;
};

const removeContact = async (id) => {
  const removedContact = await Contact.findOneAndRemove({ _id: id });
  return removedContact;
};

const addContact = async (name, phone, email, favorite = false) => {
  const newContact = new Contact({ name, phone, email, favorite });
  await newContact.save();
  return newContact;
};

const updateContact = async (id, { name, phone, email, favorite }) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id },
    { $set: { name, phone, email, favorite } },
    {new: true}
  );
  if (!contact) {
    throw new ParameterError(`Not found!`);
  }
  return contact;
};

const updateStatusContact = async (id, {favorite}) => {
  console.log(favorite);
  const contact = await Contact.findOneAndUpdate(
    { _id: id },
    { $set: { favorite } },
    {new: true}
  );
  if (!contact) {
    throw new ParameterError(`Not found!`);
  }
  console.log(contact);
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
