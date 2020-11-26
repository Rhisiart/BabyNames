import Routes from 'express';
import {getAllNames, getAllNamesByYear, getAllNamesLastFiveYears, getBabyByYearNational, getBirthsByYear, getBirthsTotal} from '../controllers/queries';
import {getHammingDistance, getPercentageByYear, getPhoneticTrends, getBirthsByYearPerc, getAmericanSoundex} from '../services/BusinessLogic';

const route = Routes();

export const getNationalNamesByYear = route.get('/Year/:year', async (req, res) => {
    if (!req.params.year)
        return res.status(404).json({'error': {'message' : 'Year not found!'}});

    try{
        const result = await getBabyByYearNational(req.params.year);
        return res.status(200).json({'babyArray': result});
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const getBirthsFromTo = route.get('/FromTo/:fromyear/:toyear', async (req, res) => {
    if (!req.params.fromyear)
        return res.status(404).json({'error': {'message' : 'Year not found!'}});

    if (!req.params.toyear)
        return res.status(404).json({'error': {'message' : 'Year not found!'}});

    const fromyear : number = Number(req.params.fromyear);
    const toyear : number = Number(req.params.toyear);
    try{
        const resultByYear = await getBirthsByYear(fromyear,toyear);
        const resultTotal = await getBirthsTotal(fromyear,toyear);
        const result = resultByYear instanceof Error ? resultByYear : getBirthsByYearPerc(resultByYear, resultTotal);
        return res.status(200).json({'babyArray': result});
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const getTendency = route.get('/tendency/:year', async (req, res) => {
    
    if (!req.params.year)
        return res.status(404).json({'error': {'message' : 'Year not found!'}});

    const year : number = Number(req.params.year);
    try{        
        const result = await getAllNamesLastFiveYears(year);
        console.log("Start-> " + new Date());
        const listNames = result instanceof Error ? result : getPercentageByYear(result, year);
        console.log("End-> " + new Date());
        return res.status(200).json({'popular_names': listNames});
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const phoneticTrend = route.get('/phoneticTrend/:year', async (req, res) => {
    if (!req.params.year)
        return res.status(404).json({'error': {'message' : 'Year not found!'}});
    const year : number = Number(req.params.year);
    try{        
        const allNames = await getAllNamesByYear(year);
        const result = allNames instanceof Error ? allNames : getPhoneticTrends(allNames);
        return res.status(200).json({'phonetic_trends': result});
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const AmericanSoundex = route.get('/AmericanSoundex/:year', async (req, res) => {
    if (!req.params.year)
        return res.status(404).json({'error': {'message' : 'Year not found!'}});
    const year : number = Number(req.params.year);
    try{        
        const allNames = await getAllNamesByYear(year);
        const result = allNames instanceof Error ? allNames : getAmericanSoundex(allNames);
        return res.status(200).json({'phonetic_trends': result});
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const hammingDistance = route.get('/hammingDistance/:name', async (req, res) => {
    if (!req.params.name)
        return res.status(404).json({'error': {'message' : 'Name not found!'}});

    const name : string = req.params.name;
    try{        
        const allNames = await getAllNames();
        const result = allNames instanceof Error ? allNames : getHammingDistance(allNames, name);
        return res.status(200).json({'hamming_distances': result});
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});