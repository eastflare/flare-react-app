import { useState } from 'react';

const Sample1 = () => {
  const [input, setInput] = useState('');

  return (
    <div>
      <h2>Sample1</h2>
      <p>Sample1</p>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default Sample1;
