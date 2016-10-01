'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Image, View, Dimensions, Platform, StatusBar } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


import { pushNewRoute } from '../../../actions/route';
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
       



    constructor(props) {
        super(props);

       
        
          this.state = {

            tripDetails: [],
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
    connect(state => ({
  userDetails: state.users
}));
    console.log(this.props.userDetails);
        this.uberPool = this.uberPool.bind(this);
        this.uberGo = this.uberGo.bind(this);
        this.uberX = this.uberX.bind(this);
        this.uberXL = this.uberXL.bind(this);
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
                            <Button rounded onPress={() => this.pushNewRoute('confirmRide')} iconRight style={styles.pinButton}>
                                SET PICKUP LOCATION
                                <Icon name='ios-arrow-forward' style={{fontSize: 28}} />
                            </Button>

                            <View style={styles.pin}>
                            </View>
                        </View>

                    <View style={styles.slideSelector}>
                        {this.state.uberPoolSelect === true &&
                        <View style={styles.shareContainer}>
                            <Grid>
                                <Col style={[styles.shareOptions, {width: width/1.4}]}><Text style={{color: '#555'}}>Share your car and save upto<Text style={styles.shareType}> 50%</Text></Text>
                                </Col>
                                <Col style={styles.share}><Text style={{fontSize: 15,color: '#555'}}>1-2 people</Text></Col>
                            </Grid>
                        </View>
                        }
                        {this.state.uberGoSelect === true &&
                        <View style={styles.shareContainer}>
                            <Grid style={{justifyContent: 'center'}}>
                                <Col style={[styles.shareOptions, {width: width/1.4}]}><Text style={{color: '#555'}}>SELECT<Text style={styles.shareType}> TAXIPOOL</Text> NEXT</Text></Col>
                                <Col style={styles.share}><Text style={{fontSize: 9,color: '#555',fontWeight: '600'}}>SAVE UPTO 50%</Text></Col>
                            </Grid>
                        </View>
                        }
                        <Grid>
                            <Col style={styles.taxiTypeContainer} >
                                <Row>
                                <Text style={{color: '#555'}}>TaxiPool</Text>
                                </Row>
                                <Row style={this.state.uberPoolSelect === true ? styles.taxiType : {}}>
                                    <View style={this.state.uberPoolSelect === true ? styles.taxi : {}}>
                                        <Icon name={this.state.uberPoolSelect === false ? 'ios-radio-button-off' : 'ios-people' } style={this.state.uberPoolSelect === false ? styles.taxiIcon : {fontSize: 25}} onPress={this.uberPool.bind(this)} />
                                    </View>
                                </Row>
                            </Col>
                            <Col style={styles.taxiTypeContainer}>
                                <Row>
                                <Text style={{color: '#555'}}>TaxiGO</Text>
                                </Row>
                                <Row style={this.state.uberGoSelect === true ? styles.taxiType : {}}>
                                    <View style={this.state.uberGoSelect === true ? styles.taxi : {}}>
                                        <Icon name={this.state.uberGoSelect === false ? 'ios-radio-button-off' : 'ios-car' } style={this.state.uberGoSelect === false ? styles.taxiIcon : {fontSize: 25}} onPress={this.uberGo.bind(this)} />
                                    </View>
                                </Row>
                            </Col>
                            <Col style={styles.taxiTypeContainer}>
                                <Row>
                                <Text style={{color: '#555'}}>TaxiX</Text>
                                </Row>
                                <Row style={this.state.uberXSelect === true ? styles.taxiType : {}}>
                                    <View style={this.state.uberXSelect === true ? styles.taxi : {}}>
                                        <Icon name={this.state.uberXSelect === false ? 'ios-radio-button-off' : 'ios-car' } style={this.state.uberXSelect === false ? styles.taxiIcon : {fontSize: 25}} onPress={this.uberX.bind(this)} />
                                    </View>
                                </Row>
                            </Col>
                            <Col style={styles.taxiTypeContainer}>
                                <Row>
                                <Text style={{color: '#555'}}>TaxiXL</Text>
                                </Row>
                                <Row style={this.state.uberXLSelect === true ? styles.taxiType : {}}>
                                    <View style={this.state.uberXLSelect === true ? styles.taxi : {}}>
                                        <Icon name={this.state.uberXLSelect === false ? 'ios-radio-button-off' : 'ios-car' } style={this.state.uberXLSelect === false ? styles.taxiIcon : {fontSize: 25}} onPress={this.uberXL.bind(this)} />
                                    </View>
                                </Row>
                            </Col>

                        </Grid>
                    </View>
                    <View style={styles.headerContainer}>
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={this.props.openDrawer} >
                            <Icon name='ios-menu' />
                        </Button>
                        <Title>Wosyl Delivery</Title>
                    </Header>
                    
                        <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
       
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          // console.log(data);
          // console.log(details);
          console.log("SETTING NEW STATE");
           this.setState({tripDetails: details});
           console.log(this.state);

           this.pushNewRoute('confirmRide');
        




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
                   
                    </View>
                </View>
        )
    }
}




function bindActions(dispatch){
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindActions)(Home);
