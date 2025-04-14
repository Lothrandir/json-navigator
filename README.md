# JSON Navigator

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
- Step previous (Ctrl+UpArrow)
    - Key/value -> previous key-value pair in object
    - Array item -> previous array item
- Include next (Ctrl+Shift+DownArrow)
    - Key/value -> include the next key-value pair in the selection
    - Array item -> include the next array item in the selection
- Include previous (Ctrl+Shift+UpArrow)
    - Key/value -> include the previous key-value in the selection
    - Array item -> include the previous array item in the selection

## Known Issues

If the cursor is placed after the last closing bracket no shortcuts work.

## Release Notes

### 0.1.0

Initial release

### 0.2.0

Added selection of adjacent properties in an object or adjacent items in a list
Minor bugfix

---
