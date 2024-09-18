/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

import { EntryPoints } from 'N/types';
import * as serverWidget from 'N/ui/serverWidget';
import * as log from 'N/log';
import * as runtime from 'N/runtime';
import * as message from 'N/ui/message';
import { ServerRequest, ServerResponse } from 'N/https';

export const onRequest: EntryPoints.Suitelet.onRequest = (
  context: EntryPoints.Suitelet.onRequestContext
) => {
  const request = context.request;
  const response = context.response;

  if (request.method === 'GET') {
    onGet(response);
  } else {
    onPost(request, response);
  }
};

/**
 * Handles Get Request and loads the saved search
 */
const onGet = (response: ServerResponse) => {
  const page = createPage();
  response.writePage(page);
};

/**
 * Handles Post Request
 */
const onPost = (request: ServerRequest, response: ServerResponse) => {
  const example = request.parameters.example;

  log.debug({
    title: 'Example',
    details: request.parameters.example,
  });

  const page = createPage();

  response.writePage(page);
};

const createPage = (title: string = 'React Example') => {
  // TODO: Move this to a script parameter
  const BUNDLE_URL = runtime.getCurrentScript().getParameter({
    name: 'custscript_sp_react_test_bundle_url',
  }) as string;

  const form = serverWidget.createForm({ title });

  if (BUNDLE_URL === null) {
    form.addPageInitMessage({
      type: message.Type.ERROR,
      title: 'ERROR!',
      message:
        'Bundle URL is not set. Please set the bundle URL in the script parameter.',
    });
  }

  const field = form.addField({
    id: 'custpage_hidden',
    label: 'not shown - hidden',
    type: 'INLINEHTML',
  });

  field.defaultValue = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>React Widget Example</title>
    </head>
    <body>

    <div id="root"></div>

    <script defer src="${BUNDLE_URL}"></script>
    
    </body>
    </html>
  `;

  return form;
};
