import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// redux stuff
import { connect } from 'react-redux';
import { getRecipe } from '../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    }
});

class RecipeDialog extends Component {

    state= {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getRecipe(this.props.recipeId);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const { classes, recipe: {recipeId, body, createdAt, likeCount, commentCount, userImage, userHandle},
        UI: { loading } } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={200}/>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} 
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography varaint="body1">
                            {body}
                        </Typography>
                </Grid>
            </Grid>
        );

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand recipe" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName= {classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
                </Dialog>
            </Fragment>
        );
    };
};

RecipeDialog.propTypes = {
    getRecipe: PropTypes.func.isRequired,
    recipeId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    recipe: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    recipe: state.data.recipe,
    UI: state.UI
});

const mapActionsToProps = {
    getRecipe
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(RecipeDialog));