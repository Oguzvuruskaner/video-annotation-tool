import React from "react"
import {connect} from "react-redux"
import AddInterpolation from "./AddInterpolation";
import InterpolationPagination from "./InterpolationPagination";


const IntervalDetails = ({intervalId,interpolationList}) => {

    return <div className={"interval-viewer__interval"}>
        <AddInterpolation intervalId={intervalId}/>
        <InterpolationPagination interpolationList={interpolationList} intervalId={intervalId} />
    </div>

}

const mapStateToProps = ({interpolations},{interpolationIds}) => ({
        interpolationList: interpolationIds.map(interpolationId => ({interpolationId, ...interpolations[interpolationId]}))
})


export default connect(mapStateToProps)(IntervalDetails)
