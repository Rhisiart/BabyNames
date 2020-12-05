import httpClient from './HttpClient';

export const GenderRatio = async () => {
    try{
        return await httpClient.get('states/genderratio');
    }catch(err){
        console.log(err);
    }
}

export const GetTendency = async (year: string) => {
    try{
        return await httpClient.get('national/tendency/' + year);
    }catch(err){
        console.log(err);
    }
}

export const GetPhoneticTrend = async (year: string) => {
    try{
        return await httpClient.get('national/phoneticTrend/' + year);
    }catch(err){
        console.log(err);
    }
}

export const GetAmericanSoundex = async (year: string) => {
    try{
        return await httpClient.get('national/AmericanSoundex/' + year);
    }catch(err){
        console.log(err);
    }
}

export const GetHammingDistance = async (name: string) => {
    try{
        return await httpClient.get('national/hammingDistance/' + name);
    }catch(err){
        console.log(err);
    }
}

export const GetBirtsFromTo = async (fromyear: string,toyear: string) => {
    try{
        return await httpClient.get('national/FromTo/' + fromyear + '/' + toyear);
    }catch(err){
        console.log(err);
    }
}

export const Teste = async () => {
    try{
        return await httpClient.post('states/test');
    }catch(err){
        console.log(err);
    }
}