const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const classRoutes = require('./path/classes');
const cartRoutes = require('./path/cart');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/classes', classRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
