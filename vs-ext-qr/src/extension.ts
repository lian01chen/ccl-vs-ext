// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { QRView } from './qrView';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vs-ext-qr" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// http://www.baidu.com

	let disposable = vscode.commands.registerCommand('vs-ext-qr.qrcode', function () {

		// vscode.window.showInformationMessage('Hello World from HelloWorld!');
		// 生成二维码
		QRView.load();
		// 获取当前选中的文本
		// const document = await vscode.workspace.openTextDocument({
		// 	language: 'javascript', // 指定文档语言
		// 	content: decodeMcd,
		// });
		// await vscode.window.showTextDocument(document, vscode.ViewColumn.One, true);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
