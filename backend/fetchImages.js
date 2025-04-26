const axios = require('axios');
const fs = require('fs');

// Your Unsplash Access Key
const UNSPLASH_ACCESS_KEY = 'HT7e0ymUqS4eSPUKtHEaREeIqMOfNh047cYhh1kZ_34'; // <-- Paste your access key here

// List of your destinations
const destinations = [
  "Manali",
  "Shimla",
  "Munnar",
  "Sikkim",
  "Coorg",
  "Goa",
  "Rishikesh",
  "Ooty",
  "Darjeeling",
  "Leh",
  "Udaipur",
  "Jaisalmer",
  "Agra",
  "Varanasi",
  "Andaman Islands",
  "Pondicherry",
  "Kasol",
  "Auli",
  "Mussoorie",
  "Nainital",
  "Alleppey",
  "Kodaikanal",
  "Tawang",
  "Khajuraho",
  "Hampi",
  "Puri",
  "Mahabalipuram",
  "Mount Abu",
  "Bikaner",
  "Ranthambore",
  "Kaziranga",
  "Jim Corbett",
  "Shillong",
  "Cherrapunji",
  "Lakshadweep",
  "Gokarna",
  "Kanyakumari",
  "Spiti Valley",
  "Ziro Valley",
  "Gangtok",
  "Pahalgam",
  "Gulmarg",
  "Dharamshala",
  "McLeod Ganj",
  "Ranthambore National Park",
  "Gir National Park",
  "Sundarbans",
  "Ajanta Ellora",
  "Badami",
  "Mahabalipuram"
];


// Function to fetch image URL for a place
async function fetchImage(place) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(place)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;
    try {
        const response = await axios.get(url);
        if (response.data.results.length > 0) {
            return response.data.results[0].urls.regular; // Regular sized image
        } else {
            console.log(`No image found for ${place}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching image for ${place}:`, error.message);
        return null;
    }
}

// Main function to generate images.json
async function generateImagesJson() {
    const images = {};
    for (const place of destinations) {
        const imageUrl = await fetchImage(place);
        if (imageUrl) {
            images[place] = imageUrl;
            console.log(`✅ Fetched image for ${place}`);
        } else {
            console.log(`❌ Skipped ${place}`);
        }
    }

    fs.writeFileSync('images.json', JSON.stringify(images, null, 2));
    console.log('🎉 All done! Check images.json file!');
}

generateImagesJson();
