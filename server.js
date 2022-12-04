// const express = require("express");
const axios = require("axios");


// const app = express();
// const port = 3000;

axios({
    method: "post",
    url: "https://api.openai.com/v1/completions",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer APIKEYHERE`
    },
    data: {
        "prompt": "how do I make it",
        "model": "text-davinci-003",
        "max_tokens": 500,
        "temperature": 0.5
    }
})
.then(response => console.log(response.data))
.catch(error => console.error(error))
// app.get("/", (req, res) => {
//     res.send("Hello, world!");
// });

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });


