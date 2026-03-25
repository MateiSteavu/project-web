import { useState } from 'react';
function ContactForm() {
    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [message, setMessage] = useState('');
    const [Feedback, setFeedback] = useState('');
    function Mesaj() {
        if(name.length == 0 || message.length == 0 || email.length == 0)
            setFeedback('Completeaza toate campurile!');
        else
            setFeedback('Multumim, ' + name + '!');
    }
    return (
        <div>

        <br></br>
        <br></br>
        <h3>Nume</h3>
        <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <h3>Mail</h3>
        <input
        value={email}
        onChange={(e) => setMail(e.target.value)}
        />
        <h3>Mesaj</h3>
        <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => Mesaj()}>Submit</button>
        <p>Mesajul este: {message}</p>
        <p>Feedback-ul este: {Feedback}</p>
        </div>
    );
}
export default ContactForm;  