# Selectify.js

### A way to control your selects

* The single dependency of Selectify.js is jQuery
* Include it and init, that's it

### What you can do with Selectify.js

* Trigger data load on another select change value
* Trigger data load on page load 
* Show the field as soon as you load the requested data
* Set dynamic data to your select-boxes
* Set placeholders for your select-boxes
* Listen for particular event to load the wanted data
* Show already hidden fields, however this time with the needed data

# Usage

You ought to initialize Selectify.js on a select element which you want to listen on for an event.

## 1. Use both html & javascript
```html
<select name="try" class="form-control" id="mySelect"></select>

<select name="foo" class="form-control"></select>
```
Then include jquery and Selectify.js or Selectify.min.js

```javascript
$('#mySelect').selectify({
	data: {
		content: 'data.json',
		opt: 'index',
		val: 'name'
	},
	container: 'foo',
	placeholder: 'Choose from the list',
	listenOn: 'change'
});
```
That's it, you are up & running.

## 2. Use html data-* attributes and just init using javascript

```html
<select name="try" class="form-control" id="mySelect"></select>

<select name="foo" class="form-control" data-content="data.json" data-opt="id" data-val="name" data-placeholder="Choose" data-listenOn="click"></select>
```
Then include jquery and Selectify.js or Selectify.min.js

```javascript
$('select[name=foo]').hide();
$('#mySelect').selectify();
```

# Available options
### data: { content } (string)
Represents the needed data to load in JSON format. It can be either a function or json file.
```javascript
data {
  content: 'data.json',
  opt: 'id',
  val: 'name'
}
```

### data: { opt } (string)
The object attribute, which will be set as value parameter for each option. 
```html 
<option value="opt"></option> 
```

### data: { val } (string)
The object attribute, which will be set as text for each option. 
```html 
<option value="">val</option> 
```

### container (string)
The container name(must be a select) in which we will load the data. It can be either:
* \#myField -> Selectify.js will search for element with id equeal to myField
* .myField -> Selectify.js will search for element with class equeal to myField
* myField  -> Selectify.js will search for element with name equeal to myField

### placeholder (string)
A string in which you can put a particular text to be appended before data load.

### toRemove (boolean)
Tell Selectify.js if you want to remove all current options into the container and then append the new data.

### ishidden (boolean)
Indicate if the container element is already hidden. If is set to true, the container will be shown after data load.

### listenOn (string)
Indicate the event you want Selectify.js to trigger on. The plugin listens on the object on which it is initialized. 

* If it is not specified the data will be loaded as soon as the page render finishes.

# Defaults
The default data loadded. However you need to set all data attibutes in order to run Selectify.js propertly.

```javascript
container: null, // The container we are willing to fill with data
ishidden: false, // Is this container hidden, if yes - then show
data: {
	content: null, // The content we need, which returns JSON formatted data, you can set either json file or function
	opt: null, // The JSON object param we are setting as value
	val: null // The JSON object param we are setting as option content
},
listenOn: null, // The jQuery event we are willing to trigger our selectify.js on
toRemove: true // Do we want to remove all the set options before appending the new one
```
