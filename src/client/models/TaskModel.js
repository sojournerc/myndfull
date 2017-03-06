
import BaseModel from './BaseModel';
import GoalModel from './GoalModel';

import { STRING, TEXT, SELECT } from '../constants/field-types';

class TaskModel extends BaseModel {

  // properties mapped to field types
  static get FIELDS() {
    return Object.freeze({
      goalId: Object.freeze({
        required: true,
        type: SELECT,
        foreign: GoalModel,
        default: ''
      }),
      text: Object.freeze({
        required: true,
        type: STRING,
        default: ''
      }),
      notes: Object.freeze({
        type: TEXT,
        default: ''
      })
    });
  }

  static get TYPE() { return 'TASK'; }
  static get API_PATH() { return 'tasks'; }

}

export function create(dat) {
  return new TaskModel(dat);
}

export default TaskModel;
