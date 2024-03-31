const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({ status: 'I am alive' });
});

app.get('/check-email', async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email parameter is missing' });
  }

  let browser = null;
  try {
    // Update your proxy server details here
    const proxyUrl = 'pr.i76w62d5.lunaproxy.net:32233'; // Replace with your proxy URL
    const proxyUser = 'user-lu9496043'; // Replace with your proxy username
    const proxyPass = '39gvLy'; // Replace with your proxy password

    browser = await puppeteer.launch({
      headless: true, // Set to true in production
      args: [`--proxy-server=${proxyUrl}`], // Proxy server argument
    });
    const page = await browser.newPage();

    // Proxy authentication
    await page.authenticate({
      username: proxyUser,
      password: proxyPass,
    });

    await page.goto('https://accounts.google.com/signin');
    await page.type('input[type="email"]', email);
    await delay(1000);

    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextButton = buttons.find(button => button.textContent && button.textContent.toLowerCase().includes('next'));
      if (nextButton) nextButton.click();
    });
    await delay(3000); // Wait after clicking the "Next" button

    let emailStatus = 'Unable to determine'; // Default status

    for (let attempts = 0; attempts < 3; attempts++) {
      const passwordInputExists = await page.evaluate(() => {
        const passwordInput = document.querySelector('input[type="password"]');
        return !!passwordInput;
      });

      const errorMessage = await page.evaluate(() => {
        const pageText = document.body.textContent;
        return pageText.includes("find your Google Account");
      });

      if (errorMessage) {
        emailStatus = 'Invalid';
        break; // Email is invalid, exit loop
      } else if (passwordInputExists) {
        emailStatus = 'Valid';
        break; // Email is valid, exit loop
      }

      await delay(1000); // Wait for 1 second before trying again
    }

    res.json({ emailStatus: emailStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});

// Function to introduce a delay
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}