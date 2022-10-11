const fs = require('fs');

try {
    const files = fs.readdirSync('./', {
        withFileTypes: true
    });
    files.forEach(file => {
        if (!file.isDirectory() && fileIsValid(file.name)) {
            const [_name, type, _index, _extension] = file.name.split('.');
            if (!fs.existsSync(type)) {
                try {
                    fs.mkdirSync(type);
                    copyFile(file.name, type);
                } catch(_e) {
                    console.log('Error al crear directorio ' + type);
                }
            }
            copyFile(file.name, type);
        }
    });
} catch (_e) {
    console.log('Error leyendo el directorio');
}

function fileIsValid(name) {
    return (name.split('.').length === 4);
}

function copyFile(name, dir) {
    try {
        fs.copyFileSync(name, dir + '/' + name);
    } catch(_e) {
        console.log('Error copiando ' + name);
    }
}
