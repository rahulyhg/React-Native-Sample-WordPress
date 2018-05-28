import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, ScrollView } from 'react-native';
import FeedAPI from '@helpers/Feeds'
import gs from '@styles/Global'
import { default as ShowList } from '@components/List'
import { withNavigation } from 'react-navigation';
export default class Feed extends Component {
  static navigationOptions = {
    headerTitle: 'Diario Tiempo',
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      posts: [],
      fetching_Status: false,
    };
    this.page = 0
  }
  componentDidMount() {
    this.page = this.page + 1;
    FeedAPI.getPosts(this.page)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ posts: [ ...this.state.posts, ...responseJson ], isLoading: false });
    })
  }
  loadMore=()=> {
    this.page = this.page + 1;
    this.setState({ fetching_Status: true }, () => {
      FeedAPI.getPosts(this.page)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ posts: [ ...this.state.posts, ...responseJson ], fetching_Status: false });
      })
    });
  }
  setPosts(data) {
    this.setState({posts: data});
  }
  getPosts() {
    console.log("Get posts");
    return this.state.posts
  }
  render() {
    let posts = this.getPosts();
    return (
      <ScrollView style={{backgroundColor: '#f1f2f6',}}>
        {
          (this.state.isLoading) ? <ActivityIndicator style={Styles.flexItem} color="#141414" size="large" /> : <ShowList navigation={this.props.navigation} title={ 'Viceversa' } posts={posts} />
        }
        <TouchableOpacity onPress={ this.loadMore} style={{position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 30,}}>
          <Text style={{color: '#141414',textAlign: 'center', fontSize: 40, fontWeight: 'bold',}}>+</Text>
          {
            (this.state.fetching_Status) ? <ActivityIndicator color="#141414" /> : null
          }
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const Styles = StyleSheet.create({
  sideMenuContainer: {
    shadowColor: '#141414',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 1,
  },
  flexItem: {
    transform: [
      { translateY: Dimensions.get('window').height * 0.4 }
    ],
  }
});
