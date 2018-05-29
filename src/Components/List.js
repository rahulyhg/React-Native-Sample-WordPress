import React, { Component } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, WebView, Share, Dimensions } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import moment from 'moment'
import 'moment/locale/es'
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
      <View>
        {posts.map( ( post, i ) =>
          <View>
            <TouchableOpacity style={Styles.list} key={post.id} onPress={() => { this.props.navigation.navigate('Single', { post: post });}}>
              <View style={Styles.listThumbnail}>
                <Image style={Styles.listImage}
                  source={{uri:post.better_featured_image.source_url}}
                />
              </View>
              <View style={Styles.listContent}>
                <Text style={Styles.listTitle}>{post.title.rendered}</Text>
              </View>
            </TouchableOpacity>
            <View style={Styles.listMeta}>
              <Text style={Styles.listDate}>{moment(post.date).format('LL')}</Text>
              <Text onPress={() => {
                Share.share({
                  url: post.link,
                  title: 'Diario Tiempo'
                }, {
                  dialogTitle: post.title.rendered,
                })}} style={Styles.listShare}>
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
  list: {
    width: Dimensions.get('window').width-40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  listThumbnail: {
    maxWidth: 100,
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  listImage: {
    width: 100,
    height: 100,
  },
  listContent: {
    flex: 1,
    paddingLeft: 20,
  },
  listTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  listMeta: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 20,
  },
  listDate: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
  },
  listShare: {
    flex: 1,
    fontSize: 20,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    height: 1200,
    margin: 10
  }
});
