import React from "react"
import {usePagination} from "@material-ui/lab";
import InterpolationPaginationItem from "./InterpolationPaginationItem";

const InterpolationPagination = ({interpolationList,intervalId}) => {

    const {items} = usePagination({
        count:interpolationList.length,
        showFirstButton:true,
        showLastButton:true
    })


    return <div className={"interpolation-viewer"}>
        {
            items.map(({page,type,onClick,...item},index) => {

                let children

                switch(type){
                    case "start-ellipsis":
                    case "end-ellipsis":
                        children = "......."
                        break
                    case "page":
                        children = <InterpolationPaginationItem {...item} interpolation={interpolationList[page-1]} defaultOnClick={onclick}/>
                        break
                    default:
                        children = <button{...item} onClick={onClick}>{type}</button>
                        break
                }

                return <li className={"interpolation-viewer__element"} key={index}>{children}</li>
            })
        }
    </div>
}


export default InterpolationPagination
