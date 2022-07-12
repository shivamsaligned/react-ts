import Contact from "../Model/Contact";
import axios from 'axios'

class ContactService {

    async putContact(Contact:Contact) {
        let put = await axios.put(
            "http://localhost:2000/contacts/" + Contact.id,
            {
              fullName: Contact.fullName,
              email: Contact.email,
              designation: Contact.designation,
            }
          );
          return put.data
    }

    async getContact() {
      const { data } = await axios.get("http://localhost:2000/contacts");
      console.log(data, "Getting Data");
      return data
    }

    async postContact(Contact:Contact) {
        let res = await axios.post("http://localhost:2000/contacts", {
            fullName: Contact.fullName,
            email: Contact.email,
            designation: Contact.designation,
          });
          return res.data
    }
    
    async deleteContact(Contact:Contact) {
        let data = await axios.delete(
            "http://localhost:2000/contacts/" + Contact.id
          );
          return data
    }
}

export default ContactService;
