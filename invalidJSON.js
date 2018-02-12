//example usage: console.log(formatInvalidJSON('{\"some": bad json'));

function formatInvalidJSON(value) {
    let tabs = '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
    let arr = [];
    let cursor = 0;
    let depth = 0;
    let structure = '';
    while (true) {
        let open = value.indexOf('{', cursor);
        let close = value.indexOf('}', cursor);
        let comma = value.indexOf(',', cursor);
        let colon = value.indexOf(':', cursor);
        if (open > -1 || close > -1 || comma > -1) {
            let prevStructure = structure;
            let prevCursor = cursor;
            let prevDepth = depth;
            if (open == -1) open = Number.MAX_VALUE;
            if (close == -1) close = Number.MAX_VALUE;
            if (comma == -1) comma = Number.MAX_VALUE;
            if (colon == -1) colon = Number.MAX_VALUE;
            if (open < close && open < comma) {
                cursor = open;
                if (prevStructure == ',\n' && cursor < colon) arr.push(tabs.substr(0, depth));
                depth++;
                structure = '{\n';
            } else if (close < comma) {
                cursor = close;
                depth--;
                structure = '\n' + tabs.substr(0, depth) + '}';
            } else {
                cursor = comma;
                structure = ',\n'; // + tabs.substr(0, depth);
            }
            if (colon < cursor) arr.push(tabs.substr(0, prevDepth));
            arr.push(value.substring(prevCursor, cursor).trim());
            arr.push(structure);
            cursor++;
        } else break;
    }
    return arr.join('');
}
