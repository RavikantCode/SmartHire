// utils/datauri.js
import DataURIParser from 'datauri/parser.js';
import path from 'path';
import fs from 'fs';

const parser = new DataURIParser();

const getDataUri = (file) => {
    const parser = new DataURIParser();
    console.log("file from datauri",file);

    const extname = path.extname(file.originalname).toString(); // Get the file extension
    const buffer = fs.readFileSync(file.path); // Read the file
    
    return parser.format(extname, buffer).content; // Return the data URI
};
export default getDataUri
