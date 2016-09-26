
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

  default: 
    return state;
  }
}
