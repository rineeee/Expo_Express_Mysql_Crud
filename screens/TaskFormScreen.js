import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet,  TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-web'

import Layout from '../components/Layout'
import {saveTask, getTask, updateTask } from '../api'

const TaskFormScreen = ({navigation, route}) => {

    const [task,setTask] = useState({
        title: "",
        description: "",
    })

    const [editing, setEditing] = useState(false)

    const handleChange = (name, value) => setTask({...task,[name]:value })

    const handleSubmit = async () => {
        try{
            if(!editing){
                await saveTask(task)          
            } else{
                await updateTask(route.params.id, task)
           }
            navigation.navigate('HomeScreen')
        } catch (error){
             console.error(error)
        }
    }

    useEffect(() => {
        if(route.params && route.params.id){
            navigation.setOptions({ headerTitle: 'Updating a Task'})
            setEditing(true),
            
            (async () => {
                const task = await getTask(route.params.id)
                setTask({title: task.title, description: task.description})
            })()
        }
    },[])

    return (
        <Layout>
            <TextInput
            style={styles.input}
                placeholder="Write a Title"
                paceholderTextColor="#546574"
                onChangeText={(text) => handleChange('title',text)}
                value={task.title}
            />
            <TextInput
            style={styles.input}
                placeholder="Write a Description"
                paceholderTextColor="#546574"
                onChangeText={(text) => handleChange('description',text)}
                value={task.description}
            />

            {
                !editing ? (
                    <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save Task</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Update Task</Text>
                     </TouchableOpacity>
                )}
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        marginBottom:7,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#10ac84',
        height: 35,
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 4,
        borderRadius: 5
    },
    buttonSave: { 
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#10ac84',
        width: '90%',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    buttonUpdate: {
        padding: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 3,
        backgroundColor: "#e58e26",
        widith: "90%",
    }
})

export default TaskFormScreen
