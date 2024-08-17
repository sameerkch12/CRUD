const axios = require('axios');
const Contact = require('../models/contact');
require('dotenv').config();

const freshsalesAPIKey = process.env.FRESHSALES_API_KEY;
const freshsalesDomain = process.env.FRESHSALES_DOMAIN;
const freshsalesAPIUrl = `https://${freshsalesDomain}/api/contacts`;

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;
    if (!first_name || !last_name || !email || !mobile_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (data_store === 'CRM') {
       console.log("insise crm")
      const response = await axios.post(freshsalesAPIUrl, {
      
        contact: {
          first_name,
          last_name,
          email,
          mobile_number
        }
      }, {
        headers: {
          'Authorization': `Token token=${freshsalesAPIKey}`,
          'Content-Type': 'application/json'
        }
      });

      res.json(response.data);
    } else if (data_store === 'DATABASE') {
      const newContact = await Contact.create({ first_name, last_name, email, mobile_number });
      res.json(newContact);
    } else {
      res.status(400).json({ error: 'Invalid data_store value' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a contact by ID
//api/contacts/getContact
exports.getContact = async (req, res) => {
  console.log("hello")
  //console.log(freshsalesAPIUrl);
  try {
    const { data_store } = req.query;
    const contactId = req.params.id;
    
    console.log(`${freshsalesAPIUrl}/${contactId}`);
  
    if (!contactId) {
      console.log("erroe")
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (data_store === 'CRM') {
    
      const response = await axios.get(`${freshsalesAPIUrl}/${contactId}`, {
        headers: {
          'Authorization': `Token token=${freshsalesAPIKey}`,
           'Content-Type': 'application/json'
        }
      });

      res.json(response.data);
    } else if (data_store === 'DATABASE') {
      const contact = await Contact.findByPk(contactId);
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid data_store value' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a contact by ID
exports.updateContact = async (req, res) => {
  //console.log("Upadte")
  try {
    const contactId = req.params.id;
    const { new_email, new_mobile_number, data_store } = req.body;
   

    if(!new_email || !new_mobile_number || !data_store || !contactId){
      console.log("value error")
    }

    if (data_store === 'CRM') {
      await axios.put(`${freshsalesAPIUrl}/${contactId}`, {
        contact: {
          email: new_email,
          mobile_number: new_mobile_number
        }
      }, {
        headers: {
          'Authorization': `Token token=${freshsalesAPIKey}`,
          'Content-Type': 'application/json'
        }
      });

      res.json({ message: 'Contact updated' });
    } else if (data_store === 'DATABASE') {
      const contact = await Contact.findByPk(contactId);
      if (contact) {
        contact.email = new_email;
        contact.mobile_number = new_mobile_number;
        await contact.save();
        res.json(contact);
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid data_store value' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
  try {
    const { data_store } = req.query;
    const contactId = req.params.id;

    if (data_store === 'CRM') {
      await axios.delete(`${freshsalesAPIUrl}/${contactId}`, {
        headers: {
          'Authorization': `Token token=${freshsalesAPIKey}`
        }
      });

      res.json({ message: 'Contact deleted' });
    } else if (data_store === 'DATABASE') {
      const contact = await Contact.findByPk(contactId);
      if (contact) {
        await contact.destroy();
        res.json({ message: 'Contact deleted' });
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid data_store value' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
