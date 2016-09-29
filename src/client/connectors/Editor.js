
import create from './connectorFactory';
import Form from '../components/core/Form';

import TaskModel from '../models/TaskModel';

const mapStateToProps = (state, props) => ({
  workingItem: state.api[props.ItemClass.API_PATH].workingItem,
  ItemClass: props.ItemClass
});

export default create(Form, mapStateToProps, () => ({}));
