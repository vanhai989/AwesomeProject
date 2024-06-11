
import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput } from 'react-native';

import { RealmContext, Task } from './models/Task';
import { BSON } from 'realm';

const { useQuery, useRealm } = RealmContext;

function App() {
  const realm = useRealm();
  const tasks = useQuery(Task);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm]);

  const deleteTask = (task) => {
    realm.write(() => {
      realm.delete(task);
    });
  }

  const createTask = () => {
    realm.write(() => {
      realm.create('Task', {
        _id: new BSON.ObjectId(),
        title: title,
        description: description,
      });
    });
  }

  const updateTask = () => {
    const item = realm.objectForPrimaryKey('Task', selectedTask._id)
    if (item) {
      realm.write(() => {
        item.title = title;
        item.description = description;
      });
    }
  }

  const handleSave = () => {
    if (selectedTask) {
      updateTask()
    } else {
      createTask()
    }

    setTitle('');
    setDescription('');
    setSelectedTask(null);
  };

  const selectTask = (task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => selectTask(item)} style={styles.wrapperItem}>
          <Text style={styles.text} numberOfLines={5}>Title: {item.title}</Text>
          <Text style={styles.text} numberOfLines={5}>Description: {item.description}</Text>
        </TouchableOpacity>
        <Button title="Delete" onPress={() => deleteTask(item)} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTextInput}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  wrapperItem: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    lineHeight: 22
  },
  wrapperTextInput: {
    marginTop: 20,
    marginBottom: 50
  },
  input: {
    borderBottomWidth: 0.5,
    marginBottom: 8,
    padding:5
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    flexWrap: 'wrap'
  },
});
