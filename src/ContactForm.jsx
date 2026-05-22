import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback('Completează toate câmpurile!');
      return;
    }

    setFeedback('Mulțumim, ' + name + '! Mesajul a fost trimis.');
    setName('');
    setMail('');
    setMessage('');
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Nume
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Numele tău" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Mail
          <input value={email} onChange={(e) => setMail(e.target.value)} placeholder="email@exemplu.com" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Mesaj
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Scrie mesajul tău aici" rows={4} />
        </label>
      </div>
      <button type="submit" className="btn-primary">
        Trimite
      </button>
      {feedback && <p className="feedback">{feedback}</p>}
    </form>
  );
}
export default ContactForm;  