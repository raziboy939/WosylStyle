'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';

import {BlurView} from 'react-native-blur';
import LoadingOverlay from '../LoadingOverlay';
import AwesomeButton from 'react-native-awesome-button';

import { Image, View, Dimensions, Platform, StatusBar, Switch, Slider, DatePickerIOS, Picker, PickerIOS, ProgressViewIOS } from 'react-native';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import { Modal, TouchableHighlight} from 'react-native';


import Form from 'react-native-form'

import { pushNewRoute } from '../../../actions/route';
import { createPickup } from '../../../actions/route';
import { openDrawer } from '../../../actions/drawer';


import { Header, Content, Text, Button, Icon, Card, Title, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
const accessToken = 'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw';

import Mapbox from 'react-native-mapbox-gl';
Mapbox.setAccessToken(accessToken);
import { MapView } from 'react-native-mapbox-gl';

import styles from './styles';
import theme from '../../../themes/base-theme';


var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 12.920614;
const LONGITUDE = 77.586234;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;



class InSession extends Component {



 


       
        static propTypes = {
    first_name: React.PropTypes.string,
   
    last_name: React.PropTypes.string,
    email: React.PropTypes.string,
    phone_no: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }
  pushNewRoute(route) {
         this.props.pushNewRoute(route);
       }
  



    constructor(props) {
        super(props);

       
        
          this.state = {

            progress: 0.25,
             isVisible: false,
            fromLocation: 'From: Current Location',
            fromLatitude: 0,
            fromLongtitude: 0,
            toLocation: '',
            toLatitude: 0,
            toLongtitude: 0,
            itemPickup: '',
            notes: '',


            animationType: 'none',
      modalVisible: true,
    transparent: false,
    selectedSupportedOrientation: 0,
    currentOrientation: 'unknown',
            opacity: 1,
            visible: false,
            uberPoolSelect: true,
            uberGoSelect: false,
            uberXSelect: false,
            uberXLSelect: false,
            a: {
                latitude: LATITUDE ,
                longitude: LONGITUDE,
            },
            b: {
                latitude: 12.910000,
                longitude: 77.586034,
            },
            c: {
                latitude: 12.930000,
                longitude: 77.576034,
            },
            d: {
                latitude: 12.930000,
                longitude: 77.599934,
            }
            
        };

         
        this.uberPool = this.uberPool.bind(this);
        this.uberGo = this.uberGo.bind(this);
        this.uberX = this.uberX.bind(this);
        this.uberXL = this.uberXL.bind(this);
    }


 setModalVisible (visible) {
    this.setState({modalVisible: visible});
  }
 
  







    componentDidMount() {



            navigator.geolocation.getCurrentPosition(
      (position) => this.setState({position}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      this.setState({position});
    });
    


    
        let that = this;
        setTimeout(function () {
            that.setState({
                visible: true,
            });
        }, 500);
        setTimeout(function () {
            that.setState({
                opacity: 0
            });
        }, 900);
    }

    getInitialState() {
    return {
      mapLocation: {
        latitude: 0,
        longitude: 0
       },
       center: {
         latitude: this.state.position.latitude,
         longitude: this.state.position.longitude
       },
       
       zoom: 12,
       direction: 0
     }
  }

   
  onChange(e) {
    this.setState({ mapLocation: e });
  }
  onOpenAnnotation (annotation) {
    console.log(annotation)
  }
  onUpdateUserLocation (location) {
    console.log(location)
  }

   


    onDidFocus(){
        console.log('done');
    }
    uberPool() {
        this.setState({uberPoolSelect: true,uberXLSelect: false,uberXSelect: false,uberGoSelect: false});
    }
    uberGo() {
        this.setState({uberPoolSelect: false,uberXLSelect: false,uberXSelect: false,uberGoSelect: true});
    }
    uberX() {
        this.setState({uberPoolSelect: false,uberXLSelect: false,uberXSelect: true,uberGoSelect: false});
    }
    uberXL() {
        this.setState({uberPoolSelect: false,uberXLSelect: true,uberXSelect: false,uberGoSelect: false});
    }
    render() {
        return (
                 
               <View style={styles.container}>
                  <StatusBar barStyle='default' />
                  <Content theme={theme}>
                  </Content>

                  <View style={styles.map}>
                        {(this.state.visible) ?
                        (<MapView ref={map => { this._map = map; }}
                            style={styles.map}
                            rotateEnabled={true}
                            zoomEnabled={true}
                            showsUserLocation={true}
                            attributionButtonIsHidden = {false}
                            logoIsHidden = {true}
                            compassIsHidden = {true}
                            accessToken={'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw'}
                            initalZoomLevel = {13}
                            centerCoordinate={this.state.center}
                            userLocationVisible={true}
                            userTrackingMode = {Mapbox.userTrackingMode.follow}
                            annotations={this.state.annotations}
                            annotationsAreImmutable
                            
                            debugActive={false}
                            direction={this.state.direction}
                            
                            
                            onOpenAnnotation={this.onOpenAnnotation}
                            onUpdateUserLocation={this.onUpdateUserLocation}/>)
                        : <View />
                        }
                    </View>
                    
                  <View style={styles.headerContainer}>
                       <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                           <Button transparent  onPress={ this.props.openDrawer

                           } >
                               <Icon name='ios-menu' />
                           </Button>
                           <Title>Wosyl Delivery</Title>
                       </Header>
            </View>
            <View style={styles.modalStyle}>
            </View>
            </View>
        )
    }
}
  


 



function mapStateToProps(state) {

    console.log("checkinguserset");
    console.log(state);
    if (state.route.pickup){

      console.log("checking pickuppickup");
      console.log(state.route.pickup);
        return {
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,

    
  }
    }
}

function bindActions(dispatch) {
  return {
    openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
      }
}




export default connect(mapStateToProps, bindActions)(InSession);
