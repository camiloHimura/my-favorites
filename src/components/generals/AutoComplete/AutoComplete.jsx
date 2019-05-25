import React, {useRef, useReducer, useEffect} from 'react';
import "./AutoComplete.css"
import AutoReduce from "./AutoComplete.reducer.js"

function AutoComplete (props){
    const divOptions = useRef();
    const inputFilter = useRef();
    let [state, setOptions] = useReducer(AutoReduce, {showOptions: false, filterFocus: false});
    
    const {options, showOptions, indexSelector} = state;
    const {options: initOptions = [], propertyFilter, onSelected, autoHide = true, 
            placeHolder = "", clearAfterSelecting = false} = props;
    
    useEffect(() => {
        setOptions({type: "set", initOptions: [...initOptions]});
    }, [initOptions]);

    function filter(event){
        let element = event.target;

        if(element.value !== "" && element.value.length > 1){
            setOptions({type: "filter", initOptions, propertyFilter, value: element.value})
        }else{
            setOptions({type: "clear"})
        }
    }

    function sweepOptions(event){
        if(showOptions == false){return}

        if(event.keyCode === 38){
            event.preventDefault();
            setOptions({type: "sweepUp"});
        }
        
        if(event.keyCode === 40){
            event.preventDefault();
            setOptions({type: "sweepDown"});
        }

        if(event.keyCode === 13){
            setOptions({type: "clear"});
            onSelected(options[indexSelector]);

            if(!clearAfterSelecting){
                inputFilter.current.value = options[indexSelector][propertyFilter];
            }else{
                inputFilter.current.value = "";
            }
        }
    }
    
    function clickOption(event){
        let index = Number(event.target.dataset.index);
        
        onSelected(options[index]);
        setOptions({type: "clear"});
        
        if(!clearAfterSelecting){
            inputFilter.current.value = options[index][propertyFilter];
        }else{
            inputFilter.current.value = "";
            inputFilter.current.focus();
        }
    }

    function closeOptions(){
        if(autoHide){
            setOptions({type: "clear"});
        }
    }

    return  <div className="autoComplete">
                <input type="text" autoFocus={true} ref={inputFilter} onChange={filter} onKeyDown={sweepOptions} onBlur={closeOptions} placeholder={placeHolder}/>
                <div className="autoComplete__contOptions" ref={divOptions}>
                    {showOptions && options.map((opt, index) => {
                                        return <div key={`${index}-autocomplete`} className={`${indexSelector === index ? "select": ""}`} 
                                                    onMouseDown={clickOption} data-index={index}>
                                                    {opt.name}
                                                </div>})}
                </div>
            </div>
}

export default AutoComplete;
