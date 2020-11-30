import httpClient from './HttpClient';

export const GenderRatio = async () => {
    try{
        return await httpClient.get('states/genderratio');
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