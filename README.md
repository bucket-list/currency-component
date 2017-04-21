### ABL Payment Summary Angular Module

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
  'abl-payment-summary'
]);
```
4. Include the component's html tag within a view:
```html
<payment-summary 
    unit="vm.unit" 
    language="'fr'"
    charges="vm.booking.pricing.charges"
    addons="vm.booking.addOns"
    total="vm.booking.total"
    nights="vm.booking.numberOfNights"
    guests="vm.booking.numberOfPeople"
    checkin="vm.booking.checkIn"
    checkout="vm.booking.checkOut">
</payment-summary>
```
#### Component Attributes

##### charges (Array)
```javascript
[
  {
    "label": "Fare Miti",
    "type": "aup",
    "amount": 1,
    "price": 3300000
  },
  {
    "label": "Daily Laundry",
    "type": "fee",
    "amount": 1,
    "price": 1300000,
    "$$hashKey": "object:12"
  },
  {
    "label": "GST",
    "type": "tax",
    "amount": 1,
    "percent": 10,
    "price": 330000,
    "$$hashKey": "object:13"
  }
]
```

##### addons (Array)
```javascript
[
  {
    "_id": "58a3a91e04676d28e7af2571",
    "updatedAt": "2017-04-05T23:48:05.478Z",
    "createdAt": "2017-02-15T01:04:30.227Z",
    "organization": "587041e62014771774c02f40",
    "label": "Breakfast",
    "type": "addon",
    "amount": 120000,
    "percentage": false,
    "charges": [],
    "chargeRepetition": "pppd",
    "id": "58a3a91e04676d28e7af2571",
    "quantity": 6,
    "$$hashKey": "object:6"
  },
  {
    "_id": "58b9df7cad1a364c0be81570",
    "updatedAt": "2017-04-05T23:49:05.214Z",
    "createdAt": "2017-03-03T21:26:20.331Z",
    "organization": "587041e62014771774c02f40",
    "label": "Champagne",
    "type": "addon",
    "amount": 500000,
    "percentage": false,
    "charges": [],
    "chargeRepetition": "trip",
    "id": "58b9df7cad1a364c0be81570",
    "quantity": 1,
    "$$hashKey": "object:7"
  }
]
```
##### checkin, checkout (moment.js compatible date)

##### nights, guests, total (string/integer)

##### language (string)
Key for transcluding translation of title from unit attribute:
```html
{{$ctrl.unit.strings[$ctrl.language].title}}
```


