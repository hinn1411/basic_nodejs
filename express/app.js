const express = require("express");
const app = express();
const peopleRoutes = require('./routes/people');
const authRoutes = require('./routes/auth');
// use static assets.
app.use(express.static("./methods-public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use('/api/people', peopleRoutes);
app.use('/login', authRoutes);



app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});
