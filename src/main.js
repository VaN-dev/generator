import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { render } from "./utils/template";

const access = promisify(fs.access);
const copy = promisify(ncp);

// list of file/folder that should not be copied
const SKIP_FILES = [];

export async function generate(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    // generate core
    await copyTemplateFiles(process.cwd()+'/templates/core', options.targetDirectory, options);

    // generate CRUD core
    await copyTemplateFiles(process.cwd()+'/templates/crud/core', options.targetDirectory, options);

    // generate CRUD conditionals
    for (const method of options.crud) {
        const dir = process.cwd() + '/templates/crud/conditionals/' + method.toLowerCase();
        if (fs.existsSync(dir)) {
            await copyTemplateFiles(dir, options.targetDirectory, options);
        }
    }

    if (options.events) {
        await copyTemplateFiles(process.cwd()+'/templates/events', options.targetDirectory, options);
    }

    return true;
}

async function copyTemplateFiles(templatePath, targetPath, options) {
    const replacements = {
        name: options.name,
        namePlural: options.namePlural,
        prefix: options.prefix,
        crud: options.crud,
        properties: options.properties,
        useEvents: options.events,
        functions: {
            capitalize: (value) => capitalize(value)
        }
    };

    // read all files/folders (1 level) from template folder
    const filesToCreate = fs.readdirSync(templatePath);
    // loop each file/folder
    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1) return;

        if (stats.isFile()) {
            // read file content and transform it using template engine
            let contents = fs.readFileSync(origFilePath, 'utf8');
            contents = render(contents, replacements);

            // write file to destination folder
            const writePath = `${targetPath}/${file}`;
            console.log('writing file ' + writePath);
            fs.writeFileSync(replacePattern(writePath, options), contents, 'utf8');

        } else if (stats.isDirectory()) {
            // create folder in destination folder
            console.log('writing directory ' + path.join(targetPath, file));
            fs.mkdirSync(replacePattern(path.join(targetPath, file), options), { recursive: true });
            // copy files/folder inside current folder recursively
            copyTemplateFiles(path.join(templatePath, file), replacePattern(path.join(targetPath, file), options), options);
        }
    });
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function replacePattern(string, options) {
    return string
        .replace('__namePlural__', options.namePlural)
        .replace('__name__', options.name)
    ;
}
