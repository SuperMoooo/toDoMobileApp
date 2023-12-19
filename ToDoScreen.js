import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, React, useEffect } from 'react';
const ToDoScreen = (props) => {
    //Create Task
    const [taskText, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        loadTasksFromStorage();
    }, []);
    //LOAD TASKS
    const loadTasksFromStorage = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks !== null) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Error loading tasks from storage:', error);
        }
    };

    const saveTasksToStorage = async (updatedTasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } catch (error) {
            console.error('Error saving tasks to storage:', error);
        }
    };

    const handleAddTask = () => {
        if (taskText !== null && taskText !== '') {
            const newTask = {
                id: tasks.length + 1,
                text: taskText,
            };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            setTask('');
            saveTasksToStorage(updatedTasks);
        }
    };

    //DELETE TASK

    const handleTaskDone = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);

        setTasks(updatedTasks);
        saveTasksToStorage(updatedTasks);
    };
    return (
        <View style={styles.body}>
            <View style={styles.titleSpace}>
                <Text style={styles.title}>Tarefas</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                {tasks.map((task) => {
                    return (
                        <View style={styles.bodyTasks}>
                            <View style={styles.bgTasks}>
                                <Text style={styles.taskText}>{task.text}</Text>
                                <TouchableOpacity
                                    key={task.id}
                                    style={styles.doneTask}
                                    onPress={() => {
                                        handleTaskDone(task.id);
                                    }}
                                >
                                    <Image
                                        style={styles.imgDoneTask}
                                        source={require('./assets/doneTaskImg.png')}
                                    ></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.inputSpace}>
                <TextInput
                    value={taskText}
                    placeholder="Tarefa..."
                    style={styles.taskInput}
                    onChangeText={setTask}
                ></TextInput>
                <TouchableOpacity
                    style={styles.addTaskBtn}
                    onPress={handleAddTask}
                >
                    <Image
                        style={styles.addTaskImg}
                        source={require('./assets/plusTaskImg.png')}
                    ></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#E0CEF8',
        height: '100%',
    },
    titleSpace: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? 10 : 0,
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 48,
        color: '#AB75B4',
        textShadowColor: '#AB75B4',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 3,
    },
    scrollView: {
        height: '100%',
    },
    inputSpace: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: '#E0CEF8',
    },

    addTaskBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        alignSelf: 'flex-end',
        width: 75,
        height: 75,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 50,
        marginBottom: 25,
        marginRight: 15,
        color: '#AB75B4',
        fontSize: 25,
    },
    addTaskImg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    taskInput: {
        alignSelf: 'flex-start',
        width: '65%',
        marginTop: 30,
        marginLeft: 20,
        color: '#AB75B4',
        fontSize: 25,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: '#AB75B4',
        borderWidth: 4,
        borderRadius: 2,
        paddingBottom: 2,
    },
    bodyTasks: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },

    bgTasks: {
        display: 'flex',
        alignContent: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#EFDAFF',
        width: '93%',
        height: 88,
        shadowColor: '#AB75B4',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.8,
        shadowRadius: 16,
        elevation: 44,
    },
    doneTask: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'relative',
        width: 55,
        height: 55,
        borderColor: '#D9BFED',
        backgroundColor: '#D9BFED',
        borderWidth: 2,
        borderRadius: 50,
        zIndex: 2,
        marginRight: 15,
    },
    imgDoneTask: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    taskText: {
        alignSelf: 'center',
        fontSize: 18,
        marginLeft: 15,
        color: '#AB75B4',
        paddingRight: 15,
    },
});

export default ToDoScreen;
