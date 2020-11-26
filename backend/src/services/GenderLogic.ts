import { getMaleBabieByStateAndYear, getFemaleBabieByStateAndYear } from "../controllers/queries";
import IStateNames from "../models/StateNames";

interface IGenderRatio{
    'Male': number;
    'Female': number;
    'year': number;
}

interface IGenderRatioList{
    [key : string] : Array<IGenderRatio>;
}

export const GenderRatio = async (listState : Array<IStateNames>, listYears : Array<IStateNames>) : Promise<IGenderRatioList> => {
    const returnObj : IGenderRatioList = {};

    for(const state of listState)
    {
        if(state.State){
            try{
                let obj = await GenderRatioByState(listYears, state.State);
                returnObj[state.State] = obj;
            }catch(error){
                 throw new Error(error);
            }
        }
    }

    return returnObj;
}

const GenderRatioByState = async (listYears : Array<IStateNames>, state: string) : Promise<Array<IGenderRatio>> => {
    const list :  Array<IGenderRatio> = [];

    for(const year of listYears)
    {
        if(year.Year){
            try{
                const maleBabie = await getMaleBabieByStateAndYear(state, year.Year);
                const femaleBabie = await getFemaleBabieByStateAndYear(state, year.Year);
    
                if(Array.isArray(maleBabie) &&  Array.isArray(femaleBabie))
                {
                    if(maleBabie[0].Count && femaleBabie[0].Count){
                        let totalBabies = maleBabie[0].Count + femaleBabie[0].Count;
                        list.push({'Male': (maleBabie[0].Count*100)/totalBabies,'Female': (femaleBabie[0].Count*100)/totalBabies, 'year': year.Year});
                    }
                }
            }catch(error){
                throw new Error(error);
            }
        }
    }

    return list;
}