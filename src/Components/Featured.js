import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, WebView, Dimensions } from 'react-native';
export default class Featured extends Component {
  webview = null;
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      posts: props.posts,
      title: props.title
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      posts: props.posts,
      title: props.title
    });
  }
  render() {
    let posts = this.state.posts;
    let title = this.state.title;
    return (
      <View style={Styles.container}>
        {posts.map( ( post, i ) =>
          <TouchableOpacity style={Styles.item} key={post.id} onPress={() => { this.props.navigation.navigate('Single', { post: post });}}>
            <Image style={Styles.itemImage}
              source={{uri:post.better_featured_image.source_url}}
            />
            <View style={Styles.itemContent}>
              <Text style={Styles.itemTitle}>{post.title.rendered}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const Styles =  StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemImage: {
    flex: 1,
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  itemContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemTitle: {
    padding: 5,
    width: '100%',
    fontSize: 17,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    height: 1200,
    margin: 10
  }
});
