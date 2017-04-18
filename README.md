### ABL Payment Summary Angular Module

#### Development with hot reloading Webpack dev server
1. npm run start
2. http://localhost:9999 in your browser.
3. Packed module is output to *./dst* folder.

The sample Angular Material application to test your module during development is located in the *./samples* folder.


#### Adding the module to your app:
1. Include the webpacked .js file: *./dst/abl-payment-summary.js*
2. Include the .css file: *./dst/abl-payment-summary.css*
3. Include the module in your app dependencies:
```javascript
angular
.module('app', [
	'abl-payment-summary'
]);
```
4. Include the component's html tag within a view:
```html      
<payment-summary 
    booking="vm.booking" 
    unit="vm.unit" 
    language="'fr'"
    charges="vm.booking.pricing.charges"
    addOns="vm.booking.addOns"
    total="vm.booking.total"
    nights="vm.booking.numberOfNights"
    guests="vm.booking.numberOfPeople"
    checkin="vm.booking.checkIn"
    checkout="vm.booking.checkOut">
</payment-summary>
```