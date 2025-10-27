const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedsHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,     // 新しいURLパーサを使用（推奨）
    useUnifiedTopology: true,  // 新しい接続管理エンジンを使用（推奨）
    useCreateIndex: true
})
    .then(() => {
        console.log(" MongoDB接続成功");
    })
    .catch(err => {
        console.log("接続エラー:", err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i += 1) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`
        });
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});