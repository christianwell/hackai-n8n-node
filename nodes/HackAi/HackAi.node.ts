import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import { chatFields, chatOperations } from './ChatDescription';
import { imageFields, imageOperations } from './ImageDescription';
import { textFields, textOperations } from './TextDescription';


export class HackAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HackAi',
		name: 'hackAi',
		// hidden: false, // Commenting out the hidden property to make it appear in n8n
		icon: { light: 'file:hackAi.svg', dark: 'file:hackAi.dark.svg' },
		group: ['transform'],
		version: [1, 1.1],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Connect to Hack AI (ai.hackclub.com) for OpenAI-compatible AI tasks.',
		defaults: {
			name: 'HackAi',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'HackAiApi',
				required: true,
			},
		],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
			baseURL:
				'={{ $credentials.url?.split("/").slice(0,-1).join("/") ?? "https://ai.hackclub.com/proxy/v1" }}',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Text',
						value: 'text',
					},
				],
				default: 'text',
			},

			...chatOperations,
			...chatFields,

			...imageOperations,
			...imageFields,

			...textOperations,
			...textFields,
		],
		usableAsTool: true,
	};
}
