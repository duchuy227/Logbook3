import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import axios from 'axios';
export default function App({ navigation }) {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
  const editTask = (_id, name) => {
    setTaskName(name);
    setId(_id);
    setEdit(true);
  };
  const getTask = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/getall');
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTask();
  }, []);
  // Add Task or Update Existing Task
  const addOrUpdateTask = async () => {
    if (taskName.trim() === '') {
      Alert.alert('Task name cannot be empty!!');
      return;
    }

    if (edit === false) {
      console.log("okok")
      const res = await axios.post('http://10.0.2.2:3000/add', { name: taskName });
      if (res.data.mess) {
        Alert.alert(res.data.mess)
      }
      getTask();
      setTaskName('');

    }
    if (edit === true) {
      console.log(id)
      const _id = id;
      const res = await axios.post('http://10.0.2.2:3000/edit', { _id, newName: taskName });
      if (res.data.mess) {
        Alert.alert(res.data.mess)
      }
      getTask();
      setEdit(false);

    }
    setTaskName('');
  };

  const deleteTask = async (_id) => {
    setId(_id)
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {

            const res = await axios.post('http://10.0.2.2:3000/delete', { _id: id });
            if (res.data.mess) {
              Alert.alert(res.data.mess)
            }
            getTask();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={taskName}
        onChangeText={(name) => setTaskName(name)}
      />


      <Button
        title={edit !== false ? 'Update Task' : 'Add Task'}
        onPress={addOrUpdateTask}
      />

      <ScrollView>
        {tasks.map((tasks) => (
          <View key={tasks._id} style={styles.listItem}>

            <Text style={styles.listItemText}>{tasks.name}</Text>
            <View style={styles.buttons}>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editTask(tasks._id, tasks.name)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(tasks._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

        ))}

      </ScrollView>
      {/* )}
        keyExtractor={(item, index) => index.toString()}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});