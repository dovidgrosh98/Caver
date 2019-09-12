import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import TopCoinList from '../../../TopCoinList'
import { getTopCoins } from '../../../../services/ApiServices';
import { highlightColor, textColor } from '../../../styles/Colors';
import { Gradient, Header } from '../../../common';


export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      topCoins: [],
      favorites: [],
      refreshing: false,
      isLoading: false
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    await this.fetchTopCoins()
  }

  fetchTopCoins = async () => {
    try {
      const topCoins = await getTopCoins()
      this.setState({ topCoins })
    }
    catch (error) {
      throw error
    }
    finally {
      this.setState({ isLoading: false })
    }
  }

  renderScreens = () => {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator size='large' color={highlightColor} />
      )
    }
    else {
      return (
        <Gradient>
          <View style={styles.topContainer}>
            <Header>
              <View style={styles.title}>
                <Text style={styles.titleText}>Top Coins</Text>
                <TopCoinList
                  data={this.state.topCoins}
                  onPress={() => navigation.navigate('CoinDetails', { symbol: item.symbol })
                  } />
              </View>
            </Header>
          </View>
          <View style={styles.bottomContainer}></View>
        </Gradient>
      )
    }
  }

  render() {
    return this.renderScreens()
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  bottomContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  listStyle: {
    alignSelf: 'stretch',
    flex: 1
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1
  },
  titleText: {
    marginTop: 50,
    color: textColor,
    fontSize: 18,
    fontWeight: '700'
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    flex: 1
  },
  image: {
    height: 32,
    width: 32,
    marginRight: 5
  },
  text: {
    alignSelf: 'center',
    color: textColor,
    fontSize: 18
  }
})
