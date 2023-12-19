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
import ToDoScreen from './ToDoScreen';
import { React } from 'react';

export default function App() {
    return (
        <SafeAreaView>
            <ToDoScreen></ToDoScreen>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
