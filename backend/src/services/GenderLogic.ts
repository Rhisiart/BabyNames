import IStateNames from "../models/StateNames";

interface IGenderRatio{
    'Male': number;
    'Female': number;
    'year': number;
}

interface IGenderRatioList{
    [key : string] : Array<IGenderRatio>;
}

interface IResponse{
    'stateGenderRatio': IGenderRatioList;
    'minYear': number;
    'maxYear': number;
}

export const GenderRatio = (listState : Array<IStateNames>, listYears : Array<IStateNames>, maleList : Array<IStateNames> , femaleList : Array<IStateNames>) : IResponse => {
    const stateGenderRatio : IGenderRatioList = {};

    for(const state of listState)
    {
        if(state.State){
          
            let obj =  GenderRatioByState(listYears, maleList.filter(x => x.State === state.State),  femaleList.filter(x => x.State === state.State));
            stateGenderRatio[state.State] = obj;
        }
    }

    return {
        'stateGenderRatio' : stateGenderRatio,
        'minYear': listYears[0].Year,
        'maxYear': listYears[listYears.length - 1].Year
    };
}

const GenderRatioByState = (listYears : Array<IStateNames>, maleList : Array<IStateNames> , femaleList : Array<IStateNames>) : Array<IGenderRatio> => {
    const list :  Array<IGenderRatio> = [];

    for(const year of listYears)
    {
        if(year.Year){
            let statePercentage = totalBabieSByYear(maleList.filter(x => x.Year === year.Year), femaleList.filter(x => x.Year === year.Year), year.Year);
            list.push(statePercentage);
        }
    }

    return list;
}

const totalBabieSByYear = (maleList : Array<IStateNames> , femaleList : Array<IStateNames>, year: number) : IGenderRatio => {
    let total = 0, totalMale = 0, totalFemale = 0;

    for(const babie of maleList){
        total += babie.Count;
        totalMale += babie.Count;
    }

    for(const babie of femaleList){
        total += babie.Count;
        totalFemale += babie.Count;
    }

    return {'Male': (totalMale*100)/total,'Female': (totalFemale*100)/total, 'year': year};
}