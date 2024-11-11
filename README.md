# Transform Your Email Communication with Our Custom Email-Sending Application!

In today’s fast-paced digital world, effective communication is key to building relationships and driving engagement. Introducing our **Custom Email-Sending Application**—a powerful tool designed to revolutionize the way you connect with your audience!

Imagine effortlessly sending personalized emails that resonate with each recipient, all while saving time and maximizing impact. This application combines the power of automation with the art of personalization, allowing you to create and dispatch tailored emails that stand out in crowded inboxes.

## Key Features:
- **Dynamic Data Integration**: Seamlessly read data from Google Sheets or CSV files to customize your emails. Say goodbye to generic messages and hello to personalized communication!
- **Easy Email Account Connection**: Securely connect your email account with just a few clicks, enabling you to send emails directly from your preferred provider.
- **Intelligent Content Generation**: Leverage advanced language models to craft engaging email content. Input a customizable prompt, and watch as the application generates compelling messages tailored to your audience.
- **Real-Time Analytics**: Gain insights into your email performance with real-time status updates and analytics. Track open rates, click-through rates, and engagement metrics to refine your email strategy.
- **Flexible Scheduling & Throttling**: Schedule your emails for optimal delivery times and control the sending pace to ensure compliance with ESP regulations, preventing your messages from being flagged as spam.

## Why Choose Our Application?
Whether you're a marketer looking to enhance your campaigns, a business owner aiming to foster customer relationships, or a non-profit organization striving to engage supporters, our application is your go-to solution for effective email communication.

Join the ranks of successful communicators who understand that personalization is the key to connection. With our Custom Email-Sending Application, you’ll not only save time but also create meaningful interactions that drive results.

---

## Usage

### Step 1: Set Up Google Sheets or CSV File
1. Create a Google Sheet or a CSV file with the necessary columns for email customization (e.g., Name, Email, Custom Prompt).
2. Ensure the sheet is accessible to the application by sharing it appropriately.

### Step 2: Connect Your Email Account
1. In the application, navigate to the account settings.
2. Enter your email credentials or connect via OAuth for secure access.
3. Update the connection code in `server.js`:
   Replace 'your_email@gmail.com' with your actual Gmail address.
   Replace 'your_app_password' with your actual Gmail app password.
### Step 3: Customize Email Prompts
Use the front-end dashboard to input your customizable prompt.
The prompt can be personalized based on the data from the Google Sheet or CSV file.
### Step 4: Email Customization and Sending
The application will utilize a language model (LLM) or other content-generation methods to create personalized email content based on the prompt and data.
Review the generated emails before sending them out.
Update the email sending function in server.js:   
```javascript
const mailOptions = {
    from: 'your_email@gmail.com', // Replace with your email
    to: recipients.join(','), // The list of recipient emails
    subject: subject || 'No Subject', // Email subject
    text: text || 'No content', // Email body content
};
```
### Step 5: Set Up API Key for LLM
Locate the section in your code where the API key is defined.
Add the following line in EmailCustomizationPage.js to set your API key:
   **const apiKey = "PLACE YOUR API KEY HERE"; // Replace with your actual API key**
Ensure that the API key is securely stored.
### Step 6: Real-Time Status and Analytics
After sending emails, the dashboard will display real-time status updates and analytics, such as open rates and click-through rates.
Monitor the performance of your email campaigns through the dashboard.
### Step 7: Email Scheduling and Throttling
Use the scheduling feature to set specific times for your emails to be sent.
Implement throttling to control the rate of email delivery to avoid being flagged as spam by the ESP.

