import React, { Component } from 'react'
import { Input, Button } from '../../../common'
import { StyleSheet, View, Text, Switch } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { REACT_APP_ACCESS_KEY_ID, REACT_APP_SECRET_ACCESS_KEY } from 'react-native-dotenv'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { createListing } from '../../../../services/ApiServices';
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';

class CreateListingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imgUrl: '',
      address: '',
      city: '',
      state: '',
      description: '',
      costPerNight: '',
      beds: '',
      adults: '',
      freeWifi: false
    }
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  uploadImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: result,
      name: "image.png",
      type: "image/png"
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "air-replicate",
      region: "us-east-2",
      accessKey: REACT_APP_ACCESS_KEY_ID,
      secretKey: REACT_APP_SECRET_ACCESS_KEY,
      successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201) throw new Error("Failed to upload image to S3");
      else this.setState({ imgUrl: response.body.postResponse.location })
    })
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }

  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({ freeWifi: value })
    //state changes according to switch
    //which will result in re-render the text
  }

  handleSubmit = async () => {
    const {
      name,
      imgUrl,
      address,
      city,
      state,
      description,
      costPerNight,
      beds,
      adults,
      freeWifi
    } = this.state
    try {
      if (!this.state.isError) {
        const resp = await createListing({
          name,
          imgUrl,
          address,
          city,
          state,
          description,
          costPerNight,
          beds,
          adults,
          freeWifi
        })
        if (resp.status === 200) {
        }
      }
    } catch (error) {
      throw error
    }
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <Input
          label="Title"
          onChangeText={(text) => this.handleChange('name', text)}
          style={styles.input}
        />
        <Text
          onPress={this.uploadImage}
        >
          Upload Image
        </Text>
        <Input
          label="Address"
          onChangeText={(text) => this.handleChange('address', text)}
          style={styles.input}
        />
        <Input
          label="City"
          onChangeText={(text) => this.handleChange('city', text)}
          style={styles.input}
        /><Input
          label="State"
          onChangeText={(text) => this.handleChange('state', text)}
          style={styles.input}
        />
        <Input
          label="Description"
          onChangeText={(text) => this.handleChange('description', text)}
          style={styles.input}
        />
        <Input
          label="Cost Per Night"
          onChangeText={(text) => this.handleChange('costPerNight', text)}
          style={styles.input}
        />
        <Input
          label="Amount of Beds"
          onChangeText={(text) => this.handleChange('beds', text)}
          style={styles.input}
        />
        <Input
          label="Adults"
          onChangeText={(text) => this.handleChange('adults', text)}
          style={styles.input}
        />
        <View>
          <Text>Free Wifi?</Text>
          <Switch
            onValueChange={this.toggleSwitch}
            value={this.state.freeWifi}
          />
        </View>
        <Text onPress={this.handleSubmit}>Submit</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20000,
    marginTop: 50
  },
  input: {
    width: '75%'
  }
})

export default CreateListingScreen;