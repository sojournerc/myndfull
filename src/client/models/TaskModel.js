
import BaseModel from './BaseModel';

import {
  onPropChange,
  postNewTask,
  fetchTasks
} from '../redux/tasks/actions';

import {
  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  REMOVE_TASK,
  REMOVE_TASK_SUCCESS,
  REMOVE_TASK_FAIL,
  TASK_PROP_CHANGE
} from '../constants/action-types';

import { STRING, TEXT } from '../constants/field-types.js';

const FIELDS = {
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

export function create(dat) {
  return new TaskModel(dat);
}

class TaskModel extends BaseModel {
  constructor(args) { super(args); }

  // properties mapped to field types
  static get FIELDS() { return FIELDS; }

  // fetching
  static get GET() { return GET_TASKS; }
  static get GET_SUCCESS() { return GET_TASKS_SUCCESS; }
  static get GET_FAIL() { return GET_TASKS_FAIL; }

  // add
  static get ADD() { return ADD_TASK; }
  static get ADD_SUCCESS() { return ADD_TASK_SUCCESS; }
  static get ADD_FAIL() { return ADD_TASK_FAIL; }

  // updating
  static get UPDATE() { return UPDATE_TASK; }
  static get UPDATE_SUCCESS() { return UPDATE_TASK_SUCCESS; }
  static get UPDATE_FAIL() { return UPDATE_TASK_FAIL; }

  // removal
  static get REMOVE() { return REMOVE_TASK; }
  static get REMOVE_SUCCESS() { return REMOVE_TASK_SUCCESS; }
  static get REMOVE_FAIL() { return REMOVE_TASK_FAIL; }

  // instance prop change
  static get PROP_CHANGE() { return TASK_PROP_CHANGE; }
}

export default TaskModel;
