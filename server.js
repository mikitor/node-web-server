const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('year', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.path}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageName: 'Home Page',
    welcomeMessage: 'Welcome to my page!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageName: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageName: 'Portfolio Page',
    welcomeMessage: 'Portfolio page here',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill request.',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
