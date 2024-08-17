const express = require('express');
const contactRoutes = require('./routes/contactRoutes');
const app = express();

app.use(express.json());
app.use('/api/contacts', contactRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
