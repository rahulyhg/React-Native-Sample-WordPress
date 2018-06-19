import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { createStackNavigator, createDrawerNavigator,  withNavigation, DrawerActions } from 'react-navigation'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import DrawerComponent from '@components/Drawer'
import Feed from '@views/Feed'
import Category from '@views/Category'
import Single from '@views/Single'
class ToggleDrawer extends Component {
  render() {
    return (
      <Text style={{marginRight: 10, fontSize: 20,}} onPress={() => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
      }}><FontAwesome>{Icons.bars}</FontAwesome></Text>
    )
  }
}
const StackNavigation = createStackNavigator(
  {
    Feed: { screen: Feed },
    Category: { screen: Category },
    Single: { screen: Single }
  },
  { navigationOptions: ({ navigation }) => ({
      initialRouteName: 'HomePage',
      headerMode: 'screen',
      headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 0, elevation: 0, },
      headerBackTitle: 'Atras',
      headerRight: <ToggleDrawer navigation={navigation} />
    }),
  }
)
const App = createDrawerNavigator(
  {
    StackNavigation: { screen: StackNavigation },
  },
  {
    initialRouteName: 'StackNavigation',
    contentComponent: DrawerComponent,
    drawerPosition: "right",
  }
)
export default App
