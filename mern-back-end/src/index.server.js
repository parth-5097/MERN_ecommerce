const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');

env.config();
// app.use(express.json());

//mongo db connection string
//mongodb+srv://root:<password>@cluster0.xky1g.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.xky1g.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected');
});

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);

app.listen(process.env.PORT, () => console.log(`server is running on: ${process.env.PORT}`));