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
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Looking For Driver...</Text>
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

              
            }}
             underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
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
          fromLocation: state.route.pickup.fromLocation,
          itemPickup: state.route.pickup.itemPickup,
          notes: state.route.pickup.notes,
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
