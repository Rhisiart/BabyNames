import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  navigationMenu: {
    backgroundColor: "black",
    alignSelf: 'stretch',
    textAlign: 'center',
    height: 50
  },
  menuView: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: "50%",
    marginTop: 30,
  },
  marginTop10: {
    marginTop: 10,
  },
  subHeader: {
    fontSize: 25,
    fontWeight: "bold"
  },
  basicText: {
    fontSize: 25
  },
  red: {
    color: "red",
  },
  listItem: {
    borderColor: "#c2c2c2",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 10
  },
  listItemRound: {
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 20
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 18,
    width: "85%"
  },
  dataItem: {
    borderColor: "#b5b5b5",
    borderWidth: 1,
    backgroundColor: "#ebebeb",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    borderRadius: 5
  }
});

export default styles;