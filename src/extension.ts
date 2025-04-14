// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as json from 'jsonc-parser';

// This method is called when extension is activated
// The extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const disposables = [
		vscode.commands.registerCommand('json-navigator.step-out', () => process(outOfNode)),
		vscode.commands.registerCommand('json-navigator.step-in', () => process(intoNode)),
		vscode.commands.registerCommand('json-navigator.step-next', () => process(nextNode)),
		vscode.commands.registerCommand('json-navigator.step-previous', () => process(previousNode)),
		vscode.commands.registerCommand('json-navigator.include-previous', () => process(includePreviousNode)),
		vscode.commands.registerCommand('json-navigator.include-next', () => process2(includeNextNode))
	];

	disposables.forEach(e => {
		context.subscriptions.push(e);
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}

export function process(command: (editor : vscode.TextEditor, currentNode: json.Node) => vscode.Selection) {
	const editor = vscode.window.activeTextEditor;
	if(editor === undefined) {
		vscode.window.showErrorMessage('editor is undefined');
		return;
	}
	const node = getCurrentNode(editor);
	if(node === undefined) {
	
		vscode.window.showErrorMessage('node is undefined');
		return;
	}
	vscode.debug.activeDebugSession ? vscode.window.showWarningMessage(jsonNodeToString(node)) : "";
	editor.selection = command(editor, node);
	editor.revealRange(new vscode.Range(editor.selection.start, editor.selection.end));	
}

export function process2(command: (editor : vscode.TextEditor, currentNode: json.Node) => vscode.Selection) {
	const editor = vscode.window.activeTextEditor;
	if(editor === undefined) {
		vscode.window.showErrorMessage('editor is undefined');
		return;
	}
	const node = getCurrentNodeAtOffset(editor, editor.document.offsetAt(editor.selection.end) - 1);
	if(node === undefined) {
	
		vscode.window.showErrorMessage('node is undefined');
		return;
	}
	vscode.debug.activeDebugSession ? vscode.window.showWarningMessage(jsonNodeToString(node)) : "";
	editor.selection = command(editor, node);
	editor.revealRange(new vscode.Range(editor.selection.start, editor.selection.end));	
}


export function jsonNodeToString(node : json.Node) : string
{
	return JSON.stringify({
		offset: node.offset,
		value: node.value,
		type: node.type,
		parentType: node.parent?.type ?? "",
		parentOffset: node.parent?.offset ?? "",
		children: node.children?.map( (n) => { return { type: node.type, offset: node.offset }; }) ?? ""
	});
}

export function nextNode(editor : vscode.TextEditor, currentNode: json.Node) : vscode.Selection {
	if(currentNode.parent === undefined)
	{
		return getSelectionOfNode(editor, currentNode); 
	}

	if(currentNode.parent.type === 'property')
	{
		const currentIndex = currentNode.parent.parent!.children!.indexOf(currentNode.parent) ;
		if(currentIndex <  currentNode.parent.parent!.children!.length - 1)
		{
			return getSelectionOfNode(editor, currentNode.parent.parent!.children![currentIndex + 1]); 
		}
	}

	if(currentNode.parent.type === 'object' || currentNode.parent.type === 'array')
	{
		const currentIndex = currentNode.parent.children!.indexOf(currentNode);
		if(currentIndex <  currentNode.parent.children!.length - 1)
		{
			return getSelectionOfNode(editor, currentNode.parent.children![currentIndex + 1]);
		}
	}

	return editor.selection;
}

export function includeNextNode(editor : vscode.TextEditor, currentNode: json.Node) : vscode.Selection {
	if(currentNode.parent === undefined)
	{
		return getSelectionOfNode(editor, currentNode); 
	}

	if(currentNode.parent.type === 'property')
	{
		const currentIndex = currentNode.parent.parent!.children!.indexOf(currentNode.parent) ;
		if(currentIndex <  currentNode.parent.parent!.children!.length - 1)
		{
			//return getSelectionOfNode(editor, currentNode.parent.parent!.children![currentIndex + 1]);
			return new vscode.Selection(getNodeEnd(editor, currentNode.parent.parent!.children![currentIndex + 1]), editor.selection.start);
		}
		else
		{
			return new vscode.Selection(getNodeEnd(editor, currentNode.parent.parent!.children![currentIndex]), editor.selection.start);
		}
	}

	if(currentNode.parent.type === 'object' || currentNode.parent.type === 'array')
	{
		const currentIndex = currentNode.parent.children!.indexOf(currentNode);
		if(currentIndex <  currentNode.parent.children!.length - 1)
		{
			return new vscode.Selection(getNodeEnd(editor, currentNode.parent.children![currentIndex + 1]), editor.selection.start);
			//return getSelectionOfNode(editor, currentNode.parent.children![currentIndex + 1]); 
		}
		else
		{
			return new vscode.Selection(getNodeEnd(editor, currentNode.parent.children![currentIndex]), editor.selection.start);
		}
	}

	return getSelectionOfNode(editor, currentNode);
}

export function previousNode(editor : vscode.TextEditor, currentNode: json.Node) : vscode.Selection {
	if(currentNode.parent === undefined)
	{
		return getSelectionOfNode(editor, currentNode); 
	}

	if(currentNode.parent.type === 'property')
	{
		const currentIndex = currentNode.parent.parent!.children!.indexOf(currentNode.parent) ;
		if(currentIndex > 0)
		{
			return getSelectionOfNode(editor, currentNode.parent.parent!.children![currentIndex - 1]); 
		}
		else 
		{
			return getSelectionOfNode(editor, currentNode.parent.parent!.children![0]);
		}
	}

	if(currentNode.parent.type === 'object' || currentNode.parent.type === 'array')
	{
		const currentIndex = currentNode.parent.children!.indexOf(currentNode);
		if(currentIndex > 0)
		{
			return getSelectionOfNode(editor, currentNode.parent.children![currentIndex - 1]); 
		}
	}

	return getSelectionOfNode(editor, currentNode);
}

export function includePreviousNode(editor : vscode.TextEditor, currentNode: json.Node) : vscode.Selection {
	if(currentNode.parent === undefined)
	{
		return getSelectionOfNode(editor, currentNode); 
	}

	if(currentNode.parent.type === 'property')
	{
		const currentIndex = currentNode.parent.parent!.children!.indexOf(currentNode.parent) ;
		if(currentIndex > 0)
		{
			return new vscode.Selection(editor.selection.end, getNodeStart(editor, currentNode.parent.parent!.children![currentIndex - 1]));
			//return getSelectionOfNode(editor, currentNode.parent.parent!.children![currentIndex - 1]); 
		}
		else
		{
			return new vscode.Selection(editor.selection.end, getNodeStart(editor, currentNode.parent.parent!.children![0]));
		}
	}

	if(currentNode.parent.type === 'object' || currentNode.parent.type === 'array')
	{
		const currentIndex = currentNode.parent.children!.indexOf(currentNode);
		if(currentIndex > 0)
		{
			return new vscode.Selection(editor.selection.end, getNodeStart(editor, currentNode.parent.children![currentIndex - 1]));
			//return getSelectionOfNode(editor, currentNode.parent.children![currentIndex - 1]); 
		}
		else
		{
			return new vscode.Selection(editor.selection.end, getNodeStart(editor, currentNode.parent.children![0]));
		}
	}

	return getSelectionOfNode(editor, currentNode);
}

export function outOfNode(editor : vscode.TextEditor, currentNode: json.Node) : vscode.Selection {
	switch (currentNode.type) {
		case 'property':
			return getSelectionOfNode(editor, currentNode.parent ?? currentNode);
		case 'string':
			if(currentNode.parent === undefined) {
				vscode.window.showInformationMessage('No parent!?!?!?!?!?!');
				return getSelectionOfNode(editor, currentNode);
			}
			else if(currentNode.parent.type === 'property' && currentNode.parent.children?.[0] === currentNode) {
				// The string is the key in a property. 
				return getSelectionOfNode(editor, currentNode.parent?.parent ?? currentNode);
			}
			else {
				return getSelectionOfNode(editor, currentNode.parent);
			}
		case 'boolean':
			if(currentNode.parent === undefined) {
				vscode.window.showInformationMessage('No parent!?!?!?!?!?!');
				return getSelectionOfNode(editor, currentNode);
			}
			else {
				return getSelectionOfNode(editor, currentNode.parent);
			}
		case 'number':
			if(currentNode.parent === undefined) {
				vscode.window.showInformationMessage('No parent!?!?!?!?!?!');
				return getSelectionOfNode(editor, currentNode);
			}
			else {
				return getSelectionOfNode(editor, currentNode.parent);
			}
		case 'array':
			if(currentNode.parent === undefined) {
				return getSelectionOfNode(editor, currentNode);
			}
			else {
				return getSelectionOfNode(editor, currentNode.parent);
			}
		case 'object':
			if(currentNode.parent === undefined) {
				return getSelectionOfNode(editor, currentNode);
			}
			else {
				return getSelectionOfNode(editor, currentNode.parent);
			}

		default:
			vscode.window.showErrorMessage('Not implementer yet.... \n' + jsonNodeToString(currentNode));
			return getSelectionOfNode(editor, currentNode);
	  }
}

export function intoNode(editor : vscode.TextEditor, currentNode: json.Node) : vscode.Selection {
	switch (currentNode.type) {
		case 'property':
			return getSelectionOfNode(editor, currentNode.children?.[1] ?? currentNode);
		case 'string':
			if(currentNode.parent === undefined) {
				vscode.window.showInformationMessage('No parent!?!?!?!?!?!');
				return getSelectionOfNode(editor, currentNode);
			}
			else if(currentNode.parent.type === 'property' && currentNode.parent.children?.[0] === currentNode) {
				// The string is the key in a property. Therefore we go to the value
				return getSelectionOfNode(editor, currentNode.parent.children?.[1]);
			}
			else {
				// The string is a value
				return getSelectionOfNode(editor, currentNode);
			}
		case 'boolean':
			return getSelectionOfNode(editor, currentNode);
		case 'number':
			return getSelectionOfNode(editor, currentNode);

		case 'array':
			if(currentNode.children === undefined || currentNode.children?.length <= 0) {
				return getSelectionOfNode(editor, currentNode); // Just select current node. TDOD: Do nothing instead?
			}
			else {
				return getSelectionOfNode(editor, currentNode.children?.[0]); // Step into first
			}
		case 'object':
			if(currentNode.children === undefined || currentNode.children?.length <= 0) {
				return getSelectionOfNode(editor, currentNode); // Just select current node. TDOD: Do nothing instead?
			}
			else {
				return getSelectionOfNode(editor, currentNode.children?.[0]); // Step into first property key
			}

		default:
			vscode.window.showErrorMessage('Not implementer yet.... \n' + jsonNodeToString(currentNode));
			return getSelectionOfNode(editor, currentNode);
	  }
}

export function getSelectionOfNode(editor : vscode.TextEditor, node: json.Node) : vscode.Selection
{
	return new vscode.Selection(getNodeEnd(editor, node), getNodeStart(editor, node));
}

export function getNodeStart(editor : vscode.TextEditor, node: json.Node) : vscode.Position
{
	return editor.document.positionAt(node.offset);
}

export function getNodeEnd(editor : vscode.TextEditor, node: json.Node) : vscode.Position
{
	return editor.document.positionAt(node.offset + node.length);
}

export function getCurrentNode(editor : vscode.TextEditor) {
	const position = editor.selection.active;
	return getCurrentNodeAtOffset(editor, editor.document.offsetAt(position));
}

export function getCurrentNodeAtOffset(editor : vscode.TextEditor, offset : number) {
	const text = editor.document.getText();
	const tree = json.parseTree(text);
	if(tree === undefined) {
		vscode.window.showErrorMessage('tree is undefined');
		return;
	}
	
	let node = json.findNodeAtOffset(tree, offset);
	
	return node;
}
