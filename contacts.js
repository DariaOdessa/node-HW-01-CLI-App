const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contactsData = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsData);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
    }
    return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = nanoid();
  const contact = { id, name, email, phone};  
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
