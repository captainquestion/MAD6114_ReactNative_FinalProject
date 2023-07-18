// screens/TaskDetailScreen.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Text } from 'react-native-paper';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [hoursWorked, setHoursWorked] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetchTask();
    fetchLoggedInUser();
  }, []);

  const fetchLoggedInUser = async () => {
    const loggedInUser = await AsyncStorage.getItem('loggedUser');
    setLoggedInUser(loggedInUser);
  };

  const fetchTask = async () => {
    const taskString = await AsyncStorage.getItem(`task_${taskId}`);
    const task = JSON.parse(taskString);
    setTask(task);
  };

  const markAsComplete = async () => {
    try {
      const wage = task.taskCost * hoursWorked;
      const updatedTask = {
        ...task,
        completed: true,
        wage,
        taskCompletionDate: new Date(),
      };
      await AsyncStorage.setItem(`task_${taskId}`, JSON.stringify(updatedTask));
      setTask(updatedTask);
      Alert.alert('Task marked as complete!', `Your wage: ${wage}`);
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to mark task as complete!');
    }
  };

  const editTask = async () => {
    if (loggedInUser !== task.taskCreatorEmail) {
      Alert.alert('Only the creator of the task can edit it');
      return;
    }

    // Here, you can navigate to a new screen (e.g., 'EditTaskScreen') and pass the task to it
    navigation.navigate('EditTaskScreen', { task });
  };

  const deleteTask = async () => {
    if (loggedInUser !== task.taskCreatorEmail) {
      Alert.alert('Only the creator of the task can delete it');
      return;
    }

    // Delete the task from the AsyncStorage
    await AsyncStorage.removeItem(`task_${taskId}`);
    Alert.alert('Task deleted successfully');
    navigation.goBack();
  };

  if (!task) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <Text style={styles.label}>Task ID: {task.taskId}</Text>
      <Text style={styles.label}>Task Name: {task.taskName}</Text>
      <Text style={styles.label}>Task Description: {task.taskDescription}</Text>
      <Text style={styles.label}>Task Cost: {task.taskCost}</Text>
      <Text style={styles.label}>Task Start Date: {new Date(task.taskStartDate).toDateString()}</Text>
      <Text style={styles.label}>Task End Date: {new Date(task.taskEndDate).toDateString()}</Text>
      <Text style={styles.label}>Task Assigned User Email: {task.taskAssignedUserEmail}</Text>
      <Text style={styles.label}>Task Creator Email: {task.taskCreatorEmail}</Text>
      <Text style={styles.label}>Completed: {task.completed ? 'Yes' : 'No'}</Text>
      {task.completed && <Text style={styles.label}>Completion Date: {new Date(task.taskCompletionDate).toDateString()}</Text>}
      {task.completed && <Text style={styles.label}>Wage: {task.wage}</Text>}
      {!task.completed && <TextInput label="Hours Worked" value={hoursWorked} onChangeText={setHoursWorked} style={styles.input} keyboardType="numeric" />}
      {!task.completed && <Button mode="contained" onPress={markAsComplete}>Mark as Complete</Button>}
      {task.completed && <Button mode="contained" disabled={true}>Completed</Button>}
      <Button mode="contained" onPress={editTask} disabled={loggedInUser !== task.taskCreatorEmail}>
        Edit Task
      </Button>
      <Button mode="contained" onPress={deleteTask} disabled={loggedInUser !== task.taskCreatorEmail}>
        Delete Task
      </Button>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    marginBottom: 16,
  },
});

export default TaskDetailScreen;
