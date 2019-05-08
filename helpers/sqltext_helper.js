
var SqlString = require('sqlstring');

global.sqlInsert = (header, detail) => {
    let pos1 = header.indexOf("(");
    let pos2 = header.indexOf(")");
    let posv = header.toUpperCase().indexOf("VALUES");

    if(pos1 < 1 || pos2 < 1 || posv < 1)
        throw "command is not found";

    let fields = header.slice(pos1 + 1, pos2).replace(/:/g, "");
    let fieldsArray = fields.split(",");
    let title = header.slice(0, pos1);
    let output = insertStringAt(title, "(" + fields + ") ", posv);

    let tmp = [];
    for (i = 0; i < fieldsArray.length; i++) {
        let field = fieldsArray[i].trim();

        if(!isset(detail[field])) // if value is undefined be error
            throw "column count does not match a row value count";

        let value = null;
        if(isnull(detail[field])){
            value = 'null';
        }else{
            value = SqlString.escape(detail[field]);
        }
        
        tmp[i] = value;
    }

    output += "(" + tmp.join() + ")";
    return output;
}

global.sqlUpdate = (header, detail, where) => {
    let pos1 = header.indexOf("(");
    let pos2 = header.indexOf(")");
    let posv = header.toUpperCase().indexOf("SET");

    if(pos1 < 1 || pos2 < 1 || posv < 1)
        throw "command is not found";

    if(!isset(where) || empty(where))
        throw "where is not found";

    let fields = header.slice(pos1 + 1, pos2).replace(/:/g, "");
    let fieldsArray = fields.split(",");
    let title = header.slice(0, pos1);
    // let output = insertStringAt(title, "(" + fields + ") ", posv);
    let output = title;

    let tmp = [];
    for (i = 0; i < fieldsArray.length; i++) {
        let field = fieldsArray[i].trim();

        if(!isset(detail[field])) // if value is undefined be error
            throw "column count does not match a row value count";

        let value = null;
        if(isnull(detail[field])){
            value = 'null';
        }else{
            value = SqlString.escape(detail[field]);
        }
        
        tmp[i] = field + " = " + value;
    }

    output += tmp.join() + " " + where;
    return output;
}


