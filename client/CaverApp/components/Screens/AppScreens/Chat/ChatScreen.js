import React from "react";
import { View, SafeAreaView } from "react-native";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";

const theme = {
  'avatar.image': 'border-radius: 6px',
  colors: {
    primary: 'green',
  },
};

const chatClient = new StreamChat('f8wwud5et5jd');
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZnJhZ3JhbnQtYnJvb2stNyJ9.L6xPD4BEH4uTS68Q9T_uzc4J8nkWX1oQMf3D9PyB2js';

const user = {
  id: 'fragrant-brook-7',
  name: 'Fragrant brook',
  image:
    'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
};

chatClient.setUser(user, userToken);

class ChannelScreen extends React.Component {
  render() {
    const channel = chatClient.channel("messaging", "fragrant-brook-7");
    channel.watch();
    return (
      <SafeAreaView>
      <Chat client={chatClient} style={theme}>
          <Channel channel={channel}>
            <View style={{ display: "flex", height: "100%" }}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <ChannelScreen />;
  }
}