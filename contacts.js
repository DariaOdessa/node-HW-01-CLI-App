const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getContacts() {
  const contactsData = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsData);
  return contacts;
}

async function listContacts() {
    const contacts = await getContacts();
    return contacts;
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
    }
    return contact;
}

async function removeContact(contactId) {
  console.log("removeTodo " + contactId);
  let contacts = await getContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
    }
  const filteredContacts = contacts.filter((item) => item.id !== contactId);
  contacts = filteredContacts;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone};
  const contacts = await getContacts();
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
