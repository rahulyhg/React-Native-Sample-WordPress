import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { default as Entry } from '@components/Entry';
export default class Single extends Component {
  static navigationOptions = {
    headerTitle: 'Entrada',
    headerRight: '',
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    const post = params ? params.post : null;
    return (
      <View>
        <Entry post={post} />
      </View>
    );
  }
}
