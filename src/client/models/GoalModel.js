
import BaseModel from './BaseModel';

export function create(dat) {
  return new GoalModel(dat);
}

class GoalModel extends BaseModel {
  constructor(args) {
    super(args);
  }

  static get FIELDS() { 
    return Object.freeze({
      text: ''
    })
  }
  
  static get TYPE() { return 'GOAL'; } 
  
  static get API_PATH() { return 'goals'; }
}

export default GoalModel;
