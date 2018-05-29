import React, { Component } from 'react'
import { Platform, Dimensions, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, ScrollView } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import FeedAPI from '@helpers/Feeds'
import gs from '@styles/Global'
import { default as ShowList } from '@components/List'
import { default as ShowFeatured } from '@components/Featured'
export default class Feed extends Component {
  static navigationOptions = {
    headerTitle: 'Diario Tiempo',
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      featuredPosts: [],
      posts: [],
      fetching_Status: false,
    };
    this.page = 0
  }
  componentDidMount() {
    FeedAPI.getPostsByFeatured()
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ featuredPosts: [ ...this.state.featuredPosts, ...responseJson ], isLoading: false });
    })
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
  setFeaturedPosts(data) {
    this.setState({featuredPosts: data});
  }
  setPosts(data) {
    this.setState({posts: data});
  }
  getFeaturedPosts() {
    console.log("Get featured posts");
    return this.state.featuredPosts
  }
  getPosts() {
    console.log("Get posts");
    return this.state.posts
  }
  render() {
    let featured = this.getFeaturedPosts();
    let posts = this.getPosts();
    return (
      <ScrollView style={{backgroundColor: '#ffffff', paddingLeft: 20, paddingRight: 20, paddingBottom: 68,}}>
        <View style={[Styles.sectionHeader, Styles.noBorder]}>
          <Text style={Styles.sectionTitle}>Destacado <FontAwesome>{Icons.star}</FontAwesome></Text>
        </View>
        {
          (this.state.isLoading) ? <ActivityIndicator style={Styles.flexItem} color="#141414" size="large" /> : <ShowFeatured navigation={this.props.navigation} posts={featured} />
        }
        <View style={Styles.sectionHeader}>
          <Text style={Styles.sectionTitle}>Recientes <FontAwesome>{Icons.clockO}</FontAwesome></Text>
        </View>
        <ShowList navigation={this.props.navigation} title={ 'Viceversa' } posts={posts} />
        <TouchableOpacity onPress={ this.loadMore} style={{paddingBottom: 30,}}>
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
  sectionHeader: {
    paddingTop: 15,
    marginBottom: 20,
    borderColor: '#dddddd',
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: 24,
  },
  flexItem: {
    transform: [
      { translateY: Dimensions.get('window').height * 0.4 }
    ],
  },
  noBorder: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});
