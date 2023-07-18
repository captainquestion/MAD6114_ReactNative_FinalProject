import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List, Divider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';


const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const fetchTasks = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('loggedUser');
      const keys = await AsyncStorage.getAllKeys();
      const taskKeys = keys.filter((key) => key.startsWith('task_'));
      const taskObjects = await AsyncStorage.multiGet(taskKeys);
      const tasks = taskObjects.map(([key, taskString]) => JSON.parse(taskString)).filter((task) => task.taskCreatorEmail === userEmail || task.taskAssignedUserEmail === userEmail);
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };


  const renderItem = ({ item }) => (
    <List.Item
      title={item.taskName}
      description={item.taskDescription}
      onPress={() => navigation.navigate('TaskDetail', { taskId: item.taskId, userEmail: item.createdBy })}
      right={(props) => <List.Icon {...props} icon={item.isCompleted ? 'check' : 'cancel'} />}
    />
  );

  return (
    <View style={styles.container}>
      <List.Section>
        {tasks.map((task) => (
          <React.Fragment key={task.taskId}>
            <List.Item
              title={task.taskName}
              description={task.completed ? `Completed. Wage: ${task.wage}` : 'Incomplete'}
              onPress={() => navigation.navigate('TaskDetail', { taskId: task.taskId })}
              right={() => <List.Icon icon={task.completed ? 'check' : 'clock'} />}
            />
            <Divider />
          </React.Fragment>
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default TaskListScreen;
