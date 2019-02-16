# React Tabber
A React Tab sheet component.

# Generated Html Structure
```
.tab-container
    > .label-container
        > .label-item
        > .label-item
        > .label-item
        > .label-item
        > ...
    > .panel-container
        > .panel-item
        > .panel-item
        > .panel-item
        > .panel-item
        > ...
```

# Usage
## Import ReactTabber module
```javascript
import ReactTabber from 'react-tabber';
```

if you are using React and ReactTabber in global variable mode, which means there is no module loader environment, `ReactTabber` will be a property of global scope.

## Prepare tab entries to render
### By data structure
You need to collect all components that want to put into tab entries array.
Each array item has property `label` and `panel`, which can be a string, a number, a native DOM element, another React component, or array of these types of items.

Optional property `key` for the item can improve performance and use it from some callbacks besides index value.

Optional property `disabled` for the item sets the tab item state to disabled.

Optional property `hidden` for the item sets the tab item state to hidden.

Here is the example of tab entries array:
```jsx
let entries = [
  {label: 'label1', panel: <div>content 1</div>, key: 'tab1'},
  {label: 'label2', panel: <div>content 2</div>, key: 'tab2'}
];

ReactDOM.render(<ReactTabber entries={entries}/>, document.getElementById('container'));
```
### By JSX template
You can declare labels and panels by JSX template style. `ReactTabber.Label` represents a label and `ReactTabber.Panel` represents a panel.
Optional properties like `key`, `disabled` and `hidden` are specified onto `ReactTabber.Label`s.
Continues multiple `ReactTabber.Panel`s are allowed, they are just belongs to the same closest `ReactTabber.Label`.
`ReactTabber.Panel` Element can be omitted if inside contents has another element to wrap them.
```jsx
import ReactTabber from 'react-tabber';
ReactDOM.render(
	<ReactTabber>
		<ReactTabber.Label key="tab1">label1</ReactTabber.Label>
		<ReactTabber.Panel>content 1</ReactTabber.Panel>

		<ReactTabber.Label key="tab2">label2</ReactTabber.Label>
		<ReactTabber.Panel>content 2</ReactTabber.Panel>
		<p>another content 2</p>
	</ReactTabber>,
	document.getElementById('container')
);
```

## Controlling the active tab item
There are 2 ways to control the active tab item.

### Controlled by tabber component itself
The active tab item position is managed by tabber component itself.
Not specifying prop `activePosition` or its value is `undefined` or `null` will go this way. 

### Controlled by outside component
The active tab item position is managed by outside component.
Specifying a value which is not `undefined` or `null` to prop `activePosition`. if the tabber component wish to change it,
for example the end user clicked another tab item, prop `onUpdateActivePosition({index, key})` will be invoked to request
a change of active position.

# Including CSS
react-tabber provides default CSS styles if you don't want to make from scratch. Make sure CSS class name options are not customized.
importing or copying following CSS files:
```javascript
import 'react-tabber/dist/theme/gray.css';
import 'react-tabber/dist/theme/effect/fade.css'; // optional fade effect when switching, must load after theme
```

## Vertical labels
To use vertical labels, specify property `mode` to "vertical".  
Notice that vertical style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.
```jsx
<ReactTabber mode="vertical" />
```

# Properties
Properties are options specified as attribute onto ReactTabber:
```jsx
<ReactTabber option1="value1" option2="value2"/>
```
## Behavior Properties
`entries`  
Specify tab entries you want to render as a tab, should be an array of rendering items, which has property `label`, `panel` and optional `key`.
`label` will be shown on tab label container. `panel` is the content of the tab. `key` is used to identify different tab labels and panels.

`keyboardSwitch`  
Specify if active tab item could be switched by keyboard when label item has focus.
If enabled, end user could use arrow keys and Tab key to (request) switch active tab item. Defaults to `true`.

`triggerEvents`  
Determine the types of React Element events triggered on label-item that will make the panel-item switched.
Can be an array of event names, or space separated event names. Default value is `['onClick']`.

`delayTriggerEvents`  
Specify React Element events on label-item that will trigger panel switch after delay a small piece of time.
Quite useful if you want to keep hover a little time before switching.

`delayTriggerCancelEvents`  
Specify events on label-item that will cancel delay switching.

`delayTriggerLatency`  
Specify how long (in milliseconds) need to wait before trigger the delayed switching events.

`activePosition`  
Specify the active(switched) tab item position. Could be an numeric index starting from 0, or a `key` prop specified to tab item.
Subscribe `onUpdateActivePosition` to get informed that tabber component request to change the active position, e.g. when user
clicked another tab item and wish to switch to it. 
If this prop is not specified, or its value is `null` or `undefined`, the active position is managed by tabber component itself.

`onUpdateActivePosition({index, key})`  
A callback will be invoked when `activePosition` is controlled by outside component, and request to change it.

`onUpdateTargetPosition({index, key})`  
A callback will be invoked when `activePosition` is controlled by tabber component itself, notifying that the active position will be changed.
Returns `false` to cancel switching.

`onSwitching(from:{index, key}, to:{index, key})`  
A callback will be invoked when start switching tab, current active index is `oldIndex`, and target index is `newIndex`.
Subscribe this event if you want to know a switching is performed as early as possible.

`onSwitched(from:{index, key}, to:{index, key})`  
A callback will be invoked when finish switching tab, previous active index is `oldIndex`, and current index is `newIndex`.
Subscribe this event if you want to do some work based on result of switching(e.g. get the height of the component).

## UI Properties
### Tab
`mode`  
Specify label container layout. Can be `horizontal` (default) or `vertical`.

`tabContainerClassName`  
Tab container element's class name. Default value is 'tab-container'.

### Label
`labelContainerClassName`  
Label container element's class name. Default value is 'label-container'.

`showHeaderLabelContainer`  
If show label container before tab panel. Default value is true.

`showFooterLabelContainer`  
If show label container after tab panel. Default value is false.

`labelItemClassName`  
Label item element's class name. Default value is 'label-item'.

### Panel
`panelContainerClassName`  
Panel container element's class name. Default value is 'panel-container'.

`panelItemClassName`  
Panel item element's class name. Default value is 'panel-item'.
