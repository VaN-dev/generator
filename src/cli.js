import arg from 'arg';
import inquirer from 'inquirer';
import { generate } from "./main";

async function promptForMissingOptions(options) {
    const answersCore = await inquirer.prompt(getCoreQuestions(options));

    const answersProperties = await generatePropertiesQuestions();

    const answers = await inquirer.prompt(getQuestions(options));

    return {
        ...options,
        targetDirectory: options.targetDirectory || answersCore.targetDirectory,
        name: options.name || answersCore.name,
        namePlural: options.namePlural || answersCore.namePlural,
        prefix: options.prefix || answersCore.prefix,
        properties: options.properties || answersProperties,
        crud: options.crud || answers.crud,
        events: options.events || answers.events,
    };
}

export async function cli(args) {
    // let options = parseArgumentsIntoOptions(args);
    const options = await promptForMissingOptions({});

    console.log(options);
    await generate(options);
}

function getCoreQuestions(options) {
    return [
        {
            type: 'input',
            name: 'targetDirectory',
            message: 'Where should we generate the entity?',
            default: process.cwd() + '/src',
            when: !options.targetDirectory
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the entity?',
            when: !options.name
        },
        {
            type: 'input',
            name: 'namePlural',
            message: 'What is its plural name?',
            default: (options) => {
                return options.name + 's';
            },
            when: !options.namePlural
        },
        {
            type: 'input',
            name: 'prefix',
            message: 'What is its prefix?',
            default: (options) => {
                return options.name.substring(0,3);
            },
            when: !options.prefix
        }
    ];
}

async function generatePropertiesQuestions() {
    let newProperty = true;
    let answersProperties = [];
    while (newProperty) {
        const answerNewProperty = await inquirer.prompt({
            type: 'confirm',
            name: 'newProperty',
            message: 'New property?',
            default: true,
        });

        if (answerNewProperty.newProperty === false) {
            break;
        }

        const answerPropertyName = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'New property name?',
            when: newProperty
        });
        const answerPropertyType = await inquirer.prompt({
            type: 'list',
            name: 'type',
            message: 'New property type?',
            choices: [
                {'value': 'string',     'name': 'string'},
                {'value': 'number',     'name': 'number'},
                {'value': 'boolean',    'name': 'boolean'},
                {'value': '[]',         'name': 'array'},
                {'value': 'Date',       'name': 'Date'},
                {'value': 'relation',   'name': 'relation'},
            ],
            when: newProperty
        });

        const answerPropertyTypeOfArray = await inquirer.prompt({
            type: 'list',
            name: 'typeOfArray',
            message: 'Array of what type?',
            choices: [
                {'value': 'string',     'name': 'string'},
                {'value': 'number',     'name': 'number'},
                {'value': 'boolean',    'name': 'boolean'},
                {'value': '[]',         'name': 'array'},
                {'value': 'Date',       'name': 'Date'},
                {'value': 'relation',   'name': 'relation'},
            ],
            when: answerPropertyType.type === '[]'
        });

        const answerPropertyTypeRelation = await inquirer.prompt({
            type: 'list',
            name: 'relation',
            message: 'To which entity?',
            choices: ['foo', 'bar'],
            when: newProperty && answerPropertyType.type === 'relation'
        });

        answersProperties.push({
            name: answerPropertyName.name,
            type: answerPropertyType.type === '[]' ? answerPropertyTypeOfArray.typeOfArray + answerPropertyType.type : answerPropertyType.type,
            relation: answerPropertyType.type === 'relation' ? answerPropertyTypeRelation.relation : null,
        });
    }

    return answersProperties;
}

function getQuestions(options) {
    return [
        {
            type: 'checkbox',
            name: 'crud',
            message: 'CRUD?',
            choices: [
                {'value': 'C', 'name': 'Create resource'},
                {'value': 'R', 'name': 'Read resource'},
                {'value': 'U', 'name': 'Update resource'},
                {'value': 'D', 'name': 'Delete resource'},
                {'value': 'L', 'name': 'List resources'},
            ],
            when: !options.crud
        },
        {
            type: 'confirm',
            name: 'events',
            message: 'Should this entity raise domain events?',
            when: !options.events
        }
    ];
}


// function parseArgumentsIntoOptions(rawArgs) {
//     const args = arg(
//         {
//             '--name': String,
//             '--namePlural': String,
//             '--crud': Boolean,
//             '-n': '--name',
//             '-p': '--namePlural',
//             '-c': '--crud',
//         },
//         {
//             argv: rawArgs.slice(2),
//         }
//     );
//     return {
//         name: args['--name'],
//         namePlural: args['--namePlural'],
//         crud: args['--crud'] || false,
//     };
// }
