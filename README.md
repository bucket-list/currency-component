### ABL Currency Component Filter 

#### Generating a new module:
1. npm i
2. gulp generate --name abl-module-name

This will regenerate new module source code, package.json, and file names with the name argument you specify, in this example *abl-module-name*

#### Development with hot-reloading Webpack development server:
1. npm run start
2. http://localhost:9999 in your browser.
3. Packed module is output to *./dst* folder.

The sample Angular Material application to test your module during development is located in the *./samples* folder.

#### Build packaged distributable files (/dst):
1. npm run build

![screenshot](screen.png?raw=true)

#### Adding the module to your app:
1. Include the webpacked .js file: *./dst/abl-payment-summary.js*
2. Include the .css file: *./dst/abl-payment-summary.css*
3. Include the module in your app dependencies:
```javascript
angular
.module('app', [
  'currency-component'
]);
```
4. Use the filter:
```html
<span flex>{{ $ctrl.price | currencyFilter: 'eur' }}</span>
```
#### Filter Attributes

##### price (Integer)
```javascript
vm.price = 1234567890;
```
```html
<span flex>{{ $ctrl.price | currencyFilter: 'eur' }}</span>
```

##### currencyFilter (String)
```javascript
vm.price = 1234567890;
vm.currencyFilter = 'usd';
```
```html
<span flex>{{ $ctrl.price | currencyFilter: $ctrl.currencyFilter }}</span>
```


##### html (String)
```javascript
vm.price = 1234567890;
vm.currencyFilter = 'usd';
vm.html = 'html';
```
```html
<span flex>{{ $ctrl.price | currencyFilter: $ctrl.currencyFilter : $ctrl.html }}</span>
```

