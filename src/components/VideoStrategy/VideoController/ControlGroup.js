import React from "react"
import PlayPause from "./PlayPause"
import TimeControls from "./TimeControls"
import {ButtonGroup} from "@material-ui/core";

// <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
//     <Button>One</Button>
// <Button>Two</Button>
// <Button>Three</Button>
// </ButtonGroup>

export default () => {
    return <div  className={"video-controller__control-group"}>
        <PlayPause/>
        <TimeControls/>
    </div>
}

