'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions,StatusBar,Platform,  ProgressViewIOS} from 'react-native';

import { popRoute,replaceRoute} from '../../../actions/route';

import { Container, Header, Text, Button, Icon, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';
import Modal from 'react-native-simple-modal';
import { createPickup } from '../../../actions/route';

import {
   AppRegistry,
   TouchableOpacity,
} from 'react-native';

var { width, height } = Dimensions.get('window');

class CreatePickup extends Component {
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

    createPickup(){

        

    var pickupItem = {"toLocation" : this.props.toLocation, "toLatitude": this.props.toLatitude, "toLongtitude" : this.props.toLongtitude, 
    "fromLocation" : this.props.fromLocation,"fromLatitude": this.props.fromLatitude, "fromLongtitude" : this.props.fromLongtitude, "notes" : this.state.notes, "itemPickup" : this.state.itemPickup};
    this.props.createPickup('placeOrder',pickupItem);
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
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>createPickup.js</Text>
                    </Header>
                   <View  >
              <View >
              
                

                 


                  
                 <View style={{padding: 10}}>
                


                  <View style ={styles.progressBar}>
                    <ProgressViewIOS  progress={this.state.progress}/>
                  </View>
                  
                  <Text style={styles.buttonText2}>Item Details</Text>
                 
               </View>


                  <View >
                  
                        <View style={{padding: 10}}>
                            <InputGroup  borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                                  <Icon name='ios-briefcase' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({itemPickup:text})} value={this.state.itemPickup}placeholder="Item"  placeholderTextColor="#000" />
                            </InputGroup>
                        </View>
                        <View style={{padding: 10}}>
                            <InputGroup borderType='rounded' style={{marginLeft: 30, marginRight:30}}>
                                <Icon name='ios-paper' style={{color:'#16ADD4'}}/>
                                <Input onChangeText={(text) => this.setState({notes:text})} value={this.state.notes}placeholder="Notes"  placeholderTextColor="#000" />
                            </InputGroup>
                        </View>
                    </View>
        
                 

                  <Button rounded style={styles.formButton} onPress={() => {this.createPickup()}}
             underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Next</Text>
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
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        createPickup: (route,pickup) =>dispatch(createPickup(route,pickup)),
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




export default connect(mapStateToProps, bindActions)(CreatePickup);
