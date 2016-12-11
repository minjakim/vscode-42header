
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { basename } from 'path'
import vscode = require('vscode')
import moment = require('moment')

import {
  ExtensionContext, TextEdit, TextEditorEdit, TextDocument, Position, Range
} from 'vscode'

import {
  extractHeader, getHeaderInfo, renderHeader,
  supportsLanguage, HeaderInfo
} from './header'

/**
 * Return current user from config or ENV by default
 */
function getCurrentUser() {
  return vscode.workspace.getConfiguration()
    .get('42header.username') || process.env['USER'] || 'marvin'
}

/**
 * Return current user mail from config or default value
 */
function getCurrentUserMail() {
  return vscode.workspace.getConfiguration()
    .get('42header.email') || `${getCurrentUser()}@student.42.fr`
}

/**
 * Update HeaderInfo with last update author and date, and update filename
 * Returns a fresh new HeaderInfo if none was passed
 */
function newHeaderInfo(document: TextDocument, headerInfo?: HeaderInfo) {
  const user = getCurrentUser()
  const mail = getCurrentUserMail()

  return Object.assign({},
    // This will be overwritten if headerInfo is not null
    {
      createdAt: moment(),
      createdBy: user
    },
    headerInfo,
    {
      filename: basename(document.fileName),
      author: `${user} <${mail}>`,
      updatedBy: user,
      updatedAt: moment()
    }
  )
}

/**
 * `insertHeader` Command Handler
 */
function insertHeaderHandler() {
  const activeTextEditor = vscode.window.activeTextEditor
  const document = activeTextEditor.document
  const languageId = document.languageId

  if (supportsLanguage(languageId))
    activeTextEditor.edit(editor => {
      const currentHeader = extractHeader(document.getText())

      if (currentHeader)
        editor.replace(new Range(0, 0, 12, 0),
          renderHeader(languageId,
            newHeaderInfo(document, getHeaderInfo(currentHeader))
          )
        )
      else
        editor.insert(new Position(0, 0),
          renderHeader(languageId,
            newHeaderInfo(document)
          )
        )
    })
  else
    vscode.window.showInformationMessage(
      `No header support for language ${languageId}`)
}

/**
 * Start watcher for document save to update current header
 */
function startHeaderUpdateOnSaveWatcher(subscriptions: vscode.Disposable[]) {
  vscode.workspace.onWillSaveTextDocument(event => {
    const textEditor = vscode.window.activeTextEditor
    const document = event.document
    const currentHeader = extractHeader(document.getText())

    event.waitUntil(
      textEditor.edit(editor => {
        // If current language is supported
        // and a header is present at top of document
        if (supportsLanguage(document.languageId) && currentHeader)
          editor.replace(new Range(0, 0, 12, 0),
            renderHeader(document.languageId,
              newHeaderInfo(document, getHeaderInfo(currentHeader))
            )
          )
      })
    )
  }, null, subscriptions)
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands
    .registerTextEditorCommand('42header.insertHeader', insertHeaderHandler)

  context.subscriptions.push(disposable)
  startHeaderUpdateOnSaveWatcher(context.subscriptions)
}
