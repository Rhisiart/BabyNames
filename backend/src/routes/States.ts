import Routes from 'express';
import {getPopulationByYearFromState, getStatePopulationOverTime, getBabiesBornByState, getAllNames, getBabiesByName, getState, getYears, getAllNamesByYear} from '../controllers/queries';
import IStateNames from '../models/StateNames';
import { ForNameGetStateTrendsetters} from '../services/BusinessLogic';
import {ClusterState} from '../services/ClusterLogic';
import { GenderRatio } from '../services/GenderLogic';

const route = Routes();

export const getStatePopulationVariesOverTime = route.get('/:state/population', async (req, res) => {
    const state : string = req.params.state.toUpperCase();

    if (!state) // the state can be valid but dont exist
        return res.status(404).json({'error': {'message' : 'state dont found!'}});

    try{
        const result = await getPopulationByYearFromState(state);
        
        return res.status(200).json({state : result});
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const getStatePopulation = route.get('/population', async (req, res) => {
    try{
        const result = await getStatePopulationOverTime();      

        return res.status(200).json();
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const getClusters = route.get('/clusters', async (req, res) => {
    try{
        const listBabiesBorn = await getBabiesBornByState();      
        const listNames = await getAllNamesByYear(2014);
        
        const list = listBabiesBorn instanceof Error || listNames instanceof Error ? listBabiesBorn : ClusterState(listBabiesBorn, listNames);
        
        return res.status(200).json(list);
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const getStateTrendsetters = route.get('/trendsetters', async (req, res) => {
    try{
        const result = await getBabiesByName('Tiago');
        const listNames = result instanceof Error ? result : ForNameGetStateTrendsetters(result);

        return res.status(200).json({'Trendsetters': listNames});
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});

export const getGenderRatioBirth = route.get('/genderratio', async (req, res) => {
    try{
        const listState = await getState();
        const listYears = await getYears();

        const gender = Array.isArray(listState) &&  Array.isArray(listYears) ? await GenderRatio(listState, listYears) : listYears ;

        return res.status(200).json(gender);
    }catch(error){
        return res.status(404).json({'error' : error});
    }
});