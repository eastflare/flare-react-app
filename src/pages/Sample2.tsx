import { useState } from 'react';

const Sample2 = () => {
  const [input, setInput] = useState('');

  return (
    <div>
      <h2>Sample2</h2>
      <p>Sample2</p>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default Sample2;
