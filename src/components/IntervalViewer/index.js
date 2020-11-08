import React from "react"
import Drawer from '@material-ui/core/Drawer';
import {connect} from "react-redux"
import {CLOSE_DRAWER} from "../../actions/video";
import IntervalDetails from "./IntervalDetails"
import AddInterval from "./AddInterval";
import CloseDrawer  from "./CloseDrawer"


const IntervalViewer = ({open,intervals,closeDrawer}) => {

    if(!open) return null
    else return <Drawer
            variant={"persistent"}
            anchor={"bottom"}
            onClick={closeDrawer}
            open={true}>
        <div className={"drawer"}>
            <CloseDrawer/>
            <div className={"interval-viewer"}>
            {
                intervals.map(interval => {
                    return <IntervalDetails key={interval.id} interpolationIds={interval.interpolations} id={interval.id}/>
                })

            }
            </div>
            <AddInterval/>
        </div>

    </Drawer>
}

const mapStateToProps = ({drawer,videoAnnotations,intervals}) => {
    if(drawer === null)return {open : false}
    else{
        return {
            intervals:videoAnnotations[drawer].intervals.map(id => ({id,...intervals[id]})),
            open:true
        }

    }
}

const mapDispatchToProps = (dispatch) => ({
    closeDrawer: () => dispatch({type:CLOSE_DRAWER})
})

export default connect(mapStateToProps)(IntervalViewer)
