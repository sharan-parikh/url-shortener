import express, { Request, Response } from "express";

const app = express();
const port = 8080;
const baseUrl = 'http://locahost:8080';

app.use(express.json());

// api to shorten the url.
app.post('shorten/', async (req, res) => {
    const { url } = req.body;
    
    if(!url) {
        // TODO
    } else {
        // TODO
    }
});

app.listen(port, () => {
    console.log(`Server is runnning on port: ${port}`);
});

