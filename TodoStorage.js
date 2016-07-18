import {
	AsyncStorage
} from 'react-native';

function makeUniqueHash () {
	return Date.now().toString();
}

function saveTodo (todoObj) {
	let uniqueHash = makeUniqueHash();

	return AsyncStorage.setItem(uniqueHash, JSON.stringify(todoObj))
							.then(() => {
								return {
									key: uniqueHash,
									todoObj
								}
							});
}

function removeTodo (key) {
	return AsyncStorage.removeItem(key);
}

function clearAllTodo () {
	return AsyncStorage.clear();
}

function getAllTodo () {
	return AsyncStorage.getAllKeys()
				.then(keys => AsyncStorage.multiGet(keys))
				.then(todos => todos.map(todo => {
					return {
						key: todo[0],
						todoObj: JSON.parse(todo[1])
					};
				}))
				.catch(e => console.error(e));
}

function getTodo (key) {
	return AsyncStorage.getItem(key).then(todoObj => JSON.parse(todoObj));
}

function getLatestTodo () {
	return getAllTodo().then(todos => {
		if (Array.isArray(todos) && todos.length > 0) {
			return todos[0];
		} else {
			return null;
		}
	})
}

export {
	saveTodo,
	removeTodo,
	getTodo,
	getAllTodo,
	clearAllTodo,
	getLatestTodo
};