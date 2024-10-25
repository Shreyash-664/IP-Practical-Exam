const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/calculate-interest', (req, res) => {
  const { principal, age, investmentPeriod } = req.body;

  
  const interestRate = 0.05;

  const interestEarned = (principal * interestRate * investmentPeriod)/100;

  res.json({ interestEarned });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
