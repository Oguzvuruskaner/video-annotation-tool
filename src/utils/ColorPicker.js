import ColorScheme from "color-scheme";
import {choice, hexToRGB} from "./index";

class ColorPicker{
    constructor(colorList = null) {
        this.colors = colorList || new ColorScheme().from_hue(21).scheme("triade").variation("soft").colors()
    }

    getColor(){
        const color = choice(this.colors)
        return hexToRGB(color)
    }

}

export default ColorPicker
