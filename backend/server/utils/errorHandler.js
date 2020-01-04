const getInfo = errmsg => ({
    colummn() {
        let end = errmsg.indexOf("index: ");
        let namePlusUnderscore = errmsg.slice(end).split(" ")[1];
    
        return namePlusUnderscore.slice(0, namePlusUnderscore.lastIndexOf("_"))
    }

}) 

module.exports = (error, res) => {
    console.log("------ ErrorHAndle catch ------");
    console.log(error.message);
    console.log(error.errmsg);

    let errorInfo = getInfo(error.errmsg);
    let info = "";
    if(error.name === 'MongoError' && error.code === 11000){
        info = `There is a duplicate key error: ${errorInfo.colummn()}`;
        return res.status(500).send({error: true, messaje: info}).end()
    }
    res.status(404).send({error: true, messaje: error.message}).end()

}