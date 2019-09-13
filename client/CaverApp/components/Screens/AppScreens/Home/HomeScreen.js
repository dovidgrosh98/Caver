import React, { Component } from 'react'
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native'
import { allListings } from '../../../../services/ApiServices';
import { background } from '../../../styles/Colors';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    }
  }

  async componentDidMount() {
    await this.fetchListings()
  }

  fetchListings = async () => {
    const listingsData = await allListings()
    this.setState({ listings: listingsData.data })
  }

  renderListings = (listing) => {
    const { item } = listing
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: item.imgUrl }}
          style={styles.image}
        />
        <Text style={styles.text}>{item.name}</Text>
        <Text>{`$${item.costPerNight}/Night`}</Text>
        <Text>{item.description}</Text>
        <Button
          title="Book"
          onPress={() => this.props.navigation.navigate('Listing', {id: item.id})}
        />
      </View>
    )
  }

  render() {
    const { listings } = this.state
    return (
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => this.renderListings(item)}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: background
  },
  image: {
    height: 250,
    width: 250
  },
  text: {
    fontSize: 24,
  }
})

export default HomeScreen