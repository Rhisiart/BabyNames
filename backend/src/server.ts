import express from 'express';
import sqlite from 'sqlite3';
import {getNationalNamesByYear, getTendency, getBirthsFromTo, phoneticTrend, hammingDistance, AmericanSoundex} from './routes/National';
import { getStatePopulationVariesOverTime, getClusters, getStateTrendsetters, getGenderRatioBirth, postTest } from './routes/States';
import dotenv from "dotenv";

const app = express();

dotenv.config();
//sqlite.verbose();

const port = Number(process.env.PORT) || 2000;

const hostname = process.env.IP;

export const db = new sqlite.Database(process.env.db_path!, (err) => {
    console.log(err ? 'Fail to connect to db' : 'Connected to db');
});

//Middlewares
app.use(express.json());

//Route Middlewares 
app.use("/api/national", getNationalNamesByYear);
app.use("/api/national", getTendency);
app.use("/api/national", phoneticTrend);
app.use("/api/national", AmericanSoundex);
app.use("/api/national", hammingDistance);
app.use("/api/national", getBirthsFromTo);

app.use("/api/states", getStatePopulationVariesOverTime);
app.use("/api/states", getClusters);
app.use('/api/states', getStateTrendsetters);
app.use('/api/states', getGenderRatioBirth);
app.use('/api/states', postTest);

/*db.on('trace', (queryString) => {
    console.log(queryString);
});*/

app.listen(port, hostname!, () => {
    console.log(`server running http://${hostname}:${port}`)
});
//db.close()