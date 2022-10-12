const fs = require('fs');

try {
    const files = fs.readdirSync('./', {
        withFileTypes: true
    });
    files.forEach(file => {
        if (!file.isDirectory() && file.name !== 'index.js') {
            const [_number, week, weekNumber, _lesson, _lessonNumber, _day] = file.name.split('-');
            const number = `0${weekNumber}`.slice(-2);
            const folder = `${number}-${week}-${weekNumber}`;
            if (!fs.existsSync(folder)) {
                try {
                    fs.mkdirSync(folder);
                    copyFile(file.name, folder);
                } catch(_e) {
                    console.log('Error al crear directorio ' + folder);
                }
            }
            copyFile(file.name, folder);
        }
    });
} catch (_e) {
    console.log('Error leyendo el directorio');
}

function copyFile(name, dir) {
    try {
        fs.copyFileSync(name, dir + '/' + name);
    } catch(_e) {
        console.log('Error copiando ' + name);
    }
}

