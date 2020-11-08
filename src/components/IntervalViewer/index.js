import React from "react"
import Drawer from '@material-ui/core/Drawer';
import {connect} from "react-redux"
import {closeDrawer} from "../../actions";
import IntervalDetails from "./IntervalDetails"
import AddInterval from "./AddInterval";
import CloseDrawer  from "./CloseDrawer"


const IntervalViewer = ({annotationId,open,intervalList}) => {

    if(!open) return null
    else return <Drawer
            variant={"persistent"}
            anchor={"bottom"}
            open={true}>
        <div className={"drawer"}>
            <CloseDrawer/>
            <div className={"interval-viewer"}>
            {
                intervalList.map(interval => {
                    return <IntervalDetails key={interval.intervalId} interpolationIds={interval.interpolations} intervalId={interval.intervalId}/>
                })

            }
            </div>
            <AddInterval annotationId={annotationId}/>
        </div>

    </Drawer>
}

const mapStateToProps = ({drawer,videoAnnotations,intervals}) => {

    const annotationId = drawer

    if(drawer === null)return {open : false}
    else{
        return {
            annotationId,
            intervalList:videoAnnotations[annotationId].intervals.map(intervalId => ({intervalId,...intervals[intervalId]})),
            open:true
        }

    }
}

export default connect(mapStateToProps)(IntervalViewer)
