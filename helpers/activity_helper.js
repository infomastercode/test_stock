global.isset = (data) => {
    if (typeof data === 'undefined') {
        return false;
    }
    return true;
}

global.validateEmail = (email) => {
    /* true is email , false is not email */
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

global.isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

global.empty = (str) => {
    return !(typeof str === 'string' && str.length > 0)
}

global.isnull = (str) => {
    return typeof str === 'object' && str === null;
}

global.getdatetime = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

global.insertStringAt = (subject, replace, position) => {
    return subject.substr(0, position) + replace + subject.substr(position);
}

// global.sqlInsert = (header, detail) => {
//     let pos1 = header.indexOf("(");
//     let pos2 = header.indexOf(")");
//     let posv = header.toUpperCase().indexOf("VALUES");

//     if(pos1 < 1 || pos2 < 1 || posv < 1)
//         throw "command is not found";

//     let fields = header.slice(pos1 + 1, pos2).replace(/:/g, "");
//     let fieldsArray = fields.split(",");
//     let title = header.slice(0, pos1);
//     let output = insertStringAt(title, "(" + fields + ") ", posv);

//     let tmp = [];
//     for (i = 0; i < fieldsArray.length; i++) {
//         let field = fieldsArray[i].trim();

//         if(!isset(detail[field]))
//             throw "column count does not match a row value count";
        
//         let value = detail[field];
//         // if value is undefined be error
//         tmp[i] = "\'" + value + "\'";
//     }

//     output += "(" + tmp.join() + ")";
//     return output;
// }