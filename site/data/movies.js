const fs = require("fs");
const path = require('path');

const movies_db = path.join('data','movies.json');
const encoding = "utf-8";

module.exports = {
    getMovies: () => JSON.parse(fs.readFileSync(movies_db, encoding)),
    setMovies: (data) => {
        fs.writeFileSync(
            movies_db,
            JSON.stringify(data, null, 2),
            encoding
        );
    },
};