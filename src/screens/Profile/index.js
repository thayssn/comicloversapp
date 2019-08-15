import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as registerActions } from '../../store/ducks/register';


// import { Container } from './styles';

const Profile = () => (
  <View style={{ flex: 1 }}>
    <Text>Usuário</Text>
  </View>
);

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(registerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
