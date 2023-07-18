// screens/TaskCreateScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskCreateScreen = ({ navigation }) => {
  const [taskId, setTaskId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCost, setTaskCost] = useState('');
  const [taskStartDate, setTaskStartDate] = useState(new Date());
  const [taskEndDate, setTaskEndDate] = useState(new Date());
  const [taskAssignedUserEmail, setTaskAssignedUserEmail] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskStartDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setTaskStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskEndDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setTaskEndDate(currentDate);
  };

  const createTask = async () => {
    try {
      const taskCreatorEmail = await AsyncStorage.getItem('loggedUser');
      const task = {
        taskId,
        taskName,
        taskDescription,
        taskCost: Number(taskCost),
        taskStartDate: taskStartDate.toISOString(),
        taskEndDate: taskEndDate.toISOString(),
        taskAssignedUserEmail,
        taskCreatorEmail,
        completed: false,
      };
      await AsyncStorage.setItem(`task_${taskId}`, JSON.stringify(task));
      Alert.alert('Task created successfully!');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to create task!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput label="Task ID" value={taskId} onChangeText={setTaskId} style={styles.input} />
      <TextInput label="Task Name" value={taskName} onChangeText={setTaskName} style={styles.input} />
      <TextInput label="Task Description" value={taskDescription} onChangeText={setTaskDescription} style={styles.input} />
      <TextInput label="Task Cost" value={taskCost} onChangeText={setTaskCost} style={styles.input} keyboardType="numeric" />
      <TextInput label="Task Start Date" value={taskStartDate.toDateString()} style={styles.input} onTouchStart={() => setShowStartDatePicker(true)} />
      {showStartDatePicker && (
        <DateTimePicker
          value={taskStartDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      <TextInput label="Task End Date" value={taskEndDate.toDateString()} style={styles.input} onTouchStart={() => setShowEndDatePicker(true)} />
      {showEndDatePicker && (
        <DateTimePicker
          value={taskEndDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleEndDateChange}
        />
      )}
      <TextInput label="Task Assigned User Email" value={taskAssignedUserEmail} onChangeText={setTaskAssignedUserEmail} style={styles.input} keyboardType="email-address" />
      <Button mode="contained" onPress={createTask}>
        Create Task
      </Button>
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

export default TaskCreateScreen;
