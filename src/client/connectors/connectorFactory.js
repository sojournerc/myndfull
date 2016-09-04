
import { connect } from 'react-redux';

export default function create(Component, mapStateToProps, mapDispatchToProps) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
}
