const { Contact } = require("../db/contactModel");
const { ParameterError } = require("../helpers/errors");

const listContacts = async (owner,page,limit, favorite=null) => {
  const skip = page <= 0 ? 0 : (page-1) * limit;
  const filter = favorite ? { owner, favorite } : { owner };
  const contacts = await Contact.find(filter, {__v: 0, owner: 0}).skip(skip).limit(limit)
  return contacts;
};

const getContactById = async (id, owner) => {
  const contact = await Contact.findOne({ _id: id, owner }, {__v: 0, owner: 0});
  if (!contact) {
    throw new ParameterError(`Not found!`);
  }
  return contact;
};

const removeContact = async (id, owner) => {
  const removedContact = await Contact.findOneAndRemove({ _id: id, owner });
  return removedContact;
};

const addContact = async (name, phone, email, favorite = false, owner) => {
  const newContact = new Contact({ name, phone, email, favorite, owner });
  await newContact.save();
  return newContact;
};

const updateContact = async (id, { name, phone, email, favorite }, owner) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id, owner },
    { $set: { name, phone, email, favorite } },
    {new: true},
  );
  if (!contact) {
    throw new ParameterError(`Not found!`);
  }
  return contact;
};

const updateStatusContact = async (id, {favorite}, owner) => {
const contact = await Contact.findOneAndUpdate(
    { _id: id,owner },
    { $set: { favorite } },
    {new: true}
  );
  if (!contact) {
    throw new ParameterError(`Not found!`);
  }
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
