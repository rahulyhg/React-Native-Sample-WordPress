import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, WebView } from 'react-native';
export default class List extends Component {
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
      <ScrollView style={Styles.container}>
        {posts.map( ( post, i ) =>
          <TouchableOpacity style={Styles.card} key={post.id} onPress={() => { this.props.navigation.navigate('Single', { post: post });}}>
            <Image style={Styles.cardBackground}
              source={{uri:post.better_featured_image.source_url}}
            />
            <View style={Styles.cardContent}>
              <Text style={Styles.cardTitle}>{post.title.rendered}</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }
}
const Styles =  StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 62,
  },
  card: {
    width: '100%',
    height: 300,
    backgroundColor: '#fafafa',
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#141414',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 1,
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#fff',
  },
  content: {
    flex: 1,
    height: 1200,
    margin: 10
  }
});
