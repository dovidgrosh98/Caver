import React, { Component } from 'react'
import { View, Text, FlatList, Image, StyleSheet, Button, TextInput } from 'react-native'
import { allListings } from '../../../../services/ApiServices';
import { FontAwesome } from '@expo/vector-icons'

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
      <View style={styles.card}>
        <Image
          source={{ uri: item.imgUrl }}
          style={styles.image}
        />
        <View style={styles.textHeader}>
          <Text>{`$${item.costPerNight} Per Night`}</Text>
          <Text 
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Listing', { id: item.id })}
          >
            Book Now
          </Text>

        </View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.area}>{item.city}, {item.state}</Text>
        <Text style={styles.features}>{item.beds} Beds, {item.adults} Adults</Text>
        <FontAwesome 
        onPress={() => this.props.navigation.navigate('Chat', { id: item.id })}
        style={styles.icon} 
        name={'comment'} size={20} 
        />
      </View>
    )
  }

  render() {
    const { listings } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => this.renderListings(item)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30
  },
  card: {
    alignItems: 'center',
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 400
  },
  image: {
    marginTop: 30,
    height: 250,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    width: 400
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#b4b4b4',
    padding: 5
  },
  area: {
    flexDirection: 'row',
    width: 400
  },
  features: {
    width: 400
  },
  icon: {
    marginTop: 10,
    width: 400
  }
})

export default HomeScreen