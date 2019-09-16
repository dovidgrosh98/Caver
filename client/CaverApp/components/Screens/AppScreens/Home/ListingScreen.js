import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { getListing, getGeoCode } from '../../../../services/ApiServices'
import { Ionicons as IconComponent } from '@expo/vector-icons'
import { Platform } from '@unimodules/core'
import { background } from '../../../styles/Colors';
import MapView from 'react-native-maps'
import { Marker, Polyline } from 'react-native-maps'
import { ScrollView } from 'react-native-gesture-handler';



class ListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.navigation.state.params.id,
      listing: {},
      longitude: '',
      latitude: '',
      currentLat: '',
      currentLng: ''
    }
  }

  async componentDidMount() {
    await this.fetchListing()
    await this.fetchGeo()
  }

  fetchListing = async () => {
    const listing = await getListing(this.state.id)
    this.setState({ listing: listing.data })
  }

  fetchGeo = async () => {
    const { listing: { address, city, state } } = this.state
    const geoLocation = await getGeoCode(address, city, state)
    const { lat, lng } = geoLocation
    this.setState({ longitude: lng, latitude: lat })
    navigator.geolocation.getCurrentPosition(
      position => {
        const currentLocation = position
        this.setState({
          currentLng: currentLocation.coords.longitude,
          currentLat: currentLocation.coords.latitude
        })
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    const { listing, currentLat, currentLng, longitude, latitude } = this.state
    bedIcon = Platform.OS === 'ios' ? `ios-bed` : `md-bed`
    personIcon = Platform.OS === 'ios' ? `ios-person` : `md-person`
    wifiIcon = Platform.OS === 'ios' ? `ios-wifi` : `md-wifi`
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textContainer}>
          <Image
            source={{ uri: listing.imgUrl }}
            style={styles.image}
          />
          <View style={styles.textTitle}>
            <Text>{listing.name}</Text>
            <Text>{`$${listing.costPerNight}/night`}</Text>
          </View>
          <Text>{listing.description}</Text>
          <Text
            onPress={() => this.props.navigation.navigate('Booking', { id: listing.id })}
          >
            Book
          </Text>
        </View>
        <View style={styles.featureContainer}>
          <View>
            <IconComponent name={bedIcon} size={32} />
            <Text>{`${listing.beds} Beds`}</Text>
          </View>
          <View>
            <IconComponent name={personIcon} size={32} />
            <Text>{`${listing.adults} Adults`}</Text>
          </View>
          <View>
            <IconComponent name={wifiIcon} size={32} />
            <Text>{listing.freeWifi ? "Free Wifi" : "No Wifi"}</Text>
          </View>
        </View>
        <MapView
          liteMode={true}
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            title='Listing'
            pinColor='black'
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
          <Marker
            title='Current Location'
            pinColor='black'
            coordinate={{
              latitude: currentLat,
              longitude: currentLng
            }}
          />
          <Polyline
            coordinates={[
              { latitude: latitude, longitude: longitude },
              { latitude: currentLat, longitude: currentLng }
            ]}
          />
        </MapView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: '100%',
    borderRadius: 30,
    flex: 5,
  },
  textContainer: {
    width: '100%',
    flex: 3
  },
  textTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1
  },
  textDescription: {
    flex: 3
  },
  featureContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: background,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center'
  },
  map: {
    flex: 2,
    width: '100%',
  }
})

export default ListingScreen