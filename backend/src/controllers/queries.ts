import INationalNames from '../models/NationalNames';
import IStateNames from '../models/StateNames';

import { db } from '../server';

export const getBabyByYearNational = async (year: any): Promise<Error | Array<INationalNames>> => {
    const queryString = 'SELECT * FROM NationalNames where Year = ?';

    return await PromiseQueriesFromNationalTableWithPlaceholder(queryString, year);
}

export const getPopulationByYearFromState = async (state : string) : Promise<Error | Array<IStateNames>> => {
    const query = 'SELECT sum(count) as Count, Year from StateNames where State = ? GROUP BY Year';
    
    return await PromiseQueriesFromStateTableWithPlaceholder(query, state);
}

export const getBirthsByYear = async (fromyear: number, toyear: number): Promise<Error | Array<INationalNames>> => {
    const queryString = `SELECT sum(count) as Count, Year FROM NationalNames WHERE Year BETWEEN ${fromyear} and ${toyear} GROUP BY Year`;

    return await PromiseQueriesFromNationalTable(queryString);
}

export const getBirthsTotal = async (fromyear: number, toyear: number): Promise<number> => {
    const queryString = `SELECT sum(count) as Count FROM NationalNames WHERE Year BETWEEN ${fromyear} and ${toyear}`;

    return await getBirthsTotalPromise(queryString);
}

const getBirthsTotalPromise = (queryString: string): Promise< number> =>
    new Promise((resolve, reject) => {
        db.all(queryString, (err, rows: Array<INationalNames>) => {
            err ? 0 : (rows.length > 0 ? resolve(rows[0].Count) : 0);
        });
    });

export const getStatePopulationOverTime = async () : Promise<Error | Array<IStateNames>> => {
    const query = 'SELECT sum(count) as count, Year, State FROM StateNames GROUP BY Year, State';
    return await PromiseQueriesFromStateTable(query);
}

export const getAllNamesLastFiveYears = async (year: number) : Promise<Error | Array<INationalNames>> => {
    const query = 'SELECT count, Year, Name, Gender FROM NationalNames WHERE Year = ? OR Year = ? OR Year = ? OR Year = ? OR Year = ?';
    return await PromiseQueriesFromNationalTableWithPlaceholder(query,[year - 1, year - 2, year - 3, year - 4, year - 1]);
}
    
export const getAllNamesByYear = async (year: number) : Promise<Error | Array<INationalNames>> => {
    const query = 'SELECT count, Name FROM NationalNames WHERE Year = ?';
    return await PromiseQueriesFromNationalTableWithPlaceholder(query, year.toString() );
}
    
export const getAllNames = async () : Promise<Error | Array<INationalNames>> => {
    const query = 'SELECT name FROM NationalNames GROUP BY name';
    return await PromiseQueriesFromNationalTable(query);
}

export const getBabiesBornByState = async () : Promise<Error | Array<IStateNames>> => {
    const query = 'SELECT count, name, state FROM StateNames where year = 2014';
    return await PromiseQueriesFromStateTable(query);
}

export const getBabiesByName = async (name : string) : Promise<Error | Array<IStateNames>> => {
    const query = 'SELECT count,name, state, year FROM StateNames where name = ? and Gender = ? ORDER BY Year';
    return await PromiseQueriesFromStateTableWithPlaceholder(query, [name, 'M']);
}

export const getState = async () : Promise<Error | Array<IStateNames>> => {
    const query = 'SELECT State FROM StateNames GROUP BY State';
    return await PromiseQueriesFromStateTable(query);
}

export const getYears = async () : Promise<Error | Array<IStateNames>> => {
    const query = 'SELECT Year FROM StateNames GROUP BY year';
    return await PromiseQueriesFromStateTable(query);
}

export const getMaleBabieByStateAndYear = async (state: string, year : number) : Promise<Error | Array<IStateNames>> => {
    const query = 'SELECT sum(count) as Count FROM StateNames where state = ? and Year= ? and Gender = ?';
    return await PromiseQueriesFromStateTableWithPlaceholder(query, [state, year.toString(), 'M']);
}

export const getFemaleBabieByStateAndYear = async (state: string, year : number) : Promise<Error | Array<IStateNames>> => {
    const query = 'SELECT sum(count) as Count FROM StateNames where state = ? and Year= ? and Gender = ?';
    return await PromiseQueriesFromStateTableWithPlaceholder(query, [state, year.toString(), 'F']);
}
    
const PromiseQueriesFromNationalTable = (query: string) : Promise<Error | Array<INationalNames>> => 
    new Promise( (resolve, reject) => {
        db.all(query, (err, rows : Array<INationalNames>) => {
            err ? reject(err) : resolve(rows);
        });
    });

const PromiseQueriesFromStateTable = (query: string) : Promise<Error | Array<IStateNames>> => 
    new Promise( (resolve, reject) => {
        db.all(query, (err, rows : Array<IStateNames>) => {
            err ? reject(err) : resolve(rows);
        });
    });

const PromiseQueriesFromStateTableWithPlaceholder = (query: string, placeholder : Array<string> | string | Array<number>) : Promise<Error | Array<IStateNames>> => 
    new Promise( (resolve, reject) => {
        db.all(query, placeholder, (err, rows : Array<IStateNames>) => {
            err ? reject(err) : resolve(rows);
        });
    });

const PromiseQueriesFromNationalTableWithPlaceholder = (queryString : string, placeholder: Array<string> | string | Array<number>) : Promise<Error | Array<INationalNames>> => 
    new Promise( (resolve, reject) => {
        db.all(queryString, placeholder, (err, rows : Array<INationalNames>) => {
            err ? reject(err) : resolve(rows);
        });
    });