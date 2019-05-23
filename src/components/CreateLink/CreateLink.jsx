import React from 'react';
import "./CreateLink.css"
import Colors from "../../utils/Colors";

class CreateLink  extends React.Component{
    
    removeInvalid(event){
        event.target.classList.remove("invalid");
    }

    check = () => {
        if(this.title.value == ""){
            this.title.classList.add("invalid")
        }

        if(this.url.value == ""){
            this.url.classList.add("invalid");
        }
        
    }

    render(){
        console.log(Colors.getRamdom());
        const {style = {}} = this.props
        
        return  <div className="createLink">
                    <input placeholder="Title" onFocus={this.removeInvalid} ref={div => this.title = div}/>
                    <input placeholder="Url" onFocus={this.removeInvalid} ref={div => this.url = div}/>
                    <div className="createLink__contTags">
                        <input placeholder="Tags"/>
                    </div>
                    <button type="button" onClick={this.check}>Send</button>
                </div>
    }
}

export default CreateLink ;