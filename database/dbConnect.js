const mongoose = require('mongoose');
// username - datacenterMDB_01
// password - aKAOqYqf6KPVBeRh

const connection_url = process.env.MONGO_URL;
const connectDatabase = (uri, callback) => {
    try {
        mongoose.connect(connection_url, (error) =>  {
            if (error) console.log("CallBack Error", error);
        });
    } catch (error) {
        console.error("Try-Catch Error ---> ", error.message);
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("Database is disconnected!");
});
mongoose.connection.on("connected", () => {
    console.log("Database is Connected!");
});

module.exports = connectDatabase;
