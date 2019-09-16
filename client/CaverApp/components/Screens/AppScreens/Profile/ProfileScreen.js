import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, AsyncStorage } from 'react-native'
import { getUserListings, userListingDelete, allBookings, getListing, deleteBook } from '../../../../services/ApiServices'
import { Ionicons as IconComponent } from '@expo/vector-icons'
import { Platform } from '@unimodules/core'
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Button } from '../../../common';



class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      listings: {},
      user: {},
      bookings: []
    }
  }

  async componentDidMount() {
    const id = await this.getUser()
    await this.fetchListings(id)
    await this.fetchBookings()
  }

  getUser = async () => {
    const userId = await AsyncStorage.getItem('userId')
    this.setState({ id: parseInt(userId) })
    return parseInt(userId)
  }

  fetchListings = async (id) => {
    const userListings = await getUserListings(id)
    const { data: { user: { listings } } } = userListings
    this.setState({ listings, user: userListings.data.user })
  }

  fetchBookings = async () => {
    const bookings = await allBookings(this.state.id)
    bookings.map(async (booking) => {
      const listing = await getListing(booking.listingId)
      this.setState(prevState => {
        return this.state.bookings = [...prevState.bookings, {booking: listing.data, id: booking.id}]
      })
    })
  }

  editListing = (id) => {

  }

  deleteListing = async (id) => {
    await userListingDelete(id)
    await this.fetchListings(this.state.id)
  }

  cancelBooking = async (id) => {
    await deleteBook(id)
    await this.fetchBookings()
  }

  renderOwnItem = (listing) => {
    const { item } = listing
    return (
      <View style={styles.container}>
        <Text>{item.name}</Text>
        <Image
          style={styles.img}
          source={{ uri: item.imgUrl }}
        />
        <Text
          onPress={() => this.editListing(item.id)}
        >
          Edit
        </Text>
        <Text
          onPress={() => this.deleteListing(item.id)}
        >
          Delete
        </Text>
      </View>
    )
  }

  renderBookedItem = (listing) => {
    const { item } = listing
    return (
      <View style={styles.container}>
        <Text>{item.booking.name}</Text>
        <Image
          style={styles.img}
          source={{ uri: item.booking.imgUrl }}
        />
        <Text
        onPress={() => this.cancelBooking(item.id)}
        >
          Cancel
        </Text>
      </View>
    )
  }


  render() {
    const { listings, bookings } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={listings}
          renderItem={(item) => this.renderOwnItem(item)}
          keyExtractor={(item, index) => index}
          horizontal={true}
        />
        <FlatList
          data={bookings}
          renderItem={(item) => this.renderBookedItem(item)}
          keyExtractor={(item, index) => index}
          horizontal={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    height: 200,
    width: 200
  }
})

export default ProfileScreen