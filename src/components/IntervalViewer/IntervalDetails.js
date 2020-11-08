import React from "react"
import {connect} from "react-redux"
import {Timeline} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import InterpolationItem from "./InterpolationItem";

const useStyles = makeStyles({
    timeline: {
        transform: "rotate(90deg)"
    },
    timelineContentContainer: {
        textAlign: "left"
    },
    timelineContent: {
        display: "inline-block",
        transform: "rotate(-90deg)",
        textAlign: "center",
        minWidth: 50
    },
    timelineIcon: {
        transform: "rotate(-90deg)"
    }
});



const IntervalDetails = ({interpolations}) => {

    const classes = useStyles()

    return <Timeline className={classes.timeline + " drawer__timeline"}>
        {
            interpolations.map(interpolation => <InterpolationItem {...interpolation}/>)
        }
    </Timeline>
}

const mapStateToProps = ({interpolations},{interpolationIds}) => {


    return {
        interpolations: interpolationIds.map(id => ({id, ...interpolations[id]}))
    }
}

//Add interpolations
const mapDispatchToProps = (dispatch,ownProps) => {

}

export default connect(mapStateToProps,mapDispatchToProps)(IntervalDetails)
