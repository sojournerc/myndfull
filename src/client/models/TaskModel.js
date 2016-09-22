
import BaseModel from './BaseModel';

import {
  onPropChange,
  postNewTask,
  fetchTasks
} from '../redux/tasks/actions';

import {
  TASK_FORM_CHANGE
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

  static get PROP_CHANGE() { return TASK_FORM_CHANGE; }
  static get FIELDS() { return FIELDS; }
}

export default TaskModel;
