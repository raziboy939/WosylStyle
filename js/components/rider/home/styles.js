
'use strict';

import { StyleSheet } from "react-native";
var React = require('react-native');
var { Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
    iosSearchBar: {
        width: deviceWidth - 20,
        alignSelf: 'center',
        marginTop: 10,
        flex: 1,
        height: 50,
        position: 'absolute',
        margin: 10

    },
    aSearchBar: {
        width: deviceWidth - 20,
        alignSelf: 'center',
        marginTop: 10,
        flex: 1,
        height: 50,
        margin: 10

    },
    container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff'
  },
  slideSelector: {
  	// marginTop: 100,
  	backgroundColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: deviceWidth
  },
  
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  },
  carIcon: {
    color: '#222',
    fontSize: 24
  },
  pinContainer: {
    bottom: deviceHeight/2.2,
    position: 'absolute',
    left: 0,
    right: 0
  },
  pinButton: {
    backgroundColor: '#19192B',
    alignSelf: 'center'
  },
  pin: {
    width: 2,
    height: 15,
    backgroundColor: '#19192B',
    position: 'relative',
    alignSelf: 'center'
  },
  shareContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  shareOptions: {
    paddingLeft: 20,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start'
  },
  shareType: {
    fontSize: 12,
    color: '#23C2E1'
  },
  share: {
    paddingRight: 10,
    padding: 10,
    alignItems: 'flex-end'
  },
  taxiTypeContainer: {
    padding: 15,
    alignItems: 'center'
  },
  taxiType: {
    borderRadius: 18,
    borderWidth: 2,
    opacity: 0.5
  },
  taxi: {
    height: 36,
    width: 36,
    paddingLeft: 7,
    paddingTop: 5
  },
  taxiIcon: {
    fontSize: 15,
    color: '#aaa',
    padding: 5
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: deviceWidth
  },
  iosHeader: {
    backgroundColor: '#fff'
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3,
    paddingTop: 25
  },
  SearchPickText: {
    fontSize: 10,
    color: 'green',
    textAlign: 'center'
  },

});
