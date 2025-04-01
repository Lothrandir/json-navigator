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

### 0.1.0

Initial release

---
