
import BaseModel from './BaseModel';

import { TASK } from  '../constants/item-types';

import { STRING, TEXT } from '../constants/field-types';

export function create(dat) {
  return new TaskModel(dat);
}

class TaskModel extends BaseModel {
  constructor(args) { super(args); }

  // properties mapped to field types
  static get FIELDS() { 
    return {
      text: Object.freeze({
        required: true,
        type: STRING,
        default: ''
      }),
      notes: Object.freeze({
        type: TEXT,
        default: ''
      })
    }; 
  }

  static get TYPE() { return 'TASK'; } 

  static get API_PATH() { return 'tasks'; }

  // // fetching
  // static get GET() { return GET_TASKS; }
  // static get GET_SUCCESS() { return GET_TASKS_SUCCESS; }
  // static get GET_FAIL() { return GET_TASKS_FAIL; }

  // // add
  // static get ADD() { return ADD_TASK; }
  // static get ADD_SUCCESS() { return ADD_TASK_SUCCESS; }
  // static get ADD_FAIL() { return ADD_TASK_FAIL; }

  // // updating
  // static get UPDATE() { return UPDATE_TASK; }
  // static get UPDATE_SUCCESS() { return UPDATE_TASK_SUCCESS; }
  // static get UPDATE_FAIL() { return UPDATE_TASK_FAIL; }

  // // removal
  // static get REMOVE() { return REMOVE_TASK; }
  // static get REMOVE_SUCCESS() { return REMOVE_TASK_SUCCESS; }
  // static get REMOVE_FAIL() { return REMOVE_TASK_FAIL; }

  // // instance prop change
  // static get PROP_CHANGE() { return TASK_PROP_CHANGE; }
}

export default TaskModel;
