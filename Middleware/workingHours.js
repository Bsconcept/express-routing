const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();
  
  // Check if it's a weekday (Monday to Friday = 1-5)
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  
  // Check if it's within working hours (9 AM to 5 PM)
  const isWorkingHour = hour >= 9 && hour < 17;
  
  if (isWeekday && isWorkingHour) {
    // Allow access during working hours
    next();
  } else {
    // Return a 503 Service Unavailable page when outside working hours
    res.status(503).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Outside Working Hours</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            text-align: center;
            padding: 40px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
          }
          h1 { font-size: 3em; margin-bottom: 20px; }
          p { font-size: 1.2em; margin: 10px 0; }
          .hours {
            margin-top: 20px;
            padding: 15px;
            background: rgba(255,255,255,0.2);
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔒 Service Unavailable</h1>
          <p>Our website is only available during working hours:</p>
          <div class="hours">
            <p><strong>Monday - Friday</strong></p>
            <p><strong>9:00 AM - 5:00 PM</strong></p>
          </div>
          <p>Please visit us during working hours.</p>
          <p>Thank you for understanding! 🙏</p>
        </div>
      </body>
      </html>
    `);
  }
};

module.exports = workingHoursMiddleware;
