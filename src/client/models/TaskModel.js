
import BaseModel from './BaseModel';

import { STRING, TEXT } from '../constants/field-types';

export function create(dat) {
  return new TaskModel(dat);
}

class TaskModel extends BaseModel {
  
  constructor(args) { super(args); }

  // properties mapped to field types
  static get FIELDS() { 
    return Object.freeze({
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

export default TaskModel;
