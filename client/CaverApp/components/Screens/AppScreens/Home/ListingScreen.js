import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { getListing, getGeoCode } from '../../../../services/ApiServices'
import { Ionicons as IconComponent } from '@expo/vector-icons'
import { Platform } from '@unimodules/core'
import { background } from '../../../styles/Colors';
import MapView, { Marker, Polyline } from 'react-native-maps'
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
            <Text style={styles.title}>{listing.name}</Text>
            <Text style={styles.cost}>{`$${listing.costPerNight}/Night`}</Text>
          </View>
          <Text style={styles.textDescription}>{listing.description}</Text>
          <Text
            onPress={() => this.props.navigation.navigate('Booking', { id: listing.id })}
          >
            Book
          </Text>
        </View>
        <View style={styles.featureContainer}>
          <View style={styles.feature}>
            <IconComponent name={bedIcon} size={32} color={'#b4b4b4'} />
            <Text style={styles.featureText}>{`${listing.beds} Beds`}</Text>
          </View>
          <View style={styles.feature}>
            <IconComponent name={personIcon} size={32} color={'#b4b4b4'}  />
            <Text style={styles.featureText}>{`${listing.adults} Adults`}</Text>
          </View>
          <View style={styles.feature}>
            <IconComponent name={wifiIcon} size={32} color={'#b4b4b4'} />
            <Text style={styles.featureText}>{listing.freeWifi ? "Free Wifi" : "No Wifi"}</Text>
          </View>
        </View>
        <MapView
          liteMode={true}
          style={styles.map}
          region={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            title='Listing'
            pinColor='black'
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
          />
          <Marker
            title='Current Location'
            pinColor='black'
            coordinate={{
              latitude: Number(currentLat),
              longitude: Number(currentLng)
            }}
          />
          <Polyline
            coordinates={[
              { latitude: Number(latitude), longitude: Number(longitude) },
              { latitude: Number(currentLat), longitude: Number(currentLng) }
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
    height: 1000,
  },
  image: {
    width: '100%',
    borderRadius: 20,
    height: 375,
    marginBottom: 30
  },
  textContainer: {
    width: '100%',
  },
  textTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  title: {
    fontSize: 18,
    width: '50%',
    fontFamily: 'Apple SD Gothic Neo',
    flexWrap: 'wrap',
    fontWeight: '600'
  },
  cost: {
    fontSize: 18,
  },
  textDescription: {
    fontSize: 16,
    padding: 15,
    fontFamily: 'Farah'
  },
  featureContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 40,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  feature: {
    alignItems: 'center'
  },
  featureText: {
    color: '#b4b4b4'
  },
  map: {
    width: '100%',
    height: 300,
  }
})

export default ListingScreen