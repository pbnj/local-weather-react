import React, { PropTypes, Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      error: props.error,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open, error: nextProps.error });
  }

  handleClose() {
    this.setState({ open: false });
  }
  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.error}
        autoHideDuration={3000}
        onRequestClose={this.handleClose}
      />
    );
  }
}

Error.defaultProps = {
  open: false,
  error: '',
};

Error.propTypes = {
  open: PropTypes.bool,
  error: PropTypes.string,
};
