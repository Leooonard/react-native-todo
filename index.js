import React, {
   Component
} from 'react';

import {
   AppRegistry,
   StyleSheet,
   TouchableWithoutFeedback,
   Text,
   View,
   TextInput,
   StatusBar,
   AsyncStorage,
   ListView,
   Dimensions,
   Image,
   ScrollView,
   PanResponder
} from 'react-native';

import Pulldown from './Pulldown.js';

let {width: windowWidth, height: windowHeight} = Dimensions.get("window");

export default class TODO extends Component {
   constructor (props) {
      super(props);

      let dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2
      });

      let testDataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.todos = [];
      this.state = {
         input: "",
         todos: dataSource.cloneWithRows([]),
         tests: dataSource.cloneWithRows(this.generateTests()),
         showDropdownMenu: false,
         chosenDate: null
      };

      this.dropdownLeft = 0;
      this.dropdownTop = 0;
   }

   generateTests () {
      var total = 25;
      var tests = [];
      for(var i = 0 ; i < total ; i++) {
         tests.push('index' + i);
      }

      return tests;
   }

   componentWillMount () {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => {
         console.log('startshould');
         return true;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
         console.log('startshouldcapture');
         return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
         console.log('moveshould');
         return true;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
         console.log('moveshouldcapture');
         return true;
      },

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
        console.log('grant');
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        console.log('move');
      },
      onPanResponderTerminationRequest: (evt, gestureState) => {
         console.log('terminationrequest');
         return false;
      },
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        console.log('release');
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        console.log('terminate');
        return false;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }

   render() {
      return (
         <View>
            <StatusBar/>
            <View style={{
               padding: 5,
               paddingTop: 20,
            }}>
               <ListView
                  renderScrollComponent = {props => <Pulldown {...props} />}
                  style = {{height: 400}}
                  dataSource = {this.state.tests}
                  renderRow = {todo => {
                    return <View style = {
                     {padding: 1, borderWidth: 1, borderColor: 'black'}
                  }><Text>{todo}</Text></View>}}
               />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      padding: 6,
      borderRadius: 5,
      flex: 1,
   }
});

