import React from "react"
import {connect} from "react-redux"

const InterpolationPaginationItem = ({interpolation,defaultOnClick}) => {
    return <button  onClick={defaultOnClick}>
        {interpolation.interpolationId}
    </button>
}
//TODO : implement delete interpolation
//TODO : implement move interpolation

export default connect()(InterpolationPaginationItem)
