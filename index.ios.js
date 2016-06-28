import React, {
   Component
} from 'react';

import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TextInput,
   AsyncStorage
} from 'react-native';

import {
   Button
} from 'doly'

class TODO extends Component {
   constructor (props) {
      super(props);

      this.state = {
         input: "",
         messageList: []
      };
   }

   inputChanage (text) {
      this.setState({
         input: text
      });
   }

   submitChange () {
      let {input, messageList} = this.state;
      messageList.push(input);

      this.setState({
         input: "",
         messageList
      });
   }

   renderMessageList () {
      return this.state.messageList.map((message, index) => {
         return (
            <Text
               style = {{
                  backgroundColor: '#b2b2b2',
                  color: 'white',
                  borderRadius: 4,
                  padding: 8,
                  fontSize: 16,
                  marginTop: 8
               }}
               key = {index}
            >
               {message}
            </Text>
         );
      })
   }

   render() {
      return (
         <View style={{
            padding: 20
         }}>
            <TextInput
               style = {{
                  height: 40,
                  borderWidth: 1,
                  borderColor: 'gray',
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 20
               }}
               value = {this.state.input}
               onChangeText = {this.inputChanage.bind(this)}
            />
            <Button click = {this.submitChange.bind(this)}>
               {"确认"}
            </Button>
            <View>
               {this.renderMessageList()}
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
});

AppRegistry.registerComponent('TODO', () => TODO);