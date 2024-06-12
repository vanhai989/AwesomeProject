import realm, {Note} from './realm';
import Realm from 'realm'

export const addNote = (note: Note) => {
  realm.write(() => {
    realm.create('Note', note);
  });
};

export const updateNote = (note: Note) => {
  realm.write(() => {
    realm.create('Note', note, Realm.UpdateMode.Modified);
  });
};

export const deleteNote = (id: string) => {
  realm.write(() => {
    const note = realm.objectForPrimaryKey<Note>('Note', id);
    if (note) {
      realm.delete(note);
    }
  });
};

export const getNotes = (): Note[] => {
  return realm.objects<Note | unknown | any>('Note').toJSON() as any[];
};
