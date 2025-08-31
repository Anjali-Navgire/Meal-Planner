require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mealRoutes = require("./routes/mealRoutes.js");

const app = express();


app.get("/",(req,res) => {
    res.send("Working Properly")
})

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); 

// for testing
app.get('/ping', (req, res) => {
  res.send('pong');
});
app.get('/api/favorites/test', (req, res) => {
  res.json({ message: 'Favorites route works!' });
});
app.get('/api/recipes/test', (req, res) => {
  res.json({ message: 'Recipe route works!' });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const recipeRoutes = require("./routes/recipeRoutes.js");
const favoriteRoutes = require('./routes/favoriteRoutes.js');



app.use('/api/auth', authRoutes);
app.use('/api/auth', userRoutes);
app.use("/api", mealRoutes);
app.use("/api/recipes",recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
app.get("/api/meals/sample", (req, res) => {
  const sampleMeals = [
    {
      idMeal: "1",
      strMeal: "Spaghetti Bolognese",
      strMealThumb: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
      strCategory: "Pasta",
      strSource: "https://www.example.com/spaghetti"
    },
    {
      idMeal: "2",
      strMeal: "Chicken Curry",
      strMealThumb: "https://www.themealdb.com/images/media/meals/1525873040.jpg",
      strCategory: "Curry",
      strSource: "https://www.example.com/chicken-curry"
    },
    {
      idMeal: "3",
      strMeal: "Greek Salad",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      strCategory: "Salad",
      strSource: "https://www.example.com/greek-salad"
    },
    {
    idMeal: "52768",
    strMeal: "Chicken Alfredo Primavera",
    strMealThumb: "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
    strCategory: "Chicken",
    strSource: "https://www.themealdb.com/meal/52768"
  },
  {
    idMeal: "52772",
    strMeal: "Teriyaki Chicken Casserole",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    strCategory: "Chicken",
    strSource: "https://www.themealdb.com/meal/52772"
  },
  {
    idMeal: "52874",
    strMeal: "Beef and Mustard Pie",
    strMealThumb: "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    strCategory: "Beef",
    strSource: "https://www.themealdb.com/meal/52874"
  },
  {
    idMeal: "52819",
    strMeal: "Chicken Fajita Mac and Cheese",
    strMealThumb: "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
    strCategory: "Chicken",
    strSource: "https://www.themealdb.com/meal/52819"
  },
  {
    idMeal: "52977",
    strMeal: "Corba",
    strMealThumb: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
    strCategory: "Soup",
    strSource: "https://www.themealdb.com/meal/52977"
  },
  {
    idMeal: "52918",
    strMeal: "Chicken Handi",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    strCategory: "Chicken",
    strSource: "https://www.themealdb.com/meal/52918"
  },
  {
    idMeal: "52802",
    strMeal: "Fish pie",
    strMealThumb: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
    strCategory: "Seafood",
    strSource: "https://www.themealdb.com/meal/52802"
  },
  {
    idMeal: "52844",
    strMeal: "Lasagne",
    strMealThumb: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
    strCategory: "Pasta",
    strSource: "https://www.themealdb.com/meal/52844"
  },
  {
    idMeal: "52855",
    strMeal: "Chicken Enchilada Casserole",
    strMealThumb: "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg",
    strCategory: "Chicken",
    strSource: "https://www.themealdb.com/meal/52855"
  }
  ];

  res.json({ meals: sampleMeals });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log(`Server running on port 5000`));
})
.catch((err) => console.error(err));



