// screens/Dashboard.js

import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedUser');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Button title="Create Task" onPress={() => navigation.navigate('CreateTask')} />
      <Button title="View Tasks" onPress={() => navigation.navigate('TaskList')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default Dashboard;
