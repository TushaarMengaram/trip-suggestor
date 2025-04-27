const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));


// Load destinations data
const destinations = JSON.parse(fs.readFileSync('destinations.json', 'utf-8'));
const images = JSON.parse(fs.readFileSync('images.json', 'utf-8'));


// API to suggest trips
app.post('/suggest', (req, res) => {
    const { budget, season, days, tripType } = req.body;
  
    if (budget == null || !season || days == null) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
  
    const suggestions = destinations.filter(place => {
      const matchesBudget = place.budgetMin <= budget && place.budgetMax >= budget;
      const matchesSeason = place.bestSeason.includes(season);
      const matchesDays = days >= place.idealDaysMin && days <= place.idealDaysMax;
      const matchesTripType = tripType ? place.type.includes(tripType) : true;
  
      return matchesBudget && matchesSeason && matchesDays && matchesTripType;
    });
  
    if (suggestions.length === 0) {
      return res.status(404).json({ message: 'No destinations found for given criteria.' });
    }
  
    // ⬇️ Attach images before sending
    const enrichedSuggestions = suggestions.map(place => {
      return {
        ...place,
        image: images[place.name] || 'https://via.placeholder.com/300x200?text=No+Image'
      };
    });
  
    res.json(enrichedSuggestions);
  });
  

// Health check route (optional, good practice)
app.get('/', (req, res) => {
    res.send('Trip Suggester API is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});