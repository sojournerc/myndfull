
import Models from '../../models';

const initialState = {};
const initiateApiState = ((Classes) => {
  for (const TYPE in Classes) {
    if (Classes.hasOwnProperty(TYPE)) {
      initialState[TYPE] = Object.freeze(
        // Initial state for each api item
        {
          items: [],
          workingItem: new Classes[TYPE](),
          isFetcing: false,
          isSaving: false
        }
      );
    }
  }
})(Models)

Object.freeze(initialState);

export default function api(state = initialState, { action, type, payload }) {
  switch (action) {
  case GET:
    break; 
  case GET_FAIL:
    break;
  case GET_SUCCESS:
    break;
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
  default: 
    return state;
  }
}
