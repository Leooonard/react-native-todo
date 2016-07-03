import {
	AsyncStorage
} from 'react-native';

function makeUniqueHash () {
	return Date.now().toString();
}

function saveTodo (todoContent) {
	let uniqueHash = makeUniqueHash();

	return AsyncStorage.setItem(uniqueHash, todoContent)
							.then(() => {
								return {
									key: uniqueHash,
									content: todoContent
								}
							});
}

function removeTodo (key) {
	return AsyncStorage.removeItem(key);
}

function getAllTodo () {
	return AsyncStorage.getAllKeys()
				.then(keys => AsyncStorage.multiGet(keys))
				.then(todos => todos.map(todo => {
					return {
						key: todo[0],
						content: todo[1]
					};
				}))
				.catch(e => console.error(e));
}

function getTodo (key) {
	return AsyncStorage.getItem(key);
}

export {
	saveTodo,
	removeTodo,
	getAllTodo
};