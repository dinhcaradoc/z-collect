const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const AfricasTalking = require('africastalking');

dotenv.config();

const africastalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// In-memory debt storage (replace with DB later)
const DEBTS_FILE = "./debts.json";

// Function to read debts from the file
const readDebts = () => {
  try {
    const data = fs.readFileSync(DEBTS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return []; // If file is empty or missing, return an empty array
  }
};

// Function to write debts to the file
const writeDebts = (debts) => {
  fs.writeFileSync(DEBTS_FILE, JSON.stringify(debts, null, 2), "utf8");
};

// Route to add a new debt
app.post('/add-debt', (req, res) => {
  const { customer, phone, amount, dueDate } = req.body;
  console.log(customer)
  if (!customer || !phone || !amount || !dueDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let debts = readDebts();

  const newDebt = { id: debts.length + 1, customer, phone, amount, dueDate };
  debts.push(newDebt);
  writeDebts(debts);
  res.status(201).json({ message: 'Debt added successfully', debt: newDebt })
});

// Route to fetch all debts
app.get('/debts', (req, res) => {
  const debts = readDebts()
  res.json(debts);
});

// Function to generate AI-powered reminder using Granite
async function generateReminder(debtorName, debtAmount, dueDate) {
  const graniteApiKey = process.env.GRANITE_API_KEY;

  const prompt = `Generate a polite yet firm debt reminder for ${debtorName}, who owes KES ${debtAmount} due on ${dueDate}. Keep it professional and encouraging.`;

  try {
    const response = await axios.post(
      "https://granite-api-url/v1/generate",
      {
        model: "granite-model-name",
        prompt: prompt,
        max_tokens: 100
      },
      {
        headers: { Authorization: `Bearer ${graniteApiKey}` }
      }
    );

    return response.data.generated_text;
  } catch (error) {
    console.error("Granite API error:", error);
    return `Hello ${debtorName}, just a reminder that KES ${debtAmount} is due on ${dueDate}. Please clear it at your earliest convenience.`;
  }
}

// Function to send WhatsApp message via Twilio
async function sendSMS(phone, message) {
  try {
    const result = await africastalking.SMS.send({
      to: phone,
      message: message,
      from: ''
    });
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }
}

// Route to send reminders
app.post('/send-reminders', async (req, res) => {
  try {
    for (const debt of debts) {
      const reminder = await generateReminder(debt.customer, debt.amount, debt.dueDate);
      await sendSMS(debt.phone, reminder);
    }
    res.json({ message: 'Reminders sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending reminders', details: error.message });
  }
});

//Default route
app.get('/', (req, res) => {
  res.send("Welcome to Z-Collect. Let's make a difference!")
})

app.listen(port, () => console.log(`Server running on port ${port}`));