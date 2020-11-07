import React from "react"
import {connect} from "react-redux"
import {REMOVE_OBJECT, SELECT_OBJECT} from "../../../../actions";
import {Fab} from "@material-ui/core"

const Button = ({xmin,ymin,xmax,ymax,color,selectObject,removeObject,id,}) => {

    return <Fab onClick={selectObject} onContextMenu={removeObject}>
        {id}
    </Fab>
}

const mapDispatchToProps = (dispatch,{id}) => ({
    selectObject : () => dispatch({
        type:SELECT_OBJECT,
        payload:id
    }),
    removeObject : () => dispatch({
        type: REMOVE_OBJECT,
        payload:id
    })

})


export default connect(null,mapDispatchToProps)(Button)
