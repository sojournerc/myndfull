
import BaseModel from './BaseModel';

import { TEXT } from '../constants/field-types';

export function create(dat) {
  return new EntryModel(dat);
}

class EntryModel extends BaseModel {
  
  constructor(args) { super(args); }

  // properties mapped to field types
  static get FIELDS() { 
    return {
      text: Object.freeze({
        required: true,
        type: TEXT,
        default: ''
      })
    }; 
  }

  static get TYPE() { return 'ENTRY'; } 
  static get API_PATH() { return 'entries'; }

}

export default EntryModel;
