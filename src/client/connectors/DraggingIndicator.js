
import create from './connectorFactory';
import Dragging from '../components/core/Dragging'

const mapStateToProps = state => state.dnd;

const mapDispatchToProps = () => ({})

export default create(Dragging, mapStateToProps, mapDispatchToProps);
