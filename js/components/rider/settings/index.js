'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Dimensions,Platform } from 'react-native';

import { popRoute } from '../../../actions/route';

import { Container, Header, Content, Text, Button, Icon, Card, CardItem, Input } from 'native-base';

import styles from './styles';
import theme from '../../../themes/base-theme';

var { width, height } = Dimensions.get('window');

class Settings extends Component {
    
    popRoute() {
        this.props.popRoute();
    }
    
    render() {
        return (
                <Container theme={theme} style={{backgroundColor: '#fff'}} >
     
                    <Header style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader }>
                        <Button transparent  onPress={() => this.popRoute()} >
                            <Icon name='md-arrow-back' style={{fontSize: 28}} />
                        </Button>
                        <Text style={Platform.OS === 'ios' ? styles.iosHeaderTitle : styles.aHeaderTitle}>Settings</Text>
                        <Button transparent>
                            <Icon name='md-more' />
                        </Button>
                    </Header>
                    <Content>
                        <Card style={{backgroundColor: '#eee'}}>
                            <Icon name='ios-person' style={styles.profileIcon} />
                        </Card>
                        <Card>
                            <CardItem style={[{flexDirection: 'row'}, styles.inputContainer]}>
                                <CardItem style={styles.input}>
                                    <Text note>FIRST NAME</Text>
                                    <Input placeholder='Shivarj' placeholderTextColor='#797979' style={{marginLeft: -5}} />
                                </CardItem>
                                <CardItem style={styles.input}>
                                    <Text note>LAST NAME</Text>
                                    <Input placeholder='Kumar' placeholderTextColor='#797979' style={{marginLeft: -5}} />
                                </CardItem>
                            </CardItem>
                            <CardItem style={styles.inputContainer}>
                                <CardItem style={styles.input}>
                                    <Text note>EMAIL</Text>
                                    <Input placeholder='Shivraj@gmail.com' placeholderTextColor='#797979' style={{marginLeft: -5}} />
                                </CardItem>
                                <CardItem style={styles.input}>
                                    <Text note>MOBILE</Text>
                                    <Input placeholder='9876543210' placeholderTextColor='#797979' style={{marginLeft: -5}} />
                                </CardItem>
                                
                                <CardItem style={styles.blueBorder}>
                                    <Text style={styles.blueHeader}>PROFILES</Text>
                                </CardItem>
                                    <TouchableOpacity>
                                    <CardItem style={{borderBottomWidth: 0,paddingBottom: 0}}>
                                        <Icon name='ios-add-circle-outline' style={{fontSize: 25,color: '#444'}} />
                                        <Text>Start Riding with Profiles</Text>
                                    </CardItem>
                                    </TouchableOpacity>
                                <CardItem style={{borderBottomWidth: 0}}>
                                <Text note>Enable profiles to simplify your business travel</Text>
                                </CardItem>
                                
                                <CardItem style={styles.blueBorder}>
                                    <Text style={styles.blueHeader}>PLACES</Text>
                                </CardItem>

                                    <TouchableOpacity>
                                    <CardItem>
                                        <Icon name='ios-home' style={{fontSize: 20,color: '#aaa'}} />
                                        <Text>Home</Text>
                                        <Text note>Mysore</Text>
                                    </CardItem>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                    <CardItem style={{borderBottomWidth: 0}}>
                                        <Icon name='ios-briefcase' style={{fontSize: 20,color: '#aaa'}} />
                                        <Text>Work</Text>
                                        <Text note>Jayanagar</Text>
                                    </CardItem>
                                    </TouchableOpacity>
                                    <View style={styles.blueBorder}>
                                        <Text style={styles.blueHeader}>PEOPLE</Text>
                                    </View>
                                    <CardItem>
                                        <TouchableOpacity>
                                            <Text>Emergency Contacts</Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                    <CardItem style={{borderBottomWidth: 0,}}>
                                        <TouchableOpacity>
                                            <Text>Suggested Invites</Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                </CardItem>
                            
                        </Card>
                    </Content>
                </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindActions)(Settings);
