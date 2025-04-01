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
    - Step previous (Ctrl+DownArrow)
        - Key/value -> previous key-value pair in object
        - Array item -> previous array item
