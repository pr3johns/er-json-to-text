#!/usr/bin/env node

function performParse(input) {
    let output = JSON.parse(input);

    let sessions = output.__collections__.Data;
    let guid = Object.keys(output.__collections__.Data);
    let stringOutput = "";

    for(guid in sessions) {    
        let ts = new Date(sessions[guid].results.timestamp.value._seconds*1000 +
                          sessions[guid].results.timestamp.value._nanoseconds/1000000);
        let company = sessions[guid].results.company;
        let email = sessions[guid].results.email;
        let name = sessions[guid].results.name;

        sessions[guid].results.data.map(v => {
            stringOutput += "\n" + ts.toString() + "*" + guid + "*" + company + "*" + email + "*" + name;
            stringOutput += "*";
            stringOutput += v.question + "*";
            stringOutput += v.answer;
        });
    }
    console.log(stringOutput);
}

// following function calls "resolve" when STDIN inputted.
function getInput() {
  return new Promise(function (resolve, reject) {
    const stdin = process.stdin;
    let data = '';

    stdin.setEncoding('utf8');
    stdin.on('data', function (chunk) {
      data += chunk;
    });

    stdin.on('end', function () {
      resolve(data);
    });

    stdin.on('error', reject);
  });
}

getInput().then(performParse).catch(console.error);