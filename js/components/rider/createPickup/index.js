'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform,  ProgressViewIOS} from 'react-native';

import { popRoute,replaceRoute } from '../../../actions/route';

import { Container, Header, Text, Button, Icon, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import {
   AppRegistry,
   TouchableOpacity,
} from 'react-native';

var { width, height } = Dimensions.get('window');

class createPickup extends Component {
    constructor(props) {
      super(props);

      this.state ={
        progress: 0.5,
        open: false,
        phone_code: '',
      fromLocation: '',
      toLocation: '',
      itemPickup: '',
      notes: '',

     
    };
    }
    popRoute() {

        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    } 
    
    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
                    <StatusBar barStyle='default' />

                    


                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Confirm Details...</Text>
                    </Header>
                   <View  >
              <View >
              
                

                 <View style={{padding: 10}}>
                 


                  <View style ={styles.progressBar}>
                    <ProgressViewIOS  progress={this.state.progress}/>
                  </View>
                  
                  <Text style={styles.buttonText2}>Pick up Info</Text>
                  <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                    <Icon name='ios-home' style={{color:'#16ADD4'}}/>
                    <Input onChangeText={(text) => this.setState({fromLocation:text})} autoCapitalize="none" value={this.state.fromLocation}placeholder={this.props.fromLocation} placeholderTextColor="#000" />
                 </InputGroup>
               </View>
                        <View style={{padding: 10}}>
                            <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                                <Icon name='md-log-out' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({toLocation:text})} value={this.state.toLocation}placeholder={this.props.toLocation} placeholderTextColor="#000" />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup  borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                                  <Icon name='ios-briefcase' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({itemPickup:text})} value={this.state.itemPickup}placeholder={this.props.itemPickup}  placeholderTextColor="#000" />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                                <Icon name='ios-paper' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({notes:text})} value={this.state.notes}placeholder={this.props.notes}  placeholderTextColor="#000" />
                            </InputGroup>
                        </View>
        
                 

                  <Button rounded style={styles.formButton} onPress={() => {
                    console.log("checking locations");
                    console.log(this.props.fromLatitude);
                    console.log(this.props.toLatitude);


                    fetch('http://ec2-52-39-54-57.us-west-2.compute.amazonaws.com/api/pickup/create.json', {
                                                      method: 'POST',
                                                      headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'X-Auth-Token': this.props.userDetail.access_token,
                                                      },
                                                      body: JSON.stringify({
                                                        pickup_from : this.props.fromLocation,
                                                        from_latitude: this.props.fromLatitude,
                                                        from_longitude: this.props.fromLongtitude,
                                                        pickup_to: this.props.toLocation,
                                                        to_latitude: this.props.toLatitude,
                                                        to_longitude: this.props.toLongtitude,
                                                        item: this.props.itemPickup,
                                                        notes: this.props.notes,

                                                        
                                                        
                                                      })
                                                    }) .then((response) => response.json())
                                                          .then((responseJson) => {

                                                            console.log("json worked for create pickup");
                                                            
                                                            if (responseJson.success){
                                                              console.log("create pickup success");
                                                                 
                                                            }

                                                            else{
                                                             

                                                            }
                                                          })
                                                          .catch((error) => {
                                                            console.log("error in jsonResponse from createPickup");
                                                          })


              
            }}
             underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Find Driver</Text>
                  </Button>

                  


              </View>
            </View>
            





                </Container>
               



                
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}
function mapStateToProps(state) {

    console.log("checkingpickupset");
    console.log(state);
    if (state.route.pickup){
      

        return {

          toLocation: state.route.pickup.toLocation,
          toLatitude: state.route.pickup.toLatitude,
          toLongtitude: state.route.pickup.toLongtitude,
          fromLocation: state.route.pickup.fromLocation,
          fromLatitude: state.route.pickup.fromLatitude,
          fromLongtitude: state.route.pickup.fromLongtitude,
          itemPickup: state.route.pickup.itemPickup,
          notes: state.route.pickup.notes,
          userDetail: state.route.users,

      }

    

    
  }

    else{
      return{

        toLocation: 'empty',
          fromLocation: 'empty',
          itemPickup: 'empty',
          notes: 'empty',

      }
    }

}




export default connect(mapStateToProps, bindActions)(createPickup);
