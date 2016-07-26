import React, {
   Component
} from 'react';

import {
   AppRegistry,
   StyleSheet,
   TouchableWithoutFeedback,
   TouchableHighlight,
   Text,
   View,
   TextInput,
   StatusBar,
   AsyncStorage,
   ListView,
   Dimensions,
   Image
} from 'react-native';

import {
   saveTodo,
   removeTodo,
   getAllTodo,
   clearAllTodo,
   getLatestTodo
} from './TodoStorage.js';

import {
   Button
} from 'doly';

import TodoItem from './TodoItem.js';

import DropdownMenu from './DropdownMenu.js';

import Calendar from './Calendar/Calendar.js';

import Checkbox from './Checkbox.js';

import Ratiobox from './Ratiobox.js';

import HeaderView from './HeaderView.js';

let {width: windowWidth} = Dimensions.get("window");

export default class extends Component {
   constructor (props) {
      super(props);

      this.state = {
         input: "",
         content: "",
         showDropdownMenu: false,
         chosenDate: null,
         latestTodo: null,
      };

      this.dropdownLeft = 0;
      this.dropdownTop = 0;
   }

   componentDidMount () {
      getLatestTodo().then(latestTodo => {
         this.setState({
            latestTodo
         });
      });
   }

   inputChanage (text) {
      this.setState({
         input: text
      });
   }

   contentChange (content) {
      this.setState({
         content
      });
   }

   todoValidate (todo, chosenDate) {
      if (todo && chosenDate) {
         return true;
      } else {
         return false;
      }
   }

   submitChange () {
      let {input, chosenDate, content} = this.state;

      if (!this.todoValidate(input, chosenDate)) {
         alert('请输入内容并选择deadline.');
         return;
      }

      let todoObj = {
         input,
         content,
         date: chosenDate,
      };

      saveTodo(todoObj)
      .then((todo) => {
         this.setState({
            input: '',
            chosenDate: '',
            content: '',
            latestTodo: null
         });
      });
   }

   onCalendarButtonClick () {
      this.calendarButton.measure((x, y, width, height, pageX, pageY) => {
         this.dropdownLeft = pageX + width / 2;
         this.dropdownTop = pageY + height;

         this.setState({
            showDropdownMenu: true,
         });
      })
   }

   onCalendarClick (day) {
      if (day.type === "normal") {
         this.setState({
            showDropdownMenu: false,
            chosenDate: `${day.date.year} / ${day.date.month} / ${day.date.day}`
         });
      }
   }

   showDropdownMenu () {
      var Menu = null;
      if (this.state.showDropdownMenu) {
         Menu = (
            <DropdownMenu 
               left = {this.dropdownLeft} 
               top = {this.dropdownTop} 
               onClose = {this.closeDropdownMenu.bind(this)}
            >
               <View style = {{
                  width: windowWidth,
                  backgroundColor: 'transparent',
                  flexDirection: 'column'
               }}>   
                  <Calendar 
                     month = {7} 
                     year = {2016}
                     onDayClick = {this.onCalendarClick.bind(this)}
                  />
               </View>
            </DropdownMenu>
         );
      }

      return Menu
   }

   closeDropdownMenu () {
      this.setState({
         showDropdownMenu: false
      });
   }

   showLatestTodoItem () {
      if (this.state.latestTodo) {
         return (
            <View style = {{
            }}>
               <Text>最近的待办事项:</Text>
               <TodoItem todo = {this.state.latestTodo}/>
            </View>
         );
      } else {
         return null;
      }
   }

   render() {
      return (
         <View style = {{flex: 1}}>
            <HeaderView
               rightText = {'记录列表'}
               rightOnPress = {() => {
                  this.props.navigator.push("todoList", {});
               }}
               titleText = {'新的记录'}
            />
            <View style={{
               backgroundColor: '#e8e8e8',
               flex: 1
            }}>
               <View style = {styles.inputWrapper}>
                  <TextInput
                     style = {styles.input}
                     placeholder = {"准备干点什么？"}
                     value = {this.state.input}
                     onChangeText = {this.inputChanage.bind(this)}
                  />
               </View>
               <View style = {styles.calendarWrapper}>
                  <Text style = {styles.text}>Deadline: </Text>
                  <View style = {{
                     flex: 1,
                     flexDirection: 'row',
                     justifyContent: 'flex-end',
                     paddingRight: 20,
                  }}>
                     <Text style = {styles.text}>
                        {this.state.chosenDate}
                     </Text>
                  </View>
                  <Button
                     normalStyle = {styles.calendarButton}
                     click = {this.onCalendarButtonClick.bind(this)}
                  >
                     <Image 
                        ref = {ref => this.calendarButton = ref}
                        style = {styles.calendarImage}
                        resizeMode = {"stretch"}
                        source = {require('./images/calendar.png')}
                     />
                  </Button>
               </View>
               <View style = {styles.contentWrapper}>
                  <TextInput 
                     multiline = {true}
                     placeholder = {"备注"}
                     style = {styles.contentInput}
                     value = {this.state.content}
                     onChangeText = {this.contentChange.bind(this)}
                  />
               </View>
               <Button normalStyle = {styles.submitButton} click = {this.submitChange.bind(this)}>
                  {"确认"}
               </Button>
               <View style = {{flex: 1, backgroundColor: 'transparent'}}></View>
               {this.showLatestTodoItem()}
               {this.showDropdownMenu()}
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   inputWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: '#cacaca',
      borderTopWidth: 1,
      borderTopColor: '#cacaca',
      padding: 8,
      backgroundColor: 'white'
   },
   input: {
      height: 24,
      flex: 1,
      fontSize: 14,
   },
   text: {
      fontSize: 16,
      color: 'gray',
      alignSelf: 'center'
   },
   calendarWrapper: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#cacaca',
      padding: 8,
      backgroundColor: 'white'
   },
   calendarButton: {
      flex: -1,
      width: 25,
      height: 25,
      borderWidth: 0,
   },
   calendarImage: {
      width: 25,
      height: 25,
   },
   contentWrapper: {
      borderTopWidth: 1,
      borderTopColor: '#cacaca',
      borderBottomWidth: 1,
      borderBottomColor: '#cacaca',
      padding: 8,
      backgroundColor: 'white',
      marginTop: 20
   },
   contentInput: {
      height: 72,
      flex: 1,
      fontSize: 14
   },
   submitButton: {
      flex: -1,
      margin: 10,
      marginTop: 20
   }
});