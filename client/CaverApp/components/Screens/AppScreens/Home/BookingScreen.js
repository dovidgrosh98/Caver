import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { bookList } from '../../../../services/ApiServices'
import CalendarPicker from 'react-native-calendar-picker';

class BookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      selectedStartDate: null,
      selectedEndDate: null
    }
  }

  async componentDidMount() {
    await this.getUser()
  }

  getUser = async () => {
    const userId = await AsyncStorage.getItem('userId')
    this.setState({ id: parseInt(userId) })
    return parseInt(userId)
  }

  book = async () => {
    const userId = this.state.id
    const startDate = this.state.selectedStartDate
    const endDate = this.state.selectedEndDate
    const listingId = this.props.navigation.state.params.id
    const book = await bookList(userId, listingId, { startDate, endDate })
    await this.props.navigation.navigate('Home')
  }

  onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
        <Text
          onPress={this.book}>
          Submit
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})

export default BookingScreen;