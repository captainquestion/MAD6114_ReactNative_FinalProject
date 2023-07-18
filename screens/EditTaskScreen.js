// screens/EditTaskScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [taskName, setTaskName] = useState(task.taskName);
  const [taskDescription, setTaskDescription] = useState(task.taskDescription);

  const saveChanges = async () => {
    try {
      const updatedTask = {
        ...task,
        taskName,
        taskDescription,
      };
      await AsyncStorage.setItem(`task_${task.taskId}`, JSON.stringify(updatedTask));
      Alert.alert('Task updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to update task!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput label="Task Name" value={taskName} onChangeText={setTaskName} style={styles.input} />
      <TextInput label="Task Description" value={taskDescription} onChangeText={setTaskDescription} style={styles.input} multiline />
      <Button mode="contained" onPress={saveChanges}>Save Changes</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default EditTaskScreen;
