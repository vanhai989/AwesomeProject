import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
} from './services/noteService';
import { Note } from './services/realm';
import NetInfo from '@react-native-community/netinfo';
import { handleConnectivityChange } from './services/networkStatus';


const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    setNotes(getNotes());
    NetInfo.addEventListener(handleConnectivityChange);
  }, []);

  const handleSave = () => {
    if (selectedNote) {
      const noteUpdate = {
        _id: selectedNote._id,
        title,
        content,
        updatedAt: new Date(),
      } as Note
      updateNote(noteUpdate);
    } else {
      const newNote = {
        _id: new Date().getTime().toString(),
        title,
        content,
        updatedAt: new Date(),
      } as Note
      addNote(newNote);
    }
    setNotes(getNotes());
    setTitle('');
    setContent('');
    setSelectedNote(null);
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    setNotes(getNotes());
  };

  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const _renderItem = ({ item }: {item: Note}) => (
    <View style={[styles.wrapper, styles.boxWithShadow]}>
      <TouchableOpacity onPress={() => selectNote(item)} style={styles.wrapperItem}>
        <Text style={styles.contentText}>{item.title}</Text>
        <Text style={styles.contentText}>{item.content}</Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={() => handleDelete(item._id)} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperInput}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          style={styles.input}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
      <FlatList
        data={notes}
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
  wrapperInput: {
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 8,
    padding: 10,
    fontSize: 16,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    flex: 1
  },
  boxWithShadow: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -0.3,
    },
    shadowOpacity: 0.13,
    shadowRadius: 1.5,
    elevation: 1.5,
  },
  wrapperItem: {
    flex: 1
  },
  contentText: {
    fontSize: 15,

  }
});
