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
//or
import {ReactTabber} from 'react-tabber';
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
if you are using React and ReactTab in global variable mode, which means there is no module loader environment, `ReactTabber` will be a property of global scope.

## Prepare tabs array
You need to collect all components that want to put into tabs array.
Each array item has property `label` and `page`, which can be a string, a number, a native DOM element, or another React component.
for example:
```jsx
let tabs = [
  {label: 'label1', page: <div>content1</div>},
  {label: <span>label2</span>, page: <div>content2</div>},
];
```

## Render ReactTabber using tabs array
```jsx
ReactDOM.render(<ReactTabber tabs={tabs}/>, document.getElementById('container'));
```
While `tabs` is a mandatory property for the ReactTab component, there are also other optional properties you maybe interested in.
See the "Properties" part below.

# Including CSS
By default, "react-tabber" module do not have any CSS style applied, which means all tab pages are always visible on the page.
To hide non-active tab pages, just applying CSS by "inactive" class(controlled by property `pageItemInactiveClassName`) to hide them.

ReactTabber provides default CSS styles if you don't want to make it yourself. It also provides default skin.
To use that, importing module `react-tabber/with-css` instead of `react-tabber`.
For global variable mode, referencing the '-with-css' bundle file.

# Properties
`tabs`  
Specify tabs you want to render as a tab, should be an array of rendering items, which has property `label` and `page`.
`label` will be shown on tab label container, which allows user to switch tabs if it is not disabled by property `clickSwitch` or `hoverSwitch`.
`page` is the content of the tab.

`tabContainerClassName`  
Tab container element's class name. Default value is 'tab-container';

`labelContainerClassName`  
Label container element's class name. Default value is 'label-container';

`labelItemClassName`  
Label item element's class name. Default value is 'label-item';

`labelItemActiveClassName`  
The active(switched) label item element's class name. Default value is 'label-active';

`labelItemInactiveClassName`  
Non-active label item element's class name. Default value is 'label-inactive';

`pageContainerClassName`  
Page container element's class name. Default value is 'page-container';

`pageItemClassName`  
Page item element's class name. Default value is 'page-item';

`pageItemActiveClassName`  
The active(switched) page item element's class name. Default value is 'page-active';

`pageItemInactiveClassName`  
Non-active page item element's class name. Default value is 'page-inactive';

`activeIndex`  
Specify the initial active(switched) tab index. Starting from 0.

`showTopLabel`  
If show label container on top of tab page. Default is true.

`showBottomLabel`  
If show label container under bottom of tab page. Default is false.

`clickSwitch`  
Specify if user can click a label item to switch to that tab page.

`hoverSwitch`  
Specify if user can hover on a label item to switch to that tab page.

`hoverSwitchDelay`  
Specify how long in milliseconds delay before switching, which is triggered by hover. Only available if `hoverSwitch` is true. Default value is 0.

`leaveCancelSwitch`  
Specify if the delayed switch should be canceled when user stop hovering a label item within `hoverSwitchDelay` period of time.

`onSwitch(oldIndex, newIndex)`  
A callback will be invoked when switching tab, current active index is `oldIndex`, and target index is `newIndex`.
