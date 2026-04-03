const express = require('express');
const path = require('path');
const workingHoursMiddleware = require('./middleware/workingHours');

const app = express();
const PORT = 3000;

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Apply working hours middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
  res.render('home', { 
    title: 'Home',
    currentPage: 'home'
  });
});

app.get('/services', (req, res) => {
  res.render('services', { 
    title: 'Our Services',
    currentPage: 'services'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us',
    currentPage: 'contact'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Working hours: Monday-Friday, 9:00-17:00`);
});
