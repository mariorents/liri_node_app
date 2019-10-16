require('dotenv').config();
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
// const moment = require("moment");




const artistNames = function (artist) {
    return artist.name;
};


const getSpotify = function (songName) {
    if (!songName) {
        songName = "The Sign - Ace of Base"
    };

    spotify.search({
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error:" + err);
                return;
            }

            const songs = data.tracks.items;
            for (let i = 0; i < songs.length; i++) {
                console.log("artist(s): " + songs[i].artists.map(artistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");

            }

        })
};

const bandInfo = function (artist) {
    const URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
        const jsonData = response.data;
        if (!jsonData.length) {
            console.log(artist + " yielded no results. Try a different artist.")
        }

        // console.log("Upcoming concerts: ");
        // for (let i = 0; i < jsonData.length; i++) {
        //     const show = jsonData[i];


        // }
    })

}

const movies = function (name) {
    if (!name) {
        name = "Mr Nobody"
    };
    const url = "http://www.omdbapi.com/?t=" + name + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    axios.get(url).then(function (response) {
        const jsonData = response.data;
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("Rated: " + jsonData.Rated);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
    })
}

const whatItSays = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        console.log(data);
        const dataArr = data.split(",");

        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            pick(dataArr[0]);
        }

    })
}

const pick = function (caseData, data) {
    switch (caseData) {
        case "spotify-this-song":
            getSpotify(data);
            break;
        case "concert-this":
            bandInfo(data);
            break;
        case "movie-this":
            movies(data);
            break;
        case "do-what-it-says":
            whatItSays(data);
            break;  
        default:
            console.log("LIRI NO SABE!")
    }
}


const run = function (argOne, argTwo) {
    pick(argOne, argTwo);
};


run(process.argv[2], process.argv.slice(3).join(" "));