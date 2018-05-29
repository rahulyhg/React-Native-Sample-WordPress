import React, { Component } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, WebView, Share, Dimensions } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import moment from 'moment'
import 'moment/locale/es'
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
      <View>
        {posts.map( ( post, i ) =>
          <View style={Styles.item}>
            <TouchableOpacity style={Styles.itemWrapper} key={post.id} onPress={() => { this.props.navigation.navigate('Single', { post: post });}}>
              <Image style={Styles.itemImage}
                source={{uri:post.better_featured_image.source_url}}
              />
              <View style={Styles.itemContent}>
                <Text style={Styles.itemTitle}>{post.title.rendered}</Text>
              </View>
            </TouchableOpacity>
            <View style={Styles.itemMeta}>
              <Text style={Styles.itemDate}>{moment(post.date).format('LL')}</Text>
              <Text onPress={() => {
                Share.share({
                  url: post.link,
                  title: 'Diario Tiempo'
                }, {
                  dialogTitle: post.title.rendered,
                })}} style={Styles.itemShare}>
                <FontAwesome>{Icons.shareSquareO}</FontAwesome>
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const Styles =  StyleSheet.create({
  itemWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  },
  itemTitle: {
    padding: 5,
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemMeta: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 20,
  },
  itemDate: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
  },
  itemShare: {
    flex: 1,
    fontSize: 20,
    textAlign: 'right',
  },
});
