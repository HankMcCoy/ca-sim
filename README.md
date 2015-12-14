# Cellular Automata Simulator

## Description

This is a simple simulator of any of the even-numbered elementary one-dimensional [cellular automata](https://en.wikipedia.org/wiki/Elementary_cellular_automaton) that can easily be dropped onto a webpage as a simple widget.

![Screenshot](http://i.imgur.com/HE7t2hR.png)

## Todos

- [X] Add button to kick off steps on an interval (with accompanying stop button)
- [X] Add option to set/reset the initial state of the tape
- [X] Style to not look completely terrible
- [X] Reposition the viewport to match the output as it grows
- [X] Resize the cells once the output extends beyond the width of the viewport
- [X] Constrain the height of the viewport
- [X] Resize the cells once the output extends beyond the height of the viewport
- [X] Switch to using canvas for rendering
- [ ] Automatically stop running the CA when the user hits reset
- [ ] Improve data entry and validation for the initial tape and the current rule
- [ ] Add Post-CSS autoprefixer (which I think should fix Safari's messed up layout)
- [ ] Add some sort of interesting presets the user can choose from (combinations of both states and rules)
- [ ] Find a way to re-center less frequently (this hurts performance; just compare rules 110 and 30 to see how much)
