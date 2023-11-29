require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const { OpenAI } = require("openai");
const upload = require('./upload')
const pdfParse = require('pdf-parse')

const app = express();

``
const openai = new OpenAI({
  apiKey: "<put-your-api-key-in-here>",
});
const port = process.env.PORT || 5000;
app.use(cors())
app.use(bodyParser.json())


async function generateEmbeddings(text, existingContext = '') {
  const prompt = `${existingContext}\nEmbed the following text: ${text}`;
  return response.choices[0].text;
}

const extractData = async (pdfBuffer) => {
  const data = await pdfParse(pdfBuffer)
  return data.text
}

app.post("/fileUpload", upload.single('pdf'), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  try {
    const pdfBuffer = req.file.buffer
    const text = await extractData(pdfBuffer)
    const embeddings = await generateEmbeddings(text)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
})


app.post("/ask", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  const prompt = req.body.prompt;
  console.log(prompt)
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await opena.chat.ciompletions.create({

      model: "gpt-4",
      messages: [
        { "role": "user", "content": prompt }
      ]
    });
    const completion = response.choices[0].message;
    return res.status(200).json({
      success: true,
      message: completion
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));


