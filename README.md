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

## Prepare tabs array
You need to collect all components that want to put into tabs array.
Each array item has property `label` and `page`, which can be a string, a number, a native DOM element, another React component, or array of these types of item.
It also has an optional property `key` for the item which can improve performance if tabs array are changed dynamically and trigger render by it's parent component.
Here is the example of tabs array:
```jsx
let tabs = [
  {label: 'label1', page: <div>content1</div>, key: 'tab1'},
  {label: <span>label2</span>, page: <div>content2</div>, key: 'tab2'}
];
```

## Render ReactTabber using tabs array
```jsx
ReactDOM.render(<ReactTabber tabs={tabs}/>, document.getElementById('container'));
```
While `tabs` is a mandatory property for the ReactTabber component, there are also other optional properties you maybe interested in.
See the "Properties" part below.

# Including CSS
By default, "react-tabber" module do not have any CSS style applied, which means all tab pages are always visible on the page.
To hide non-active tab pages, just applying CSS by "inactive" class(controlled by property `pageItemInactiveClassName`) to hide them.

ReactTabber provides default CSS styles if you don't want to make it yourself. It also provides default skin.

## Use CSS bundled version
For module environment, importing module `react-tabber/with-css` instead of `react-tabber`.
For global variable mode, referencing the '-with-css' bundle file.

## Use standalone CSS file
Copying or referencing source CSS files under `src/css/` directory.

## Vertical labels
To use vertical labels style from default CSS, set `tabContainerClassName` to 'tab-container-vert'.
Notice that this style is implemented by CSS flex features, which means old browsers like IE10-, Chrome 20- and Firefox 27- are not supported.
```jsx
ReactDOM.render(<ReactTabber tabs={tabs} tabContainerClassName="tab-container-vert"/>, document.getElementById('container'));
```

# Properties
## Behavior Properties
`tabs`  
Specify tabs you want to render as a tab, should be an array of rendering items, which has property `label` and `page`.
`label` will be shown on tab label container, `page` is the content of the tab.

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
Specify the initial active(switched) tab index. Starting from 0.

`onSwitch(oldIndex, newIndex)`  
A callback will be invoked when switching tab, current active index is `oldIndex`, and target index is `newIndex`.

## UI Properties
### Tab
`tabContainerClassName`  
Tab container element's class name. Default value is 'tab-container';

### Label
`labelContainerClassName`  
Label container element's class name. Default value is 'label-container';

`showHeaderLabelContainer`  
If show label container before tab page. Default value is true.

`showFooterLabelContainer`  
If show label container after tab page. Default value is false.

`headerLabelContainerClassName`  
Header label container element's class name. Default value is 'header-container';

`footerLabelContainerClassName`  
Footer label container element's class name. Default value is 'footer-container';

`labelItemClassName`  
Label item element's class name. Default value is 'label-item';

`labelItemActiveClassName`  
The active(switched) label item element's class name. Default value is 'label-active';

`labelItemInactiveClassName`  
Non-active label item element's class name. Default value is 'label-inactive';

### Page
`pageContainerClassName`  
Page container element's class name. Default value is 'page-container';

`pageItemClassName`  
Page item element's class name. Default value is 'page-item';

`pageItemActiveClassName`  
The active(switched) page item element's class name. Default value is 'page-active';

`pageItemInactiveClassName`  
Non-active page item element's class name. Default value is 'page-inactive';
