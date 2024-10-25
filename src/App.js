
import React, { useState } from 'react';
import "./App.css";

const App = () => {
  const [principal, setPrincipal] = useState('');
  const [age, setAge] = useState('');
  const [investmentPeriod, setInvestmentPeriod] = useState('');
  const [interestEarned, setInterestEarned] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await fetch('http://localhost:5000/calculate-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          principal: parseFloat(principal),
          age: parseInt(age),
          investmentPeriod: parseInt(investmentPeriod),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate interest. Please try again.');
      }

      const data = await response.json();
      setInterestEarned(data.interestEarned);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
    <h1>Savings Interest Calculator</h1>
      <form onSubmit={handleSubmit} className="grid-form">
      
        <label htmlFor="principal">Principal Amount</label>
        <input
          type="number"
          id="principal"
          placeholder="Principal Amount"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label htmlFor="investment-period">Investment Period (years)</label>
        <input
          type="number"
          id="investment-period"
          placeholder="Investment Period (years)"
          value={investmentPeriod}
          onChange={(e) => setInvestmentPeriod(e.target.value)}
          required
        />

        <button type="submit">Calculate Interest</button>
      </form>
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {interestEarned > 0 && <h2>Interest Earned:Rs  {(interestEarned)/100}</h2>}
    </div>
  );
};

export default App;
