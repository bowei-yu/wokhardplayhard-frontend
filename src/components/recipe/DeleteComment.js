import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'relative',
        left: '90%'
    }
};

class DeleteComment extends Component {
   
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    deleteComment = () => {
        this.props.deleteComment(this.props.recipeId, this.props.commentId);
        this.setState({ open: false });
    }

    render() {

        const { classes } = this.props;

        return (
            <Fragment> 
                <MyButton tip="Delete comment"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>
                            Are you sure you want to delete this comment?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.deleteComment} color="secondary">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        );
    };
};

DeleteComment.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    commentId: PropTypes.string,
    recipeId: PropTypes.string.isRequired
};

export default connect(null, { deleteComment })(withStyles(styles)(DeleteComment));