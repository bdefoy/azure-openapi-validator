import { Spectral } from '@stoplight/spectral-core';
import linterForRule from './utils';

let linter: Spectral;

beforeAll(async () => {
    linter = await linterForRule('AvoidAdditionalProperties');
    return linter;
});

test('AvoidAdditionalProperties should find errors', () => {
    const oasDoc = {
        swagger: '2.0',
        definitions: {
            This: {
                description: 'This',
                type: 'object',
                additionalProperties: {
                    type: 'object',
                },
            },
            That: {
                description: 'That',
                type: 'object',
                properties: {
                    tags: {
                        additionalProperties: {
                            type: 'object',
                        },
                    },
                },
            },
        },
    };
    return linter.run(oasDoc).then((results) => {
        expect(results.length).toBe(2);
        expect(results[0].path.join('.')).toBe('definitions.This.additionalProperties');
        expect(results[1].path.join('.')).toBe('definitions.That.properties.tags.additionalProperties');
    });
});

test('AvoidAdditionalProperties should find no errors', () => {
    const oasDoc = {
        swagger: '2.0',
        definitions: {
            This: {
                description: 'This',
                type: 'object',
                additionalProperties: {
                    type: 'object',
                    properties: {
                        prop1: {
                            type: 'string',
                        },
                    },
                },
            },
            That: {
                description: 'That',
                type: 'object',
                properties: {
                    tags: {
                        additionalProperties: {
                            type: 'string',
                        },
                    },
                },
            },
            ThaOther: {
                description: 'ThaOther',
                type: 'object',
                properties: {
                    otherMap: {
                        additionalProperties: {
                            $ref: '#/definitions/Other',
                        },
                    },
                },
            },
            Other: {
                description: 'Other object',
                type: 'object',
                properties: {
                    aProp: {
                        type: 'string',
                    },
                },
            },
        },
    };
    return linter.run(oasDoc).then((results) => {
        expect(results.length).toBe(0);
    });
});
