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

let {width: windowWidth, height: windowHeight} = Dimensions.get("window");

class TODO extends Component {
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

   submitChange () {
      let {input, chosenDate} = this.state;

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

   render() {
      return (
         <View>
            <StatusBar/>
            <View style={{
               padding: 5,
               paddingTop: 20,
            }}>
               <Checkbox/>
               <View style = {{
                  flexDirection: 'row',
                  alignItems: 'center',
               }}>
                  <TextInput
                     style = {styles.input}
                     placeholder = {"准备干点什么？"}
                     value = {this.state.input}
                     onChangeText = {this.inputChanage.bind(this)}
                  />
                  <Button
                     normalStyle = {{
                        flex: -1,
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        marginLeft: 10,
                        borderWidth: 0
                     }}
                     click = {this.onCalendarButtonClick.bind(this)}
                  >
                     <Image 
                        ref = {ref => this.calendarButton = ref}
                        style = {{
                           width: 30,
                           height: 30,
                        }}
                        resizeMode = {"stretch"}
                        source = {require('./images/calendar.png')}
                     />
                  </Button>
               </View>
               <View style = {{
                  marginBottom: 20,
               }}>
                  <Text>{this.state.chosenDate}</Text>
               </View>
               <Button normalStyle = {{flex: -1}} click = {this.submitChange.bind(this)}>
                  {"确认"}
               </Button>
               <ListView
                  dataSource = {this.state.todos}
                  renderRow = {todo => <TodoItem 
                                          todo = {todo} 
                                          onDelete = {this.deleteTodo.bind(this)}
                                       />
                              }
               />
               {this.showDropdownMenu()}
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

AppRegistry.registerComponent('TODO', () => TODO);