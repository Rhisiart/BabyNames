import express from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import sqlite3 from 'sqlite3';
/*
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();*/

//var db = new sqlite3.connect("C:\\Users\\demo\\Documents\\Mestrado\\SIDM\\Project\\BabyName\\dataset\\database.sqlite");
var list: Array<record>= [];
console.log(new Date())
let db = new sqlite3.Database('..\\dataset\\database.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
    var h = db;
  });

  var t = 0;
  db.serialize(() => {
    db.each(`SELECT * FROM StateNames`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      //console.log(row.Id + "\t" + row.Name + "\t" + row.Gender + "\t" + row.Count + "\t" + row.Year + "\t" + row.State);
      list.push(row);
    }); 
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
    console.log(new Date())

    let requestFunc = new request(list);
    const app = express();

    app.get('/moreusedname', (req, res) => {

        var year = req.query.year ? req.query.year.toString() : "0";
        var sort = req.query.sort ? req.query.sort.toString() : null;
        return res.json(requestFunc.usedNames("more", year, sort));
    })

    app.get('/lessusedname', (req, res) => {

        var year = req.query.year ? req.query.year.toString() : "0";
        var sort = req.query.sort ? req.query.sort.toString() : null;
        return res.json(requestFunc.usedNames("less", year, sort));
    });

      app.get('/birthstateyear', (req, res) => {
          
        var year = req.query.year ? req.query.year.toString() : "0";
        var state = req.query.state ? req.query.state.toString() : null;
        var sort = req.query.sort ? req.query.sort.toString() : null;
        return res.json(requestFunc.birthsStateYear(year, state, sort));
    });
    const port = process.env.PORT || 2000;
    app.listen(port);
  });

class record {

    Name: string;
    Count: string;
    State: string;
    Gender: string;
    Year: string;
    Id: string;

    constructor(Name: string, Count: string, State: string, Gender: string, Year: string, Id: string) {
        this.Name = Name;
        this.Count = Count;
        this.State = State;
        this.Gender = Gender;
        this.Year = Year;
        this.Id = Id;
    }
}

class request {

    list: record[];

    constructor(list: record[]) {
        this.list = list;
    }

    usedNames(type: string, year: string, sort: string | null) {

        var listFiltered = this.list.filter(x => x.Year == year);
        var filted: { count: number, state: string, name: string }[] = [];

        for (var i = 0; i < listFiltered.length; i++) {

            var index = filted.findIndex(x => x.state == listFiltered[i].State);
            if (index == -1) {
                filted.push({ count: Number(listFiltered[i].Count), state: listFiltered[i].State, name: listFiltered[i].Name })
            }
            else {
                var found = filted[index];
                if (type == "more") {
                    if (found.count < Number(listFiltered[i].Count)) {
                        found.count = Number(listFiltered[i].Count);
                        found.state = listFiltered[i].State;
                        found.name = listFiltered[i].Name;
                    }
                }
                else if (type == "less") {
                    if (found.count > Number(listFiltered[i].Count)) {
                        found.count = Number(listFiltered[i].Count);
                        found.state = listFiltered[i].State;
                        found.name = listFiltered[i].Name;
                    }
                }
                
            }
        }


        var sorted = this.sort(filted, "count", sort);
        return sorted;
    }

    birthsStateYear(year: string, state: string | null, sort: string | null) {

        var listFiltered = this.list.filter(x => x.Year == year);

        var filted: { count: number, state: string }[] = [];

        for (var i = 0; i < listFiltered.length; i++) {

            var index = filted.findIndex(x => x.state == listFiltered[i].State);
            if (index == -1) {
                filted.push({ count: Number(listFiltered[i].Count), state: listFiltered[i].State})
            }
            else
            {
                var found = filted[index];

                found.count = Number(listFiltered[i].Count) + found.count;
                found.state = listFiltered[i].State;

            }

        }
        var sorted = this.sort(filted, "count", sort);


        return !state ? sorted : (sorted.findIndex(x => x.state == state) == -1 ? sorted : sorted[sorted.findIndex(x => x.state == state)]);
    }

    sort(listToFilter: any[], field: string, sortType:string | null) {

        return sortType == "Asc" ? listToFilter.sort((a, b) => (a[field] > b[field]) ? 1 : -1) : listToFilter.sort((a, b) => (a[field] > b[field]) ? 1 : -1).reverse();
    }

}


 /*
var list: record[] = [];
fs.createReadStream('..\\dataset\\StateNames.csv')
  .pipe(csv())
  .on('data', (row) => {
    list.push(row);
  }).on('end', () => {
    console.log('CSV file successfully processed');

    let requestFunc = new request(list);
    const app = express();

    app.get('/moreusedname', (req, res) => {

        var year = req.query.year ? req.query.year.toString() : "0";
        var sort = req.query.sort ? req.query.sort.toString() : null;
        return res.json(requestFunc.usedNames("more", year, sort));
    })

    app.get('/lessusedname', (req, res) => {

        var year = req.query.year ? req.query.year.toString() : "0";
        var sort = req.query.sort ? req.query.sort.toString() : null;
        return res.json(requestFunc.usedNames("less", year, sort));
    });

      app.get('/birthstateyear', (req, res) => {
          
        var year = req.query.year ? req.query.year.toString() : "0";
        var state = req.query.state ? req.query.state.toString() : null;
        var sort = req.query.sort ? req.query.sort.toString() : null;
        return res.json(requestFunc.birthsStateYear(year, state, sort));
    });

    app.listen(2000)
}); */