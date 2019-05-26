import React, {useRef} from 'react'; 
import "./Board.css";

import Colors from "../../../utils/Colors";

function BoardTags(props) {
    let {options = [], setOptions, isWrap = false, placeHolder = "", Component, className, Input} = props;
    
    const inputOptions = useRef();

    function addOption(event){
        let element = event.target;

        if(event.keyCode === 13 && element.value !== ""){
            setOptions({name: element.value, color: Colors.getRamdom()});
            inputOptions.current.value = "";
        }
    }

    return  <div className={`board ${className} --flex ${isWrap? "--wrap": ""}`}>
                {Input && <Input/>}
                {!Input && <input placeholder={placeHolder} onKeyDown={addOption} ref={inputOptions}/>}
                <div className="contOptions">
                    {options.map((option, index) => <Component key={`${index}-${className}`} {...option}/>)}
                </div>
            </div>

}

export default BoardTags;