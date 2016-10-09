
import BaseModel from './BaseModel';

import { STRING } from '../constants/field-types';

export function create(dat) {
  return new GoalModel(dat);
}

class GoalModel extends BaseModel {
  constructor(args) {
    super(args);
  }

  static get FIELDS() { 
    return Object.freeze({
      text: Object.freeze({
        required: true,
        type: STRING,
        default: ''
      })
    })
  }
  
  static get TYPE() { return 'GOAL'; } 
  static get API_PATH() { return 'goals'; }
}

export default GoalModel;
