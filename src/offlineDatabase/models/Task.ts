import {Realm, createRealmContext} from '@realm/react';

export class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description!: string;

  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string',
    },
  };
}

export const RealmContext = createRealmContext({
  schema: [Task],
});

const realm = new Realm({schema: [Task]});

export default realm;
