# Change Log

All notable changes to the "json-navigator" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## 0.1.0

- 4 Commands (Keyboard shortcut)
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

## 0.2.0

- 2 new Commands (Keyboard shortcut)
    - Include next (Ctrl+Shift+DownArrow)
        - Key/value -> include the next key-value pair in the selection
        - Array item -> include the next array item in the selection
    - Include previous (Ctrl+Shift+UpArrow)
        - Key/value -> include the previous key-value in the selection
        - Array item -> include the previous array item in the selection
- Bugfixes
    - When using "Step next" at the last property of an object both key and value is not selected as expected