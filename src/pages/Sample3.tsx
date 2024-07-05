import { useState } from 'react';

const Sample3 = () => {
  const [input, setInput] = useState('');

  return (
    <div>
      <h2>Sample3</h2>
      <p>Sample3</p>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default Sample3;
