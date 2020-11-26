import INationalNames from '../models/NationalNames';
import IStateNames from '../models/StateNames';
import { kmeans, Elbow, SynthesizeData } from "./K-means";
import {getAmericanSoundex, IPhoneticTrends} from './BusinessLogic';

interface IPercentageNameByState {
    'listPercentageNames': Array<INamePercentage>;
    'state': string;
}

interface INamePercentage {
    'name': string;
    'percentage': number;
}

interface IGroups{
    [key : string] : Array<string>;
}

interface IDataFrame {
    'state': Array<string>;
    'phoneticCode': Array<string>;
    'percentage': Array<number>;
    'group'?: Array<number>;
}

export const ClusterState = (listBabiesByState:  Array<IStateNames>, listNames: Array<INationalNames>) => {
    const americanSoundexList = getAmericanSoundex(listNames);
    const nameList = OrderPhonetic(americanSoundexList);
    const stateNamesPercentages = PercentageName(listBabiesByState);
    let dataFrame = getDataFrame(stateNamesPercentages, americanSoundexList);
    let numericListNames = SynthesizeData.CategoricalToNumerical(nameList, dataFrame.phoneticCode);
    let percentageNormalize = SynthesizeData.MinMaxNormalization(dataFrame.percentage);
    numericListNames = SynthesizeData.MinMaxNormalization(numericListNames);

    const dataset = SynthesizeData.SetCoordinates(numericListNames, percentageNormalize);
    const k = Elbow.init(dataset, 8);
    const output = kmeans(dataset, k);
    dataFrame.group = output.indexes;

    const groups : IGroups = {};
    let i = 0;

    while(i < k){
        groups[i] = [];
        i++;
    }
    
    if(dataFrame.group){
        for(const state of stateNamesPercentages){
            let group = defineGroupForState(dataFrame.state, dataFrame.group, state.state);
            groups[group].push(state.state);
        }
    }

   return groups;
}

const defineGroupForState = (stateList : Array<string>, groupList : Array<number>, state : string) : number=> {
    const totalGroups : Array<number> = [];
    let group = 0, number = 0;

    for(const index in stateList){
        if(stateList[index] === state)
        {
            let group = groupList[index];
            totalGroups[group] = totalGroups[group] ? totalGroups[group] += 1 : 1;
        }
    }

    for(const index in totalGroups){
        if(totalGroups[index] > number){
            group = +index;
            number = totalGroups[index];
        }
    }

    return group;
}

const getDataFrame = (percentageList: Array<IPercentageNameByState>, americanSoundexList : Array<IPhoneticTrends>) : IDataFrame => {
    const stateList : Array<string> = [], phoneticList : Array<string> = [], percentage : Array<number> = [];

    for(const state of percentageList){
        for(const name of state.listPercentageNames)
        {
            stateList.push(state.state);
            percentage.push(name.percentage);
            let phoneticObj = americanSoundexList.filter(x => x.names.includes(name.name));
            if(phoneticObj.length === 1)
                phoneticList.push(phoneticObj[0].phonetic);
        }
    }

    return {'state': stateList, 'phoneticCode': phoneticList, 'percentage': percentage};
}

const OrderPhonetic = (americanSoundexList: Array<IPhoneticTrends>) : Array<string> => {
    const phoneticList : Array<string> = [];

    americanSoundexList.sort((a,b) => a.phonetic.localeCompare(b.phonetic));
    
    for(const phoneticObj of americanSoundexList)
    {
        phoneticList.push(phoneticObj.phonetic);
    }

    return phoneticList;
}

const PercentageName = (listBabiesState: Array<IStateNames>) : Array<IPercentageNameByState> => {
    let state = '', list : Array<IPercentageNameByState> = [];

    for(const stateObj of listBabiesState)
    {
        if(state !== stateObj.State){
            state = stateObj.State;
            const PercentageBabiesNames = PercentageNameByState(listBabiesState.filter(babie => babie.State === state));
            list.push(PercentageBabiesNames);
        }
    }

    return list;
}

const PercentageNameByState = (listBabies : Array<IStateNames>) : IPercentageNameByState => {
    let list : Array<INamePercentage> = [];
    let totalBabies = TotalBabiesByState(listBabies);

    for(const babieObj of listBabies)
    {
        let percentage = PercentageThisNameInThatState(babieObj.Count, totalBabies);
        list.push({'name': babieObj.Name, 'percentage': percentage});
    }

    return { 'state': listBabies[0].State, 'listPercentageNames': list };
}

const TotalBabiesByState = (listBabies : Array<IStateNames>) : number => {
    let totalBabies = 0;

    for(const babie of listBabies){
        totalBabies += babie.Count;
    }

    return totalBabies;
}

const PercentageThisNameInThatState = (Babies : number, totalBabies: number) : number => {
    return (Babies*100) / totalBabies;
}