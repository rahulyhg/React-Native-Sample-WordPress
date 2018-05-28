import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import FeedAPI from '@helpers/Feeds'
import ds from '@styles/MenuBar'
class DrawerComponent extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      categorias: [],
    };
  }
  setCategories( categorias ) {
    this.setState( { categorias } );
  }
  componentWillMount() {
    FeedAPI.getCategories()
    .then((response) => response.json())
    .then( (responseJson) => {
      let cats = [];
      responseJson.forEach( ( c ) => {
        if( c.count > 0 )
        cats.push(c);
      })
      this.setCategories( cats );
    }).done();
  }
  render () {
    let categorias = this.state.categorias;
    return (
      <ScrollView bounces={false}>
        <SafeAreaView style={ds.drawer} forceInset={{ top: 'always', horizontal: 'never' }}>
          {categorias.map( ( categoria, i ) =>
            <TouchableOpacity style={ds.item} key={categoria.id} onPress={() => { this.props.navigation.navigate('Category', { categoria: categoria.id });}}>
              <Text style={ds.label}>{categoria.name}</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </ScrollView>
    )
  }
}
export default DrawerComponent
