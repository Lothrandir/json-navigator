# JSON Navigator README

The JSON Navigator adds keyboard commands and keyboard shortcuts to easily navigate a json document.
You can step into and out of objects, arrays and properties.
You can step up and down an array list and between properties in an object.

## Features

4 Commands (Keyboard shortcut):

- Step in (Ctrl+RightArrow)
    - Object -> first key-value pair
    - key/key-value pair -> value
    - Array -> first item in array
- Step out (Ctrl+LeftArrow)
    - value -> key-value pair
    - key/key-value pair -> object
    - Array item -> array
- Step next (Ctrl+DownArrow)
    - Key/value -> next key-value pair in object
    - Array item -> next array item
- Step previous (Ctrl+DownArrow)
    - Key/value -> previous key-value pair in object
    - Array item -> previous array item

## Known Issues

If the cursor is placed after the last closing bracket no shortcuts work.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
