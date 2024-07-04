import { useState } from 'react';

const About = () => {
  const [input, setInput] = useState('');

  return (
    <div>
      <h2>About</h2>
      <p>About us...</p>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default About;
