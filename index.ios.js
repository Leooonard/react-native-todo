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
   ScrollView
} from 'react-native';

import {
   saveTodo,
   removeTodo,
   getAllTodo,
   clearAllTodo
} from './TodoStorage.js';

import TODO from './todo.index.js';
import TODONavigator from './todo.navigator.js';

AppRegistry.registerComponent('TODO', () => TODONavigator);