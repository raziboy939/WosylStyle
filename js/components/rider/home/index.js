'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';

import {BlurView} from 'react-native-blur';
import LoadingOverlay from '../LoadingOverlay';
import AwesomeButton from 'react-native-awesome-button';

import { Image, View, Dimensions, Platform, StatusBar, Switch, Slider, DatePickerIOS, Picker, PickerIOS, ProgressViewIOS } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
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









class Home extends Component {

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
       }


 


       
        static propTypes = {
    first_name: React.PropTypes.string,
   
    last_name: React.PropTypes.string,
    email: React.PropTypes.string,
    phone_no: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  



    constructor(props) {
        super(props);

       
        
          this.state = {

            progress: 0.33,
             isVisible: false,
            fromLocation: '',
            toLocation: '',
            itemPickup: '',
            notes: '',


            animationType: 'none',
      modalVisible: false,
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

         console.log("ON HOME PAGE STATE2: ");
//     connect(state => ({
//   userDetails: state.users
// }));
    console.log(this.props.users);
        this.uberPool = this.uberPool.bind(this);
        this.uberGo = this.uberGo.bind(this);
        this.uberX = this.uberX.bind(this);
        this.uberXL = this.uberXL.bind(this);
    }


 setModalVisible (visible) {
    this.setState({modalVisible: visible});
  }
 createPickup(){

        this.setState({modalVisible: false});

    var pickupItem = {"toLocation" : this.state.toLocation, "fromLocation" : this.state.fromLocation, "itemPickup" : this.state.itemPickup, "notes" : this.state.notes };
    this.props.createPickup('createPickup',pickupItem);
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
       annotations: [{
         latitude: 40.72052634,
         longitude:  -73.97686958312988,
         title: 'This is marker 1',
         subtitle: 'Hi mom!'
       },{
         latitude: 40.714541341726175,
         longitude:  -74.00579452514648,
         title: 'This is marker 2',
         subtitle: 'Neat, this is a subtitle'
       }],
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
                        {(this.state.visible) ?
                        (<MapView ref={map => { this._map = map; }}
          style={styles.map}
          rotateEnabled={true}
          showsUserLocation={true}
          accessToken={'sk.eyJ1Ijoid29zeWwxMjMiLCJhIjoiY2l0NmxxdnJpMDAwNDMwbWZtY21jdmp2NiJ9.H2G2P39VR7kEkEtz0Ji3lw'}
          initalZoomLevel = {10}
          centerCoordinate={this.state.center}
          userLocationVisible={true}
          userTrackingMode = {Mapbox.userTrackingMode.follow}
          
          debugActive={false}
          direction={this.state.direction}
          annotations={this.state.annotations}
          onRegionChange={this.onChange}
          onOpenAnnotation={this.onOpenAnnotation}
          onUpdateUserLocation={this.onUpdateUserLocation}/>)
                        : <View />
                        }
                        <Image source={require('../../../../images/dummyMap.png')} style={{height: height, opacity: this.state.opacity}}/>
                        <View style={styles.pinContainer}>
                            <Button rounded onPress={() => this.setModalVisible(true)} iconRight style={styles.pinButton}>
                                Create Pickup
                                <Icon name='ios-arrow-forward' style={{fontSize: 28}} />
                            </Button>

                            <View style={styles.pin}>
                            </View>
                        </View>

                    
                    <View style={styles.headerContainer}>
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={ this.props.openDrawer

                        } >
                            <Icon name='ios-menu' />
                        </Button>
                        <Title>Wosyl Delivery</Title>
                    </Header>
                    
                        <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
       
        onPress={(data, details = null) => { 



        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyCx4LyiTDnAAgJLnSeVSVKR3uAQPsslXxg',
          language: 'en', // language of the results
          
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          }, listView:{
            backgroundColor: 'rgba(255, 253, 249, 1)'
          },
          poweredContainer: {
            backgroundColor: 'rgba(255, 253, 249, 1)'
          },
          container:{
            backgroundColor: 'rgba(255, 253, 249, 1)'
          
        },
      }}


        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}  />
        
        <View style={{marginTop: 5}}>
       
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}} >
            
             
              

            <View  >
              <View style={styles.modalStyle}>
              
                

                 <View style={{padding: 10}}>
                 <Button transparent style={{height: 10, marginBottom: 10}} onPress={() => {

             this.setModalVisible(false);
            }}
             underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>close</Text>
                  </Button>


                  <View style ={styles.progressBar}>
                    <ProgressViewIOS  progress={this.state.progress}/>
                  </View>
                  
                  <Text style={styles.buttonText2}>Pick up Info</Text>
                  <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                    <Icon name='ios-home' style={{color:'#16ADD4'}}/>
                    <Input onChangeText={(text) => this.setState({fromLocation:text})} autoCapitalize="none" value={this.state.fromLocation}placeholder="From: Address" placeholderTextColor="#FFFFFF" />
                 </InputGroup>
               </View>
                        <View style={{padding: 10}}>
                            <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                                <Icon name='md-log-out' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({toLocation:text})} value={this.state.toLocation}placeholder="To: Address"  placeholderTextColor="#FFFFFF" />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup  borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                                  <Icon name='ios-briefcase' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({itemPickup:text})} value={this.state.itemPickup}placeholder="Item:"  placeholderTextColor="#FFFFFF" />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                                <Icon name='ios-paper' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({notes:text})} value={this.state.notes}placeholder="Notes:"  placeholderTextColor="#FFFFFF" />
                            </InputGroup>
                        </View>
        
                 

                  <Button rounded style={styles.formButton} onPress={() => {

              this.createPickup();
            }}
             underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Continue</Text>
                  </Button>

                  


              </View>
            </View>
            
          </Modal>
          
        </View>
         
                   
   </View>
</View>
        )
    }
}

 


function bindAction(dispatch) {
    return {
      openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        createPickup: (route,pickup) =>dispatch(createPickup(route,pickup)),
    }
}

function mapStateToProps(state) {

    console.log("checkinguserset");
    console.log(state);
    if (state.route.users){
        return {
    first_name: state.route.users.first_name,
    last_name: state.route.users.last_name,
    email: state.route.users.email,
    phone_no: state.route.users.phone_no,

    
  }
    }
 

    else{
  return {
    first_name: "first Name",
    last_name: "lastname",
    email: "email",
    phone_no: "phone number",
    
  }
}
}




export default connect(mapStateToProps, bindAction)(Home);
