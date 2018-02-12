//Run from the console in your browser on the graphQL query page.
//example usage: initQLPrettifier();

function initQLPrettifier() {
    let strings = document.getElementsByClassName('result-window')[0].getElementsByClassName('cm-string');
    setInterval(function() {
        for (let key in strings) {
            if (strings.hasOwnProperty(key)) {
                let el = strings[key];
                if (!el.hasAttribute('qlpretty-parsed')) {
                    el.setAttribute('qlpretty-parsed', 'true');
                    el.style.whiteSpace = 'pre-wrap';
                    var msg = el.innerText.split(/(has invalid value|}.\\n)/g);
                    for (let i = 0; i < msg.length; i++) {
                        switch (msg[i].substr(0, 2)) {
                            case ' {':
                                msg[i] = '\n' + formatInvalidJSON(msg[i] + '}');
                                break;
                            case '}.':
                                msg[i] = msg[i].substr(2).replace(/\\n/g, '\n\n');
                                break;
                            case 'In':
                                msg[i] = msg[i].replace(/\\n/g, '\n\n');
                                break;
                        }
                        el.innerText = msg.join('');
                    }
                }
            }
        }
    }, 200);
}