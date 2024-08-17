const sequelize = require('./models/index');
const Contact = require('./models/contact');

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created or already exist!');
}).catch(err => {
  console.error('Error creating database:', err);
});
