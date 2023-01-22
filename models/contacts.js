const fs = require("fs").promises;
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf8");
  const data = JSON.parse(dataString);
  return data;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter((el) => el.id === id)
  return contact
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === String(id));
  const contactToRemove = contacts[index];
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return contactToRemove
};

const addContact = async (name, phone, email) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (id, { name, phone, email }) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter((el) => el.id === id);
  if (contact) {
    contact.email = email
    contact.phone = phone
    contact.name = name
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
  }
  return contact
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
