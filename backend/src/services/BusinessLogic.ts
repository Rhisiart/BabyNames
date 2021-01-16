import INationalNames from "../models/NationalNames";
import IStateNames from '../models/StateNames';
import { kmeans, Elbow, SynthesizeData } from "./K-means";

interface ITendency {
    'name': string;
    'prediction_born': number;
}

export interface IPhoneticTrends {
    'phonetic': string;
    'names': string[];
    'count': number;
}

interface IPopulationByYearPerc {
    'year': number;
    'count': number;
    'perc': number;
}
export const getBirthsByYearPerc = (listNames: Array<INationalNames>, TotalCount: number): Array<IPopulationByYearPerc> => {

    let listInfoNames: Array<IPopulationByYearPerc> = [];

    listNames.forEach(element => {
        listInfoNames.push({ year: element.Year, count: element.Count, perc: element.Count / TotalCount * 100 })
    });


    return listInfoNames;
}

export const getPercentageByYear = (listNames: Array<INationalNames>, year: number): Array<ITendency> => {

    let listInfoNames: Array<ITendency> = [];

    listNames.filter(x => x.Year == year - 1).forEach(element => {
        let mean = 0;
        let listPrevYears = listNames.filter(x => x.Name == element.Name && x.Gender == element.Gender);

        if (listPrevYears.length != 1)
            mean = calcuteMeanGrowthBornBabyByName(listPrevYears);

        listInfoNames.push({ name: element.Name, prediction_born: Math.round(mean * element.Count) });
    });

    return listInfoNames.sort((a, b) => b.prediction_born - a.prediction_born).slice(0, 5);
}

const calcuteMeanGrowthBornBabyByName = (listPrevYears: Array<INationalNames>): number => {
    let total = 0;

    for (let obj of listPrevYears) {
        let prevYearId = listPrevYears.findIndex(x => x.Year == obj.Year - 1);

        if (prevYearId != -1) {
            total += obj.Count / listPrevYears[prevYearId].Count;
        }
    }

    return total / (listPrevYears.length - 1);
}

export const getPhoneticTrends = (listNames: Array<INationalNames>): Array<IPhoneticTrends> => {

    let listPhoneticTrends: Array<IPhoneticTrends> = [];

    listNames.forEach(element => {
        var phonetics: string[] = [];
        phonetics.push(element.Name.substring(element.Name.length - 4));
        phonetics.push(element.Name.substring(element.Name.length - 3));
        phonetics.push(element.Name.substring(element.Name.length - 2));

        phonetics.forEach(phon => {

            let index = listPhoneticTrends.findIndex(x => x.phonetic == phon);

            if (index != -1) {
                var update = listPhoneticTrends[index];
    
                var listNamesIndex = update.names.findIndex(x => x == element.Name);
                if (listNamesIndex == -1) {
                    update.names.push(element.Name);
                }
                update.count += element.Count;
    
            }
            else {
                listPhoneticTrends.push({ count: element.Count, names: [element.Name], phonetic: phon });
            }


        })
    });

    return listPhoneticTrends.sort((a, b) => b.count - a.count).slice(0, 5);
}

export const getAmericanSoundex = (listNames: Array<INationalNames>): Array<IPhoneticTrends> => {

    let listPhoneticTrends: Array<IPhoneticTrends> = [];

    listNames.forEach(element => {
        var code = element.Name[0];

        element.Name.split("").slice(1).forEach(letter => {
            switch (letter) {
                case "b":
                case "f":
                case "p":
                case "v":
                    code += 1;
                    break;
                case "c":
                case "g":
                case "j":
                case "k":
                case "q":
                case "s":
                case "x":
                case "z":
                    code += 2;
                    break;
                case "d":
                case "t":
                    code += 3;
                    break;
                case "l":
                    code += 4;
                    break;
                case "m":
                case "n":
                    code += 5;
                    break
                case "r":
                    code += 6;
                    break;
                default:
                    break;
            }

        });

        var index = listPhoneticTrends.findIndex(x => x.phonetic == code);

        if (index != -1) {
            var update = listPhoneticTrends[index];

            var listNamesIndex = update.names.findIndex(x => x == element.Name);
            if (listNamesIndex == -1) {
                update.names.push(element.Name);
            }
            update.count += element.Count;

        }
        else {
            listPhoneticTrends.push({ count: element.Count, names: [element.Name], phonetic: code });
        }
    });

    return listPhoneticTrends.sort((a, b) => b.count - a.count).slice(0, 5);
}

export const getHammingDistance = (listNames: Array<INationalNames>, name: string): string[] => {

    let listHammingDistances: string[] = [];

    for (const nameObj of listNames) {
        if (nameObj.Name.length === name.length) {
            let distance = HammingDistance(nameObj.Name, name);
            if (distance === 1)
                listHammingDistances.push(nameObj.Name);
        }
    }

    return listHammingDistances;
}

const HammingDistance = (name1: string, name2: string): Number => {
    let distance = 0;

    for (let i = 0; i < name1.length; i++) {
        if (name1[i] !== name2[i]) {
            distance++;
        }
    }

    return distance;
}

export const ForNameGetStateTrendsetters = (listState: Array<IStateNames>): Array<{ count: number, state: string, year: number, group: number }> => {
    let listYears: Array<number> = [], listCount: Array<number> = [];

    for (const babieObj of listState) {
        listYears.push(babieObj.Year);
        listCount.push(babieObj.Count);
    }
    listYears = SynthesizeData.MinMaxNormalization(listYears);
    listCount = SynthesizeData.MinMaxNormalization(listCount);

    const dataset = SynthesizeData.SetCoordinates(listYears,listCount);

    let k = Elbow.init(dataset, 10);
    let output = kmeans(dataset, k);
    console.log(output.centroids);
    const ou: Array<{ count: number, state: string, year: number, group: number }> = []
    for (const index in output.indexes) {
        ou.push({ count: listState[index].Count, state: listState[index].State, year: listState[index].Year, group: output.indexes[index] });
        console.log(`count = ${listState[index].Count}  state = ${listState[index].State} Year = ${listState[index].Year} Group = ${output.indexes[index]}`);
    }

    return ou;
}