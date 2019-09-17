import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, AsyncStorage, Dimensions } from 'react-native'
import { getUserListings, userListingDelete, allBookings, getListing, deleteBook } from '../../../../services/ApiServices'
import { ScrollView, FlatList } from 'react-native-gesture-handler';
const screenWidth = Math.round(Dimensions.get('window').width)


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
    bookings.forEach(async (booking) => {
      const listing = await getListing(booking.listingId)
      this.setState(prevState => {
        return this.state.bookings = [...prevState.bookings, { booking: listing.data, id: booking.id }]
      })
    })
  }

  editListing = (id) => {
    this.props.navigation.navigate('Edit', { id })
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
      <View style={styles.ownList}>
        <Image
          style={styles.listingImg}
          source={{ uri: item.imgUrl }}
        />
        <View style={{ flexDirection: 'row', justfyContent: 'space-between' }}>
          <Text
            style={{ marginHorizontal: 10 }}
            onPress={() => this.editListing(item.id)}>
            Edit
        </Text>
          <Text
            style={{ marginHorizontal: 10 }}
            onPress={() => this.deleteListing(item.id)}>
            Delete
        </Text>
        </View>
      </View>
    )
  }

  renderBookedItem = (listing) => {
    const { item } = listing
    return (
      <View style={{ width: screenWidth, justfyContent: 'center', alignItems: 'center' }}>
        <Image
          style={styles.bookingImg}
          source={{ uri: item.booking.imgUrl }}
        />
        <Text
          style={{fontSize: 16, fontWeight: '600'}}
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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.ownListings}>
          <Text style={styles.header}>Your Listings</Text>
          <FlatList
            data={listings}
            renderItem={(item) => this.renderOwnItem(item)}
            keyExtractor={(item, index) => item.id.toString()}
            horizontal={true}
          />
        </View>
        <View style={styles.bookings}>
          <Text style={styles.reservations}>Reservations:</Text>
          <FlatList
            data={bookings}
            renderItem={(item) => this.renderBookedItem(item)}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownList: {
    margin: 10,
    alignItems: 'center',
    marginBottom: 80
  },
  ownListings: {
    flex: 1,
    marginTop: 60,
    marginLeft: 5
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15
  },
  listingsList: {
    flex: 1
  },
  reservations: {
    marginLeft: 15,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },
  bookings: {
    flex: 1,
  },
  listingImg: {
    height: 200,
    width: 200,
    borderRadius: 15
  },
  bookingImg: {
    height: 300,
    width: '90%',
    borderRadius: 20
  }
})

export default ProfileScreen