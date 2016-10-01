
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform } from 'react-native';

import { replaceOrPushRoute, resetRoute,replaceRoute } from '../../../actions/route';
import { closeDrawer } from '../../../actions/drawer';

import { Content, View, Text, Icon, List, ListItem } from 'native-base';

import styles from './styles';


class SideBar extends Component {

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }
    resetRoute(route) {
        this.props.closeDrawer();
        this.props.resetRoute(route);
    }
   replaceRoute(route){
    this.props.closeDrawer();
    this.props.replaceRoute(route);
   }
    
    render(){
        return (
            <View style={{flex: 1,backgroundColor: '#19192B'}}>
                
                    <Content style={Platform.OS === 'android' ? styles.adrawerContent : styles.drawerContent}>
                    	<List  foregroundColor={'white'} style={styles.profile}>
                            <ListItem button iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-person' />
                                <Text style={styles.linkText} >Shivraj Kumar</Text>
                            </ListItem>
                        </List>
                        <List  foregroundColor={'white'} style={styles.Bg} >
                            <ListItem button onPress={() => this.navigateTo('payment')} iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-card'  style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={styles.linkText} >Payment</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('history')}  iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-keypad-outline'  style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={styles.linkText}>History</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('notifications')}  iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-notifications' style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={styles.linkText}>Notifications</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('settings')} iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-settings' style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={styles.linkText}>Settings</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.resetRoute('login')} iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-power' style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={[styles.linkText,{fontWeight: '700'}]}>SIGN OUT</Text>
                            </ListItem>
                            <ListItem button onPress={() => this.navigateTo('receipt')} style={Platform.OS === 'android' ? styles.aAboutlink : styles.iosAboutlink} >
                                <Text style={{color: '#999'}}>About</Text>
                            </ListItem>



                            <ListItem button onPress={() => this.replaceRoute('DriverSignup')} 



                            iconLeft style={Platform.OS === 'android' ? styles.alinks : styles.links} >
                                <Icon name='ios-car' style={Platform.OS === 'ios' ? styles.iosSidebarIcons : styles.aSidebarIcons} />
                                <Text style={[styles.linkText,{fontWeight: '700'}]}>Driver App</Text>
                            </ListItem>
                        </List>
                 
                    </Content>
                    
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(SideBar);
