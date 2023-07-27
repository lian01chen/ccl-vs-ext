import * as vscode from 'vscode';
const QRCode = require('qrcode');

export class QRView {
  static panel: vscode.WebviewPanel | null;  // webview面板

  static async load() {
    const hide = vscode.window.setStatusBarMessage('qr-code generating...');
    try {
      // 获取剪切板内容
      const clipboardContent = await vscode.env.clipboard.readText();

      // 选中剪贴板内容
      const editor = vscode.window.activeTextEditor;
      const selection = editor?.selection;
      const text = editor?.document.getText(selection);

      // 优先使用选中内容，如果没有，看剪切板是否有内容
      const codeContent = text || clipboardContent;

      if (!codeContent) {
        vscode.window.showInformationMessage('please copy first or select content in editor');
        return;
      }

      const imageData = await QRCode.toDataURL(codeContent);
      if (this.panel) {
        this.panel.webview.html = this.createWebview(codeContent, imageData);
        this.panel.reveal();
      } else {
        this.panel = vscode.window.createWebviewPanel('resport', 'qr-code', vscode.ViewColumn.One, {
          enableScripts: true,
          retainContextWhenHidden: true
        });
        this.panel.webview.html = this.createWebview(codeContent, imageData);
        this.panel.onDidDispose(() => { this.panel = null; });
      }

      vscode.window.setStatusBarMessage('qr-code generate success', 3000);
    } catch (error) {
      const errTxt = String(error) || '生成二维码失败';
      vscode.window.setStatusBarMessage(errTxt, 3000);
    } finally {
      hide.dispose();
    }
  }

  /**
   * 生成展示内容
   * @param contentStr 
   * @param imgUrl 
   * @returns 
   */
  static createWebview(contentStr: string, imgUrl: any): string {
    const htlmStr = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>qr-code</title>
      </head>
      <body>
        <p>当前二维码内容:${contentStr}</p>
        <div><img src="${imgUrl}"></div>
      </body>
      </html>
    `;
    return htlmStr;
  }
}