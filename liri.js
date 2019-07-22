require('dotenv').config()

const keys = require("./keys.js");
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

const nodeArgs = process.argv;
let songName ="";
for (let i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        songName = songName + "+" + nodeArgs[i];
    } else {
        songName += nodeArgs[i];

    }

}

let searchSpotify = function (songName) {
    spotify.search({
        type: 'track',
        query: songName,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let songSearch = data.tracks.items;
        for (let i = 0; i < songSearch.length; i++) {
           
            console.log("Artist: " + songSearch[i].artists[0].name);
            console.log("Song Name: " + songSearch[i].name);
            console.log("Spotify Preview URL: " + songSearch[i].preview_url);
            console.log("Album: " + songSearch[i].album.name);
            console.log("---------------------");
        }
    });

};

searchSpotify(songName); 

// had trouble initiailizing the spotify-this-song command 
// let command = function(swi) {
//     switch (swi) {
//         case 'spotify-this-song':
//             searchSpotify();
//             break;
//         default:
//             console.log("No se!");
//     }
// };

// let runProg = function(songName) {
//     command(songName);
// };

// runProg(); 

