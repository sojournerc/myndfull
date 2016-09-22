
import BaseModel from './BaseModel';

const FIELDS =  Object.freeze({
  text: ''
});

export function create(dat) {
  return new GoalModel(dat);
}

class GoalModel extends BaseModel {
  constructor(args) {
    super(args);
  }

  static get FIELDS() { return FIELDS }
}

export default GoalModel;
