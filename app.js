import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import AfricasTalking from 'africastalking';


const africastalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// In-memory debt storage (replace with DB later)
let debts = [];

// Route to add a new debt
app.post('/add-debt', (req, res) => {
  const { customer, phone, amount, dueDate } = req.body;
  if (!customer || !phone || !amount || !dueDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const debt = { id: debts.length + 1, customer, phone, amount, dueDate };
  debts.push(debt);
  res.json({ message: 'Debt added successfully', debt });
});

// Route to fetch all debts
app.get('/debts', (req, res) => {
  res.json(debts);
});

// Function to generate AI-powered reminder using Granite
async function generateReminderMessage(debtorName, debtAmount, dueDate) {
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

app.listen(port, () => console.log(`Server running on port ${port}`));
