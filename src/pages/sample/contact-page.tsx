import { useState } from "react";

const ContactPage = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      <h2>Contact</h2>
      <p>Contact us...</p>
      <input type='text' value={input} onChange={e => setInput(e.target.value)} />
    </div>
  );
};

export default ContactPage;
