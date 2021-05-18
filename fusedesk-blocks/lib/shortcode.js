
//converts attribute values which aren't compound data into strings
//ex: if value is array ['op1','op2','op2'] =>  "op1, op2, op3"
//ex: if value is array of objects [{val:'hel'},{val:'lo'}] => "hel, lo"
//ex: if value is int 32 => 32
//ex: if value is string "helloworld" => "helloworld"
function convertCompounDataToStr(objType, data) {

    switch (objType) {
        case 'formTokenField':
            return data.map(token => token.id).join();
        default:
            //return the data if nots compound type
            return data;
    }

}

function createShortCodeAttFromObj(obj, attributes) {
    let attName = obj.bind;
    let attval = attributes[attName];
    let val = convertCompounDataToStr(obj.type, attval);
    //check that the value isn't false or empty
    return (!!val && val !== '') ? `${attName}="${val}" ` : '';
}

function createShortCodeAttFromGroup(group, controlsData, attributes) {
    let objs = Object.entries(controlsData[group]).map(([name, obj]) => obj);
    let shortcodeAtts = objs.map(obj => createShortCodeAttFromObj(obj, attributes));
    let str = shortcodeAtts.join(' ');
    return str;
}

export {createShortCodeAttFromGroup};