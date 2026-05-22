import ContactForm from '../ContactForm';

function Contact() {
  return (
    <div className="page contact-page">
      <p className="page-label">Contact</p>
      <h1>Hai să vorbim</h1>
      <p className="page-description">Trimite-mi un mesaj și îți voi răspunde cât mai repede.</p>
      <ContactForm />
    </div>
  );
}
export default Contact;