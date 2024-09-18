/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */

import { EntryPoints } from 'N/types';
import * as log from 'N/log';
import * as error from 'N/error';

type Action = 'UPDATE' | 'CREATE' | 'DELETE';

type PostContext = {
  action: Action;
  payload: any;
};

const doValidation = (
  args: unknown[],
  argNames: string[],
  methodName: 'POST' | 'GET'
) => {
  for (let i = 0; i < args.length; i++)
    if (!args[i] && args[i] !== 0)
      throw error.create({
        name: 'MISSING_REQ_ARG',
        message:
          'Missing a required argument: [' +
          argNames[i] +
          '] for method: ' +
          methodName,
      });
};

const update = (payload: any) => {
  return 'Example Update';
};

const create = (payload: any) => {
  return 'Example Create';
};

const remove = (payload: any) => {
  return 'Example Delete';
};

export const post: EntryPoints.RESTlet.post = (context: PostContext) => {
  log.debug('EXAMPLE API', JSON.stringify(context, null, 2));

  try {
    log.debug('EXAMPLE ACTION', context.action);
    doValidation([context.action], ['action'], 'POST');

    const { action, payload } = context;
    let result: null | string = null;
    switch (action) {
      case 'UPDATE':
        // Update logic
        result = update(payload);
        break;
      case 'CREATE':
        // Create logic
        result = create(payload);
        break;
      case 'DELETE':
        // Delete logic
        result = remove(payload);
        break;
      default:
        return {
          success: false,
          error: 'Invalid action',
        };
    }

    log.debug('EXAMPLE API RESULT', result);

    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Something went wrong',
    };
  }
};
