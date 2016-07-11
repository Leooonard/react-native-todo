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
   Image
} from 'react-native';

import {
   saveTodo,
   removeTodo,
   getAllTodo,
   clearAllTodo
} from './TodoStorage.js';

import {
   Button
} from 'doly';

import TodoItem from './TodoItem.js';

import DropdownMenu from './DropdownMenu.js';

import Calendar from './Calendar/Calendar.js';

import Checkbox from './Checkbox.js';

import Ratiobox from './Ratiobox.js';

let {width: windowWidth, height: windowHeight} = Dimensions.get("window");

export default class extends Component {
   constructor (props) {
      super(props);

      let dataSource = new ListView.DataSource({
         rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.todos = [];
      this.state = {
         input: "",
         todos: dataSource.cloneWithRows([]),
         showDropdownMenu: false,
         chosenDate: null
      };

      this.dropdownLeft = 0;
      this.dropdownTop = 0;
   }

   componentDidMount () {
      getAllTodo()
      .then((todos) => {
         this.todos = [...todos];
         this.setState({
            todos: this.state.todos.cloneWithRows(this.todos)
         });
      });
   }

   inputChanage (text) {
      this.setState({
         input: text
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
      let {input, chosenDate} = this.state;

      if (!this.todoValidate(input, chosenDate)) {
         alert('请输入内容并选择deadline.');
         return;
      }

      let todoObj = {
         input,
         date: chosenDate,
      };

      saveTodo(todoObj)
      .then((todo) => {
         this.todos.push(todo);

         this.setState({
            input: '',
            chosenDate: '',
            todos: this.state.todos.cloneWithRows(this.todos)
         });
      });
   }

   deleteTodo (key) {
      removeTodo(key)
      .then(() => {
         let newTodos = [];
         this.todos.forEach((todo) => {
            if (todo.key !== key) {
               newTodos.push(todo);
            }
         });

         this.todos = newTodos;
         this.setState({
            todos: this.state.todos.cloneWithRows(this.todos)
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
      if (this.todos.length > 0) {
         return <TodoItem todo = {this.todos[0]}/>
      } else {
         return null;
      }
   }

   render() {
      return (
         <View>
            <StatusBar/>
            <View style={{
               padding: 5,
               paddingTop: 20,
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
                  />
               </View>
               <Button normalStyle = {{flex: -1, marginTop: 20}} click = {this.submitChange.bind(this)}>
                  {"确认"}
               </Button>
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
      padding: 8
   },
   calendarButton: {
      flex: -1,
      width: 25,
      height: 25,
      borderWidth: 0
   },
   calendarImage: {
      width: 25,
      height: 25,
   },
   contentWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: '#cacaca',
      padding: 8,
   },
   contentInput: {
      height: 72,
      flex: 1,
      fontSize: 14
   }
});