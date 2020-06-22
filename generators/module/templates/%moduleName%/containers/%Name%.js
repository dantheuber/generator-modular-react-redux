import { connect } from 'react-redux';
import {
  show,
} from '../selectors';
import {
  toggleShow,
} from '../actions';
import { <%= camelName %> } from '../components/<%= camelName %>';

const mapStateToProps = state => ({
  show: show(state),
});

const mapDispatchToProps = {
  toggleShow,
};

const container = connect(mapStateToProps, mapDispatchToProps)(<%= camelName %>);

export { container as <%= camelName %> };
