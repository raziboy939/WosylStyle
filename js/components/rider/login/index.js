'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, Dimensions,StatusBar,Image } from 'react-native';

import {  pushNewRoute } from '../../../actions/route';

import { Content, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');

class Login extends Component {
    
    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }
    
    replaceRoute(route) {
        this.props.replaceRoute(route);
    } 
    render() {
        return (
                <View style={{flex: 1}}>
                    <StatusBar barStyle='light-content' />
                    <Content style={{backgroundColor: '#19192B'}}>
                        <View style={Platform.OS === 'ios' ? styles.iosLogoContainer : styles.aLogoContainer }>
                            <Image
                        style={{padding:10}}
                          source={require('../signIn/logo.png')}>
                          </Image>
                            <Text style={styles.logoText}>Wosyl Delivery</Text>
                        </View>
                    </Content>
                    <View style={{padding: 10}}>
                        <Grid>
                            <Col style={{padding: 10}}>
                            <Button  onPress={() => this.pushNewRoute('signIn')} transparent block style={styles.loginBtn}><Text style={{color: '#19192B',fontWeight: '600'}}>SIGN IN</Text></Button>
                            </Col>
                            <Col style={{padding: 10}}>
                            <Button onPress={() => this.pushNewRoute('register')} block style={styles.registerBtn}><Text style={{fontWeight: '600',color: '#fff'}}>REGISTER</Text></Button>
                            </Col>
                        </Grid>
                    </View>
                    
                </View>
        )
    }
}


function bindActions(dispatch){
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
    }
}

export default connect(null, bindActions)(Login);
