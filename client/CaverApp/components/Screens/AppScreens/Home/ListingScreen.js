import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { getListing, getGeoCode } from '../../../../services/ApiServices'
import { Ionicons as IconComponent } from '@expo/vector-icons'
import { Platform } from '@unimodules/core'
import { background } from '../../../styles/Colors';
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'




class ListingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.navigation.state.params.id,
      listing: {},
      longitude: '',
      latitude: ''
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
    console.log(lat)
    this.setState({longitude: lng, latitude: lat})
  }

  render() {
    const { listing } = this.state
    bedIcon = Platform.OS === 'ios' ? `ios-bed` : `md-print`
    personIcon = Platform.OS === 'ios' ? `ios-person` : `md-person`
    wifiIcon = Platform.OS === 'ios' ? `ios-wifi` : `ios-wifi`
    return (
      <View style={styles.container}>
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
          style={styles.map}
          camera={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
        </MapView>
      </View>
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
    flex: 4,
    borderRadius: 40
  },
  textContainer: {
    width: '100%',
    flex: 2
  },
  textTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    width: '100%'
  }
})

export default ListingScreen