import React from "react"
import {TimelineSeparator,TimelineConnector} from "@material-ui/lab"
import {connect} from "react-redux"

const InterpolationItem = ({id}) => {
    return <TimelineSeparator>
        {id}
        <TimelineConnector />
    </TimelineSeparator>
}
//TODO : implement delete interpolation
//TODO : implement move interpolation

export default connect()(InterpolationItem)
