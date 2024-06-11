import Realm from 'realm';
import { Task } from './models/Task';

const realm = new Realm({schema: [Task]});

export default realm;