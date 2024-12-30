const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Endpoint to get all users
app.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to add a new user
app.post('/add-user', (req, res) => {
  const newUser = req.body;
  fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    const users = JSON.parse(data);
    newUser.id = Date.now().toString(); // Unique ID based on timestamp
    users.push(newUser);
    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving data');
      }
      res.status(201).send('User added');
    });
  });
});

// Endpoint to delete a user
app.delete('/delete-user/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile(path.join(__dirname, 'users.json'), (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    let users = JSON.parse(data);
    users = users.filter(user => user.id !== userId);
    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving data');
      }
      res.status(200).send('User deleted');
    });
  });
});

// About and Contact pages
// app.get('/about', (req, res) => {
//   res.send('<h1>About Page</h1><p>This is the about page.</p>');
// });

// app.get('/contact', (req, res) => {
//   res.send('<h1>Contact Page</h1><p>This is the contact page.</p>');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
