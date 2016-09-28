
import GoalModel from './GoalModel';
import TaskModel from './TaskModel';
import EntryModel from './EntryModel';

export const TYPE_LIST = [];
const Models = {};
const register = ((Class) => {
  if (!Class.TYPE) { throw new Error('Model Class must have a TYPE getter.') }
  if (!Class.API_PATH) { throw new Error('Model Class must have a API_PATH getter.') }
  TYPE_LIST.push(Class.TYPE);
  Models[Class.TYPE] = Class;
}); 

[
  GoalModel,
  TaskModel,
  EntryModel
].forEach(register);

export default Object.freeze(Models);  
