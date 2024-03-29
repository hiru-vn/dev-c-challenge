import React from 'react';
import { View, ActivityIndicator, Text, FlatList, Linking, Platform, Image, TouchableOpacity, TextInput } from 'react-native'
import { gooogleAPI } from '../constants/APIkeys'
import moment from 'moment';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import styles from '../style/HomeScreenStyle'
import WeatherStatus from '../components/WeatherStatus';
import { FontAwesome } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      listArc: [],
      pageNumber: 1,
      hasError: false,
      lastPageReached: false,
      location: {
        name: "saigon",
        weather: [{ main: "", description: "" }],
      },
      loadLocation: true,
      errorLocation: false,
      searchLine: '',
      onSearch: false,
    }
  }
  componentDidMount() {
    this.getNews()
  }
  getNews = async () => {
    if (this.state.lastPageReached) return
    try {
      const response = await (this.state.searchLine.trim() == '' ? fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + gooogleAPI + '&page=' + this.state.pageNumber
      ) : fetch(
        'https://newsapi.org/v2/everything?q=' + this.state.searchLine + '&apiKey=' + gooogleAPI + '&page=' + this.state.pageNumber
      ))
      const data = await response.json()
      const hasMoreArticles = data.articles.length > 0;
      if (!hasMoreArticles) {
        await this.setState({
          lastPageReached: true,
        },
        )
        return
      }
      await this.setState(prev => ({
        isLoading: false,
        pageNumber: prev.pageNumber + 1,
        listArc: this.filterForUniqueArticles(prev.listArc.concat(data.articles)),
      }))
    }
    catch (err) {
      this.setState({
        hasError: true,
      })
      console.warn(err)
    }
  };
  filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };
  renderArticle = ({ item ,index}) => (
    <View style={styles.article}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title.split(' - ')[0]}</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Image style={styles.articleImg} source={{ uri: item.urlToImage }}></Image>
      </View>
      <Text style={{ marginVertical: 10 }}>{item.content}</Text>
      <View style={styles.row}>
        <View style={styles.timeContainer}>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
          <TouchableOpacity>
            <FontAwesome size={30} name="bookmark" color="#333"></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
      <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4"
        onPress={() => this.readMore(item.url)} />
    </View>
  )
  readMore = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    }); 
  };
  onSearching = async () => {
    if (!this.state.onSearch) {
      this.setState({
        onSearch: true,
      })
      this.refs.myInput.focus()
    }
    else {
      this.setState({
        onSearch: false,
      })
    }
  }
  endSearch = async () => {
    await this.setState({
      onSearch: false,
    })
  }
  searchNews = async () => {
    await this.setState({
      pageNumber: 1,
      listArc: [],
      onSearch: false,
    })
    this.getNews()
  }
  render() {
    if (this.state.hasError) {
      return (
        <Text style={styles.error}>Some errors has occurred</Text>
      )
    }
    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={styles.loader} size="large" loading={this.state.isLoading} />
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => this.onSearching()}>
            <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} type='ionicon'></Icon>
          </TouchableOpacity>
          <Image style={styles.headLabel} source={require('../assets/images/headLabel.png')} resizeMode='contain' />
          <TouchableOpacity>
            <Icon name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} type='ionicon'></Icon>
          </TouchableOpacity>
        </View>
        <TextInput style={this.state.onSearch ? styles.searchText : styles.invisible}
          ref="myInput"
          blurOnSubmit={true}
          onChangeText={text => this.setState({ searchLine: text })}
          onSubmitEditing={() => this.searchNews()}
          onBlur={() => this.endSearch()}
          placeholder="search news" />
        <View style={styles.row}>
          <Text style={styles.label}>{this.state.searchLine.trim() == '' ? 'Healines' : this.state.searchLine} </Text>
          {!this.state.onSearch && <Text style={styles.info}>({this.state.listArc.length})</Text>}
        </View>
        <FlatList
          style={{ width: '100%' }}
          data={this.state.listArc}
          renderItem={this.renderArticle}
          keyExtractor={(item,index) => (item.title+index)}
          onEndReached={this.getNews}
          onEndReachedThreshold={1}
          extraData={this.state.listArc}
          ListHeaderComponent={<View><WeatherStatus navigate={this.props.navigation.navigate} /></View>}
          ListFooterComponent={this.state.lastPageReached ?
            <Text style={styles.end}>{this.state.listArc.length == 0 ? 'No results for ' + this.state.searchLine : 'No more articles'}</Text> :
            <ActivityIndicator size="large" loading={this.setState.isLoading} />} />
      </View> 
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};