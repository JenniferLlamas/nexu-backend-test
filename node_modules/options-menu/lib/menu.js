var stdin = process.stdin;
var stdout = process.stdout;

function printTitleAndOptions(title, options) {
    stdout.write(title + ':\n');
    for(var i = 0; i < options.length; i++) {
        stdout.write((i + 1) + ') ' + options[i].title + '\n');
    }
}

function build(func, title, options, callback) {
    return function() {
        func(title, options, callback);
    };
}

/**
 * Prints a single-choice menu
 * @param title (String)
 * @param options (options Object)
 * @param callback (Function)
 */
function single(title, options, callback) {
    printTitleAndOptions(title, options);

    stdin.addListener('data', function (e) {
        var choose = parseInt(e.toString().trim(), 10);
        if (choose) {
            choose--;
            if (choose < 0 || choose >= options.length) {
                stdout.write('Invalid option\n');
            } else {
                stdin.removeAllListeners('data');
                options[choose].action();
                if(callback) {
                    return callback();
                }
            }
        } else {
            stdout.write('Invalid option\n');
        }
    });
}

/**
 * Prints a multi-choice menu
 * @param title (String)
 * @param options (options Object)
 * @param callback (Function)
 */
function multi(title, options, callback) {
    printTitleAndOptions(title, options);

    var stdin = process.openStdin();
    stdin.addListener('data', function (e) {
        var chooseStr = e.toString().replace(/\s+/g, ' ').trim().split(' ');
        var choose = chooseStr.map(function(i) { return parseInt(i, 10); });

        var valid = choose.every(function(i) {return i && !(i < 0 || i > options.length); });

        if(valid) {
            stdin.removeAllListeners('data');
            choose.forEach(function(c) { options[c - 1].action(); });
            if(callback) {
                return callback();
            }
        } else {
            stdout.write('Invalid option\n');
        }
    });
}

module.exports = {
    build: build,
    single: single,
    multi: multi
};