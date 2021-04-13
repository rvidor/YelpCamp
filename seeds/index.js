const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '605da39a2a0e8a183889081a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolore temporibus officia omnis libero qui fuga ipsum voluptas, quia quos aliquam autem deleniti deserunt aperiam aliquid quae illum consequuntur rerum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ds81wpt3k/image/upload/v1616867618/YelpCamp/wxkwovl5k6ds6j8k2wry.jpg',
                    filename: 'YelpCamp/wxkwovl5k6ds6j8k2wry'
                },
                {
                    url: 'https://res.cloudinary.com/ds81wpt3k/image/upload/v1616867619/YelpCamp/nksfq6wa1l0uo1e3nfo7.jpg',
                    filename: 'YelpCamp/nksfq6wa1l0uo1e3nfo7'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});