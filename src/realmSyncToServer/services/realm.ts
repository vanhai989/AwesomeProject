import Realm from 'realm';

class Note extends Realm.Object<Note> {
  _id!: string;
  title!: string;
  content!: string;
  updatedAt!: Date;

  static schema = {
    name: 'Note',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      title: 'string',
      content: 'string',
      updatedAt: 'date',
    },
  };
}

const realm = new Realm({schema: [Note]});

export default realm;
export {Note};
