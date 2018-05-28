import React, { Component } from 'react'
import { View, ScrollView, WebView, Text, Image, Platform, Dimensions, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/es'
export default class Entry extends Component {
  webview = null;
  constructor(props) {
    super(props);
    this.state = {
      tamano: 0,
      post: props.post,
    };
  }
  _postMessage = ( ) => {
    this.webview.postMessage( "Hello" );
    console.log( "Posted message" );
  }
  _receivedMessage = ( e )  => {
    console.log("Received message");
    console.log(e.nativeEvent.data);
    this.setState( { tamano: parseInt(e.nativeEvent.data)} );
  }
  componentDidMount() {
    this._postMessage();
  }
  render() {
    let post = this.state.post;
    let HTML ='<html>' +
        '<head>' +
          '<title></title>' +
          '<meta charset="UTF-8">' +
          '<style>body{font-size:18px;letter-spacing:1px;font-family:"Helvetica Neue", Helvetica, sans-serif; margin:0; padding: 20px; text-align: left;overflow: hidden;color:#414142;}body img{max-width:100%;height:auto;}a{cursor: default;pointer-events:none;color:#414141;text-decoration:none;}body iframe {max-width: 100% !important; min-width: 100% !important; min-height: 300px; max-height: 300px; margin 0px 0px 20px; padding:0px}</style>' +
        '</head>' +
        '<body>' +
          post.content.rendered +
        '</body>' +
      '</html>';
    let entryBody = {
      height: this.state.tamano,
      backgroundColor: 'transparent',
    };
    let javascript =   'window.location.hash = 1; document.title = document.body.scrollHeight; window.postMessage( document.body.scrollHeight );';
    moment.locale('es');
    const date = post.date;
    const formattedDate = moment(date).calendar();
    return (
      <ScrollView style={Styles.entry}>
        <View style={Styles.entryHeader}>
          <Image style={Styles.entryImage} source={{uri:post.better_featured_image.source_url}}/>
          <Text style={Styles.entryTitle}>{post.title.rendered}</Text>
          <Text style={Styles.entryMeta}>{formattedDate}</Text>
        </View>
        <WebView
          ref={webview => { this.webview = webview; }}
          automaticallyAdjustContentInsets={true}
          injectedJavaScript={javascript}
          javaScriptEnabled={true}
          javaScriptEnabledAndroid={true}
          onMessage={this._receivedMessage}
          style={entryBody}
          source={{html: HTML}}  />
      </ScrollView>
    );
  }
}
const Styles =  StyleSheet.create({
  entry: {
    backgroundColor: '#fafafa',
  },
  entryHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  entryImage: {
    width: '100%',
    height: Dimensions.get('window').width,
  },
  entryTitle: {
    padding: 20,
    fontWeight: '400',
    letterSpacing: 1,
    fontSize: 34,
    color: '#141414',
  },
  entryMeta: {
    padding: 20,
    paddingBottom: 10,
    paddingTop: 0,
    fontSize: 12,
    fontWeight: '100',
    textAlign: 'right',
    color: '#636e72',
  },
});
