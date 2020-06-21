import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import {
  count,
  randomNumber,
} from '../selectors';
import {
  increaseCount,
  decreaseCount,
  resetCount,
  updateRandom,
} from '../actions';
import { Example } from '../components/Example';

const mapStateToProps = state => ({
  count: count(state),
  randomNumber: randomNumber(state),
});

const mapDispatchToProps = {
  updateRandom,
  increaseCount,
  decreaseCount,
  resetCount,
};

const methods = {
  componentWillUpdate(prevProps, props) {
    if (props.count !== prevProps.count) {
      props.updateRandom(); // a basic example of how to use lifecycle methods
    }
  },
};

const container = connect(mapStateToProps, mapDispatchToProps)(
  lifecycle(methods)(Example),
);

export { container as Example };
