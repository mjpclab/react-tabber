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
    > .page-container
        > .page-item
        > .page-item
        > .page-item
        > .page-item
        > ...
```

# Usage
## Import ReactTabber module
*Import in ES6 module environment*  
```javascript
import ReactTabber from 'react-tabber';
```

*Import in commonjs environment*  
```javascript
var ReactTabber = require('react-tabber');
```

*Import in AMD environment*  
```javascript
require(['react-tabber'], function(ReactTabber) {
  //you got ReactTabber component
});
```

*Using global variable mode*  
if you are using React and ReactTabber in global variable mode, which means there is no module loader environment, `ReactTabber` will be a property of global scope.

## Prepare tabs array and render
### By data structure
You need to collect all components that want to put into tabs array.
Each array item has property `label` and `page`, which can be a string, a number, a native DOM element, another React component, or array of these types of item.
It also has an optional property `key` for the item which can improve performance if tabs array are changed dynamically and trigger render by it's parent component.
Here is the example of tabs array:
```jsx
let tabs = [
  {label: 'label1', page: <div>content 1</div>, key: 'tab1'},
  {label: 'label2', page: <div>content 2</div>, key: 'tab2'}
];

ReactDOM.render(<ReactTabber tabs={tabs}/>, document.getElementById('container'));
```
### By JSX template
You can declare labels and pages by JSX template style. `ReactTabber.Label` represents a label and `ReactTabber.Page` represents a page.
Optional keys are specified onto `ReactTabber.Label`s.
Continues multiple `ReactTabber.Page`s are allowed, they are just belongs to the same closest `ReactTabber.Label`.
`ReactTabber.Page` Element can be omitted if inside contents has another element to wrap them.
```jsx
import ReactTabber from 'react-tabber';
ReactDOM.render(
	<ReactTabber>
		<ReactTabber.Label key="tab1">label1</ReactTabber.Label>
		<ReactTabber.Page>content 1</ReactTabber.Page>

		<ReactTabber.Label key="tab2">label2</ReactTabber.Label>
		<ReactTabber.Page>content 2</ReactTabber.Page>
	</ReactTabber>,
	document.getElementById('container')
);
```
For commonjs, AMD and global variable mode, import `ReactTabber`.
```javascript
//commonjs
var ReactTabber = require('react-tabber');

//AMD
require(['react-tabber'], function (ReactTabber) {
});

//global variable
//ReactTabber is a global variable.
```

# Including CSS
By default, "react-tabber" module do not have any CSS style applied, which means all tab pages are always visible on the page.
To hide non-active tab pages, just applying CSS by "inactive" class(controlled by property `pageItemInactiveClassName`) to hide them.

ReactTabber provides default CSS styles if you don't want to make it yourself. It also provides default skin.

## Use CSS bundled version
For module environment, importing module `react-tabber/with-css` instead of `react-tabber`.

For global variable mode, referencing the '-with-css' bundle file. Variable name will be `ReactTabberWithCss` insteadof `ReactTabber`.

## Use standalone CSS file
Copying or referencing source CSS files under `src/css/` directory.

## Vertical labels
To use vertical labels style from default CSS, set `tabContainerClassName` to 'tab-container-vert'.
Notice that this style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.
```jsx
ReactDOM.render(<ReactTabber tabs={tabs} tabContainerClassName="tab-container-vert"/>, document.getElementById('container'));
```

# Properties
Properties are options specified as attribute onto ReactTabber:
```jsx
<ReactTabber option1="value1" option2="value2"/>
```
## Behavior Properties
`tabs`  
Specify tabs you want to render as a tab, should be an array of rendering items, which has property `label`, `page` and optional `key`.
`label` will be shown on tab label container. `page` is the content of the tab. `key` is used to identify different tab labels and pages.

`triggerEvents`  
Determine the types of React Element events triggered on label-item that will make the page-item switched.
Can be an array of event names, or space separated event names. Default value is `['onClick']`.

`delayTriggerEvents`  
Specify React Element events on label-item that will trigger page switch after delay a small piece of time.
Quite useful if you want to keep hover a little time before switching.

`delayTriggerCancelEvents`  
Specify events on label-item that will cancel delay switching.

`delayTriggerLatency`  
Specify how long (in milliseconds) need to wait before trigger the delayed switching events.

`activeIndex`  
Specify the active(switched) tab index. Starting from 0.
When this property is changed, will switch to the specified tab.
If this property is not changed during re-rendering, will remain its last state, which may already be switched to another one by user.
Subscribe event `switched` to get informed.

`onSwitching(oldIndex, newIndex)`  
A callback will be invoked when start switching tab, current active index is `oldIndex`, and target index is `newIndex`.
Subscribe this event if you want to know a switching is performed as early as possible.

`onSwitched(oldIndex, newIndex)`  
A callback will be invoked when finish switching tab, previous active index is `oldIndex`, and current index is `newIndex`.
Subscribe this event if you want to do some work based on result of switching(e.g. get the height of the component).

## UI Properties
### Tab
`tabContainerClassName`  
Tab container element's class name. Default value is 'tab-container'.

### Label
`labelContainerClassName`  
Label container element's class name. Default value is 'label-container'.

`showHeaderLabelContainer`  
If show label container before tab page. Default value is true.

`showFooterLabelContainer`  
If show label container after tab page. Default value is false.

`headerLabelContainerClassName`  
Header label container element's class name. Default value is 'header-container'.

`footerLabelContainerClassName`  
Footer label container element's class name. Default value is 'footer-container'.

`labelItemClassName`  
Label item element's class name. Default value is 'label-item'.

`labelItemActiveClassName`  
The active(switched) label item element's class name. Default value is 'label-active'.

`labelItemInactiveClassName`  
Non-active label item element's class name. Default value is 'label-inactive'.

### Page
`pageContainerClassName`  
Page container element's class name. Default value is 'page-container'.

`pageItemClassName`  
Page item element's class name. Default value is 'page-item'.

`pageItemActiveClassName`  
The active(switched) page item element's class name. Default value is 'page-active'.

`pageItemInactiveClassName`  
Non-active page item element's class name. Default value is 'page-inactive'.
