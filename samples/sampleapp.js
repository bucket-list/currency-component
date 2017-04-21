//  Build our app module, with a dependency on the new angular module.
var app = angular.module('sampleapp', ['ngAnimate', 'ngMaterial', 'abl-payment-summary']);

app.controller('SampleController', ['$scope', function($scope) {

  var vm = this;

  vm.booking = {
  "checkIn": "2017-04-06",
  "checkOut": "2017-04-16",
  "numberOfNights": 2,
  "numberOfPeople": 3,
  "prices": [],
  "pricing": {
    "total": 5,
    "charges": [
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
        "price": 1300000
      },
      {
        "label": "GST",
        "type": "tax",
        "amount": 1,
        "percent": 10,
        "price": 330000
      },
      {
        "label": "PST",
        "type": "tax",
        "amount": 1,
        "percent": 10,
        "price": 363000
      },
      {
        "label": "Gratuity",
        "type": "fee",
        "amount": 1,
        "percent": 3,
        "owner": "abl",
        "price": 158790
      }
    ],
    "availableUnits": [
      {
        "_id": "5882653d67a9e00a0f997112",
        "title": "A"
      },
      {
        "_id": "5882653d67a9e00a0f997110",
        "title": "B"
      },
      {
        "_id": "5882653d67a9e00a0f99710e",
        "title": "C"
      }
    ]
  },
  "addOns": [
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
      "quantity": 6
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
      "quantity": 1
    },
    {
      "_id": "58acc5bc34563d0ea89247d4",
      "updatedAt": "2017-04-05T23:52:11.076Z",
      "createdAt": "2017-02-21T22:57:00.796Z",
      "organization": "587041e62014771774c02f40",
      "label": "Fishing Excursion",
      "type": "addon",
      "amount": 900000,
      "percentage": false,
      "charges": [
        {
          "_id": "58acc5a034563d0ea89247c5",
          "updatedAt": "2017-02-21T22:56:32.128Z",
          "createdAt": "2017-02-21T22:56:32.128Z",
          "organization": "587041e62014771774c02f40",
          "label": "GST",
          "type": "tax",
          "amount": 10,
          "percentage": true,
          "charges": [],
          "chargeRepetition": "trip",
          "id": "58acc5a034563d0ea89247c5"
        }
      ],
      "chargeRepetition": "trip",
      "id": "58acc5bc34563d0ea89247d4",
      "quantity": 3
    }
  ],
  "checkin": "2017-06-13T07:00:00.000Z",
  "checkout": "2017-06-15T07:00:00.000Z",
  "subtotal": 5,
  "subtotalByGuests": 15,
  "taxesFees": 4,
  "total": 3920019
};

  vm.unit ={
  "_id": "5874273efeb930061127a514",
  "createdAt": "2017-01-10T02:45:46.922Z",
  "updatedAt": "2017-04-06T00:05:22.129Z",
  "names": [],
  "organization": {
    "_id": "587041e62014771774c02f40",
    "updatedAt": "2017-04-05T23:54:30.291Z",
    "createdAt": "2017-01-07T01:18:30.381Z",
    "contactPhoneNumber": "3333422222",
    "contactFullName": "asds adsda",
    "alwaysRefundable": false,
    "cancellationPolicyDays": 12,
    "role": "host",
    "domainName": "http://ralko.org",
    "payments": {
      "stripeAccount": "58a4d178e3768c5179e019a2"
    },
    "addRulesToPropertiesOnCreate": false,
    "languages": {
      "sp": false,
      "fr": true,
      "en": true
    },
    "language": "fr",
    "reminders": {
      "email": false,
      "sms": false,
      "id": null
    },
    "primaryContact": {
      "email": "adam@ralko.com",
      "phoneNumber": "3333422222",
      "fullName": "Adam Ralko"
    },
    "social": {
      "tripadvisor": "",
      "twitter": "",
      "instagram": "",
      "facebook": ""
    },
    "preferences": {
      "widget": {
        "display": {
          "timeslot": {
            "startTime": true,
            "price": true,
            "duration": true,
            "availability": true
          },
          "theme": "blue",
          "event": {
            "isSiteWide": true,
            "cutoff": 2880
          }
        }
      },
      "customFields": {
        "prior": 15,
        "notes": "Notes"
      },
      "affiliate": {
        "includeAddons": false
      },
      "features": {
        "affiliates": false,
        "questions": false,
        "guides": false,
        "coupons": false
      },
      "id": null
    },
    "companyImage": "https://photos.ablsolution.com/97be7f7dc09e590981150965aec9b2afcf27bdf89842177b6539c038fec2b5a5-resized.jpeg",
    "companyName": "Intercontinental Resorts",
    "groups": [
      "host",
      "tahiti"
    ],
    "applicationFee": 3,
    "organizations": [],
    "location": {
      "_id": "587041e62014771774c02f3f",
      "searchTerms": [],
      "location": {
        "coordinates": [
          0,
          0
        ],
        "type": "Point"
      },
      "zoom": 12,
      "streetAddress2": "",
      "streetAddress": "",
      "tag": "Main Location",
      "id": "587041e62014771774c02f3f"
    },
    "bookings": null,
    "id": "587041e62014771774c02f40"
  },
  "property": {
    "_id": "588a88a9290755543a0a49f7",
    "organization": "587041e62014771774c02f40",
    "contactImage": "",
    "createdAt": "2017-01-26T23:46:09.922Z",
    "instagram": "",
    "meals": [],
    "near": [],
    "rate": {
      "updatedAt": "2017-01-26T23:46:29.147Z",
      "createdAt": "2017-01-26T23:46:29.147Z",
      "_id": "588a8a1c59b0436b4bc4c163",
      "dailyRateType": "same",
      "blackouts": [],
      "exceptions": [],
      "weekly": {
        "mn": null,
        "wk": null,
        "su": null,
        "sa": null,
        "fr": null,
        "th": null,
        "we": null,
        "tu": null,
        "mo": null
      }
    },
    "rules": [],
    "updatedAt": "2017-04-05T23:58:11.076Z",
    "type": "hotel",
    "status": "active",
    "strings": {
      "es": {
        "description": "",
        "tagline": "",
        "title": ""
      },
      "fr": {
        "description": "Built in 1997, Fare Edith is a distinct addition to Moorea Island and a smart choice for travelers. Situated only 5 km from the city center, guests are well located to enjoy the town’s attractions and activities. Visitors to the hotel can take pleasure in touring the city’s top attractions: Opunohu Bay, Mount Tohivea, Cook’s Bay.\n\nFare Edith also offers many facilities to enrich your stay in Moorea Island. A selection of top-class facilities such as free Wi-Fi in all rooms, luggage storage, Wi-Fi in public areas, car park, BBQ facilities can be enjoyed at the hotel.\n\nThe ambiance of Fare Edith is reflected in every guestroom. internet access – wireless (complimentary), internet access – wireless, non smoking rooms, air conditioning, balcony/terrace are just some of the facilities that can be found throughout the property. Throughout the day you can enjoy the relaxing atmosphere of the private beach, children’s playground, water sports (non-motorized). Discover an engaging blend of professional service and a wide array of features at Fare Edith.\n\n",
        "tagline": "Moorea Island",
        "title": "Fare Edith"
      },
      "en": {
        "description": "Built in 1997, Fare Edith is a distinct addition to Moorea Island and a smart choice for travelers. Situated only 5 km from the city center, guests are well located to enjoy the town’s attractions and activities. Visitors to the hotel can take pleasure in touring the city’s top attractions: Opunohu Bay, Mount Tohivea, Cook’s Bay.\n\nFare Edith also offers many facilities to enrich your stay in Moorea Island. A selection of top-class facilities such as free Wi-Fi in all rooms, luggage storage, Wi-Fi in public areas, car park, BBQ facilities can be enjoyed at the hotel.\n\nThe ambiance of Fare Edith is reflected in every guestroom. internet access – wireless (complimentary), internet access – wireless, non smoking rooms, air conditioning, balcony/terrace are just some of the facilities that can be found throughout the property. Throughout the day you can enjoy the relaxing atmosphere of the private beach, children’s playground, water sports (non-motorized). Discover an engaging blend of professional service and a wide array of features at Fare Edith.\n\n",
        "tagline": "Moorea Island",
        "title": "Fare Edith",
        "unit": {
          "description": "",
          "tagline": "Luxury Bungalows",
          "title": "Fare Miti"
        }
      }
    },
    "checkout": {
      "minute": 0,
      "hour": 11
    },
    "checkin": {
      "minute": 0,
      "hour": 16
    },
    "tiles": "Streets",
    "diamonds": 5,
    "timeZone": "America/Swift_Current",
    "houseRules": [],
    "charges": [
      {
        "_id": "58a3a90f04676d28e7af2566",
        "updatedAt": "2017-04-05T23:53:34.386Z",
        "createdAt": "2017-02-15T01:04:15.924Z",
        "organization": "587041e62014771774c02f40",
        "label": "Cleaning Fee",
        "type": "fee",
        "amount": 1300000,
        "percentage": false,
        "charges": [],
        "chargeRepetition": "trip",
        "id": "58a3a90f04676d28e7af2566"
      },
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
        "id": "58a3a91e04676d28e7af2571"
      },
      {
        "_id": "58acc5a034563d0ea89247c5",
        "updatedAt": "2017-02-21T22:56:32.128Z",
        "createdAt": "2017-02-21T22:56:32.128Z",
        "organization": "587041e62014771774c02f40",
        "label": "GST",
        "type": "tax",
        "amount": 10,
        "percentage": true,
        "charges": [],
        "chargeRepetition": "trip",
        "id": "58acc5a034563d0ea89247c5"
      },
      {
        "_id": "58acf0bd21491f4db1c36f4e",
        "updatedAt": "2017-02-22T02:00:29.456Z",
        "createdAt": "2017-02-22T02:00:29.456Z",
        "organization": "587041e62014771774c02f40",
        "label": "PST",
        "type": "tax",
        "amount": 10,
        "percentage": true,
        "charges": [],
        "chargeRepetition": "trip",
        "id": "58acf0bd21491f4db1c36f4e"
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
        "id": "58b9df7cad1a364c0be81570"
      },
      {
        "_id": "58acc5bc34563d0ea89247d4",
        "updatedAt": "2017-04-05T23:52:11.076Z",
        "createdAt": "2017-02-21T22:57:00.796Z",
        "organization": "587041e62014771774c02f40",
        "label": "Fishing Excursion",
        "type": "addon",
        "amount": 900000,
        "percentage": false,
        "charges": [
          {
            "_id": "58acc5a034563d0ea89247c5",
            "updatedAt": "2017-02-21T22:56:32.128Z",
            "createdAt": "2017-02-21T22:56:32.128Z",
            "organization": "587041e62014771774c02f40",
            "label": "GST",
            "type": "tax",
            "amount": 10,
            "percentage": true,
            "charges": [],
            "chargeRepetition": "trip",
            "id": "58acc5a034563d0ea89247c5"
          }
        ],
        "chargeRepetition": "trip",
        "id": "58acc5bc34563d0ea89247d4"
      }
    ],
    "activities": [],
    "amenities": [
      "Deck",
      "Bar",
      "Billiards",
      "BBQ",
      "Beach",
      "Breakfast",
      "Bike",
      "Car",
      "Cleaning Service",
      "Coffee Maker",
      "Community Kitchen",
      "Community Living Room",
      "Daily Cleaning"
    ],
    "defaultImage": "https://photos.ablsolution.com/b57cf7bcbb5607793dc7878c5e64d7184c206c6ad45409679952c63280c5bf72.jpeg",
    "images": [
      "bd3dd0ed9cfe4cccd1a3c03415f62de4b9b6d08daa8b3a2fedc175e9844d5b87.jpeg",
      "e2f99b90c621050cbc3419cabff88c6fe27c05e63dd5451e8ed2270818648f0f.jpeg",
      "https://photos.ablsolution.com/b57cf7bcbb5607793dc7878c5e64d7184c206c6ad45409679952c63280c5bf72.jpeg"
    ],
    "location": {
      "city": "Moorea",
      "state": "Haapiti",
      "zipCode": "98728",
      "_id": "588a8a1c59b0436b4bc4c164",
      "searchTerms": [],
      "location": {
        "coordinates": [
          -149.86827850341797,
          -17.556778881539657
        ],
        "type": "Point"
      },
      "zoom": 15,
      "streetAddress2": "",
      "streetAddress": "Moorea, Haapiti",
      "tag": "Main Location",
      "id": "588a8a1c59b0436b4bc4c164"
    },
    "social": {
      "tripadvisor": "",
      "instagram": "",
      "twitter": "",
      "facebook": ""
    },
    "primaryContact": {
      "email": "adam@ralko.com",
      "secondaryPhoneNumber": "",
      "phoneNumber": "3065842440",
      "fullName": "Adam Ralko",
      "image": ""
    },
    "unitTypes": null,
    "id": "588a88a9290755543a0a49f7"
  },
  "images": [
    "https://photos.ablsolution.com/233b9974367ff52aa4b67d4de6a775a5c0171d611739b365b737d534a3af734a.jpeg"
  ],
  "status": "active",
  "published": true,
  "strings": {
    "es": {
      "description": "",
      "tagline": "",
      "title": ""
    },
    "fr": {
      "description": "",
      "tagline": "Le plus grand bungalow de construction local du Fare Edith. ",
      "title": "Fare Miti"
    },
    "en": {
      "description": "",
      "tagline": "Luxury Bungalows",
      "title": "Fare Miti"
    }
  },
  "units": [
    {
      "title": "A",
      "_id": "5882653d67a9e00a0f997112",
      "rate": {
        "updatedAt": "2017-01-20T19:30:06.003Z",
        "createdAt": "2017-01-20T19:30:06.003Z",
        "_id": "5882653d67a9e00a0f997111",
        "dailyRateType": "same",
        "blackouts": [],
        "exceptions": [],
        "weekly": {
          "mn": null,
          "wk": null,
          "su": null,
          "sa": null,
          "fr": null,
          "th": null,
          "we": null,
          "tu": null,
          "mo": null
        }
      },
      "id": "5882653d67a9e00a0f997112"
    },
    {
      "title": "B",
      "_id": "5882653d67a9e00a0f997110",
      "rate": {
        "updatedAt": "2017-01-20T19:30:06.004Z",
        "createdAt": "2017-01-20T19:30:06.004Z",
        "_id": "5882653d67a9e00a0f99710f",
        "dailyRateType": "same",
        "blackouts": [],
        "exceptions": [],
        "weekly": {
          "mn": null,
          "wk": null,
          "su": null,
          "sa": null,
          "fr": null,
          "th": null,
          "we": null,
          "tu": null,
          "mo": null
        }
      },
      "id": "5882653d67a9e00a0f997110"
    },
    {
      "title": "C",
      "_id": "5882653d67a9e00a0f99710e",
      "rate": {
        "updatedAt": "2017-01-20T19:30:06.006Z",
        "createdAt": "2017-01-20T19:30:06.006Z",
        "_id": "5882653d67a9e00a0f99710d",
        "dailyRateType": "same",
        "blackouts": [],
        "exceptions": [],
        "weekly": {
          "mn": null,
          "wk": null,
          "su": null,
          "sa": null,
          "fr": null,
          "th": null,
          "we": null,
          "tu": null,
          "mo": null
        }
      },
      "id": "5882653d67a9e00a0f99710e"
    }
  ],
  "timeZone": "Canada/Saskatchewan",
  "guests": 6,
  "size": {
    "unit": "ft",
    "amount": 1100
  },
  "beds": {
    "single": 0,
    "sofa": 0,
    "double": 1,
    "queen": 1,
    "king": 1
  },
  "rooms": {
    "parking": {
      "privacy": "Private",
      "count": 0
    },
    "balcony": {
      "privacy": "Private",
      "count": 0
    },
    "laundry": {
      "privacy": "Private",
      "count": 0
    },
    "kitchen": {
      "privacy": "Private",
      "count": 0
    },
    "bathroom": {
      "privacy": "Private",
      "count": 1
    },
    "bedroom": {
      "privacy": "Shared",
      "count": 1
    }
  },
  "defaultImage": "https://photos.ablsolution.com/b57cf7bcbb5607793dc7878c5e64d7184c206c6ad45409679952c63280c5bf72.jpeg",
  "amenities": [
    "Ceiling Fans",
    "Mosquito Nets",
    "Parking",
    "Restaurant",
    "Room Fans",
    "Snorkeling Gear",
    "Swimming Pool",
    "Washing Machines",
    "Airport Shuttle",
    "Bar",
    "Billiards",
    "BBQ",
    "Beach",
    "Breakfast",
    "Bike",
    "Car",
    "Cleaning Service",
    "Coffee Maker",
    "Community Kitchen",
    "Community Living Room"
  ],
  "rate": {
    "updatedAt": "2017-04-06T00:05:22.128Z",
    "createdAt": "2017-01-18T22:04:06.947Z",
    "_id": "587fe6563ad32356ead5f102",
    "dailyRateType": "weekend",
    "blackouts": [],
    "currency": "XFP",
    "exceptions": [
      {
        "date": "2017-01-19T08:00:00.000Z",
        "amount": 111,
        "_id": "5882931b269f4578b8167013",
        "id": "5882931b269f4578b8167013"
      },
      {
        "date": "2017-02-01T00:00:00.000Z",
        "_id": "589243bad89ce730994def2c",
        "id": "589243bad89ce730994def2c"
      }
    ],
    "weekly": {
      "su": 1300000,
      "sa": 1300000,
      "fr": 1100000,
      "th": 1100000,
      "we": 1100000,
      "tu": 1100000,
      "mo": 1100000
    },
    "id": "587fe6563ad32356ead5f102"
  },
  "image": "https://photos.ablsolution.com/233b9974367ff52aa4b67d4de6a775a5c0171d611739b365b737d534a3af734a.jpeg",
  "id": "5874273efeb930061127a514",
  "completeness": {
    "missingFields": []
  },
  "currentLanguageProperty": {
    "description": "Built in 1997, Fare Edith is a distinct addition to Moorea Island and a smart choice for travelers. Situated only 5 km from the city center, guests are well located to enjoy the town’s attractions and activities. Visitors to the hotel can take pleasure in touring the city’s top attractions: Opunohu Bay, Mount Tohivea, Cook’s Bay.\n\nFare Edith also offers many facilities to enrich your stay in Moorea Island. A selection of top-class facilities such as free Wi-Fi in all rooms, luggage storage, Wi-Fi in public areas, car park, BBQ facilities can be enjoyed at the hotel.\n\nThe ambiance of Fare Edith is reflected in every guestroom. internet access – wireless (complimentary), internet access – wireless, non smoking rooms, air conditioning, balcony/terrace are just some of the facilities that can be found throughout the property. Throughout the day you can enjoy the relaxing atmosphere of the private beach, children’s playground, water sports (non-motorized). Discover an engaging blend of professional service and a wide array of features at Fare Edith.\n\n",
    "tagline": "Moorea Island",
    "title": "Fare Edith",
    "unit": {
      "description": "",
      "tagline": "Luxury Bungalows",
      "title": "Fare Miti"
    }
  }
};

vm.activites = [
  {
    "_id": "58f6582729b91959f32bf46a",
    "originalTitle": "9/11 was an inside job ",
    "originalDescription": "jet fuel can't melt steel beams jet fuel can't melt steel beams jet fuel can't melt steel beams jet fuel can't melt steel beams jet fuel can't melt steel beams ",
    "location": {
      "_id": "58f6582729b91959f32bf469",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/T7Vxe02La0EdBYwIPXgX.jpg"
    ],
    "title": "9/11 was an inside job ",
    "description": "jet fuel can't melt steel beams jet fuel can't melt steel beams jet fuel can't melt steel beams jet fuel can't melt steel beams jet fuel can't melt steel beams ",
    "status": "active",
    "widgetOrder": 0,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [
      "tin foil hat",
      "liberal arts degree"
    ],
    "isListed": false,
    "cutoff": -1,
    "color": "3333CC",
    "questions": [],
    "charges": [],
    "timeslots": [],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/T7Vxe02La0EdBYwIPXgX.jpg",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2218"
  },
  {
    "_id": "58f6551929b91959f32bf455",
    "originalTitle": "a coconuts a coconuts a coconuts",
    "originalDescription": "a coconuts a coconuts a coconutsa coconuts a coconuts a coconutsa coconuts a coconuts a coconutsa coconuts a coconuts a coconutsa coconuts a coconuts a coconuts",
    "location": {
      "_id": "58f6551929b91959f32bf454",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/TTpB1n1RKWGd61ON23wq.jpg"
    ],
    "title": "a coconuts a coconuts a coconuts",
    "description": "a coconuts a coconuts a coconutsa coconuts a coconuts a coconutsa coconuts a coconuts a coconutsa coconuts a coconuts a coconutsa coconuts a coconuts a coconuts",
    "status": "active",
    "widgetOrder": 0,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "336633",
    "questions": [],
    "charges": [],
    "timeslots": [],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/TTpB1n1RKWGd61ON23wq.jpg",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2219"
  },
  {
    "_id": "58f6587b29b91959f32bf46f",
    "originalTitle": "cake farts & wine",
    "originalDescription": " Moist chocolate cupcakes infused with sweet red wine. They're filled with red wine ganache and topped with a whipped cream-cream cheese wine frosting.",
    "location": {
      "_id": "58f6587b29b91959f32bf46e",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/yiz7eaCUGyEeNQS4gEa0.jpg"
    ],
    "title": "cake farts & wine",
    "description": " Moist chocolate cupcakes infused with sweet red wine. They're filled with red wine ganache and topped with a whipped cream-cream cheese wine frosting.",
    "status": "active",
    "widgetOrder": 0,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "993399",
    "questions": [],
    "charges": [],
    "timeslots": [
      {
        "_id": "58f6588829b91959f32bf472",
        "eventId": "a6d269kn6juq29ushq3fvlpl94",
        "originalUntilTime": null,
        "originalEndTime": "2017-04-30T19:00:00.000Z",
        "originalStartTime": "2017-04-30T17:00:00.000Z",
        "originalDescription": " Moist chocolate cupcakes infused with sweet red wine. They're filled with red wine ganache and topped with a whipped cream-cream cheese wine frosting.",
        "originalTitle": "cake farts & wine",
        "originalMaxOcc": 1,
        "originalMinOcc": 1,
        "endTime": "2017-04-30T19:00:00.000Z",
        "maxOcc": 1,
        "startTime": "2017-04-30T17:00:00.000Z",
        "activity": "58f6587b29b91959f32bf46f",
        "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
        "status": "active",
        "description": " Moist chocolate cupcakes infused with sweet red wine. They're filled with red wine ganache and topped with a whipped cream-cream cheese wine frosting.",
        "title": "cake farts & wine",
        "minOcc": 1,
        "untilTime": "2017-04-30T17:00:00.000Z",
        "daysRunning": [],
        "originalDaysRunning": [],
        "single": true,
        "timeZone": "America/Los_Angeles",
        "discounts": [],
        "charges": [
          {
            "_id": "58f6588829b91959f32bf471",
            "amount": 8800,
            "name": "Adult",
            "type": "aap",
            "status": "active",
            "isDefault": true,
            "frequency": "Daily",
            "percentage": false,
            "operator": "58ebc70f73b1141f5ed7d028"
          }
        ],
        "events": [],
        "guides": [],
        "isDaysRunningChanged": false,
        "isUntilTimeChanged": false,
        "isEndTimeChanged": false,
        "isStartTimeChanged": false,
        "operator": "58ebc70f73b1141f5ed7d028",
        "isDescriptionChanged": false,
        "isTitleChanged": false,
        "isMaxOccChanged": false,
        "isMinOccChanged": false
      }
    ],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/yiz7eaCUGyEeNQS4gEa0.jpg",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2220"
  },
  {
    "_id": "58f6554f29b91959f32bf45a",
    "originalTitle": "poopios pasta party",
    "originalDescription": "poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party ",
    "location": {
      "_id": "58f6554f29b91959f32bf459",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/PyGCCgqLBSN1GL9aTWKu.jpg"
    ],
    "title": "poopios pasta party",
    "description": "poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party ",
    "status": "active",
    "widgetOrder": 0,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "CC6600",
    "questions": [],
    "charges": [],
    "timeslots": [
      {
        "_id": "58f6555929b91959f32bf45d",
        "eventId": "8leqf60eedd4l2b8e4d1rhs3rk",
        "originalUntilTime": null,
        "originalEndTime": "2017-04-29T19:00:00.000Z",
        "originalStartTime": "2017-04-29T17:00:00.000Z",
        "originalDescription": "poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party ",
        "originalTitle": "poopios pasta party",
        "originalMaxOcc": 1,
        "originalMinOcc": 1,
        "endTime": "2017-04-29T19:00:00.000Z",
        "maxOcc": 1,
        "startTime": "2017-04-29T17:00:00.000Z",
        "activity": "58f6554f29b91959f32bf45a",
        "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
        "status": "active",
        "description": "poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party poopios pasta party ",
        "title": "poopios pasta party",
        "minOcc": 1,
        "untilTime": "2017-04-29T17:00:00.000Z",
        "daysRunning": [],
        "originalDaysRunning": [],
        "single": true,
        "timeZone": "America/Los_Angeles",
        "discounts": [],
        "charges": [
          {
            "_id": "58f6555929b91959f32bf45c",
            "amount": 11100,
            "name": "Adult",
            "type": "aap",
            "status": "active",
            "isDefault": true,
            "frequency": "Daily",
            "percentage": false,
            "operator": "58ebc70f73b1141f5ed7d028"
          }
        ],
        "events": [],
        "guides": [],
        "isDaysRunningChanged": false,
        "isUntilTimeChanged": false,
        "isEndTimeChanged": false,
        "isStartTimeChanged": false,
        "operator": "58ebc70f73b1141f5ed7d028",
        "isDescriptionChanged": false,
        "isTitleChanged": false,
        "isMaxOccChanged": false,
        "isMinOccChanged": false
      }
    ],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/PyGCCgqLBSN1GL9aTWKu.jpg",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2221"
  },
  {
    "_id": "58f6577729b91959f32bf45f",
    "originalTitle": "that's nacho cheese ",
    "originalDescription": "that's nacho cheese that's nacho cheese that's nacho cheese that's nacho cheese that's nacho cheese that's nacho cheese ",
    "location": {
      "_id": "58f6577729b91959f32bf45e",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/HY5J5kNPqFKkYWxDDHLQ.png"
    ],
    "title": "that's nacho cheese ",
    "description": "that's nacho cheese that's nacho cheese that's nacho cheese that's nacho cheese that's nacho cheese that's nacho cheese ",
    "status": "active",
    "widgetOrder": 0,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "FFCC33",
    "questions": [],
    "charges": [],
    "timeslots": [],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/HY5J5kNPqFKkYWxDDHLQ.png",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2222"
  },
  {
    "_id": "58ebc87573b1141f5ed7d032",
    "originalTitle": "Dino Bounce",
    "originalDescription": "Bouncey castle within pit of poisonous snakes for prosperity.",
    "location": {
      "_id": "58ebc87573b1141f5ed7d031",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/Ytu8Wh8hTzVRFw125QYb.jpg"
    ],
    "title": "Dino Bounce",
    "description": "Bouncey castle within pit of poisonous snakes for prosperity.",
    "status": "active",
    "widgetOrder": 1,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "FF33FF",
    "questions": [],
    "charges": [],
    "timeslots": [],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/Ytu8Wh8hTzVRFw125QYb.jpg",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2223"
  },
  {
    "_id": "58ee85571836ab64eaf9821c",
    "originalTitle": "wut wut in the butt",
    "originalDescription": "I said wut wut in the butt, also fuck your 50 character minimum",
    "location": {
      "_id": "58ee85571836ab64eaf9821b",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/Iz87SGFVrMipSWmvZxDa.png"
    ],
    "title": "I said wut wut in the butt, also fuck your 50 character minimum",
    "description": "I said wut wut in the butt, also fuck your 50 character minimum",
    "status": "active",
    "widgetOrder": 1,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "336633",
    "questions": [],
    "charges": [],
    "timeslots": [
      {
        "_id": "58f5461f29b91959f32bf406",
        "eventId": "vjh1ptvbttjhojvgspcmiphoq8",
        "originalUntilTime": null,
        "originalEndTime": "2017-04-27T19:00:00.000Z",
        "originalStartTime": "2017-04-27T17:00:00.000Z",
        "originalDescription": "I said wut wut in the butt, also fuck your 50 character minimum",
        "originalTitle": "I said wut wut in the butt, also fuck your 50 character minimum",
        "originalMaxOcc": 1,
        "originalMinOcc": 1,
        "endTime": "2017-04-27T19:00:00.000Z",
        "maxOcc": 1,
        "startTime": "2017-04-27T17:00:00.000Z",
        "activity": "58ee85571836ab64eaf9821c",
        "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
        "status": "active",
        "description": "I said wut wut in the butt, also fuck your 50 character minimum",
        "title": "I said wut wut in the butt, also fuck your 50 character minimum",
        "minOcc": 1,
        "untilTime": "2017-04-27T17:00:00.000Z",
        "daysRunning": [],
        "originalDaysRunning": [],
        "single": true,
        "timeZone": "America/Los_Angeles",
        "discounts": [],
        "charges": [
          {
            "_id": "58f5461f29b91959f32bf404",
            "amount": 200,
            "name": "Adult",
            "type": "aap",
            "status": "active",
            "isDefault": true,
            "frequency": "Daily",
            "percentage": false,
            "operator": "58ebc70f73b1141f5ed7d028"
          },
          {
            "_id": "58f5461f29b91959f32bf405",
            "amount": 100,
            "name": "Youth",
            "type": "aap",
            "status": "active",
            "isDefault": false,
            "frequency": "Daily",
            "percentage": false,
            "operator": "58ebc70f73b1141f5ed7d028"
          }
        ],
        "events": [
          "58f5495929b91959f32bf407"
        ],
        "guides": [],
        "isDaysRunningChanged": false,
        "isUntilTimeChanged": false,
        "isEndTimeChanged": false,
        "isStartTimeChanged": false,
        "operator": "58ebc70f73b1141f5ed7d028",
        "isDescriptionChanged": false,
        "isTitleChanged": false,
        "isMaxOccChanged": false,
        "isMinOccChanged": false
      }
    ],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/Iz87SGFVrMipSWmvZxDa.png",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2224"
  },
  {
    "_id": "58ec0495a812ab7ed02b400e",
    "originalTitle": "Blue Waffles",
    "originalDescription": "Free brunch at your mom's house every day of the week.",
    "location": {
      "_id": "58ec0495a812ab7ed02b400d",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/SttsOd6LYeL2z9ISPst6.jpg"
    ],
    "title": "Poop snacks with Tyler",
    "description": "Free brunch at your mom's house every day of the week.",
    "status": "active",
    "widgetOrder": 2,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "3333FF",
    "questions": [],
    "charges": [],
    "timeslots": [],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/SttsOd6LYeL2z9ISPst6.jpg",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2225"
  },
  {
    "_id": "58f654dc29b91959f32bf44f",
    "originalTitle": "dsfkdfskljsdfkljsdfkljdsfkljdsfjkldfsljkdfsjkldfsjkldfsjkl",
    "originalDescription": "sakljsdalkjsadlksjadlksadsdjklasdlakjsdakljdskljsdjklsdjklsd",
    "location": {
      "_id": "58f654dc29b91959f32bf44e",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/UMoS50hRRSyRjorWC4FI.png"
    ],
    "title": "dsfkdfskljsdfkljsdfkljdsfkljdsfjkldfsljkdfsjkldfsjkldfsjkl",
    "description": "sakljsdalkjsadlksjadlksadsdjklasdlakjsdakljdskljsdjklsdjklsd",
    "status": "active",
    "widgetOrder": 3,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "336633",
    "questions": [],
    "charges": [],
    "timeslots": [],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/UMoS50hRRSyRjorWC4FI.png",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2226"
  },
  {
    "_id": "58f657a929b91959f32bf464",
    "originalTitle": "poop snacks with Blake ",
    "originalDescription": "poop snacks with Blake poop snacks with Blake poop snacks with Blake poop snacks with Blake poop snacks with Blake poop snacks with Blake ",
    "location": {
      "_id": "58f657a929b91959f32bf463",
      "city": "Regina",
      "country": "Canada",
      "state": "Saskatchewan",
      "zipCode": "S4S 4P6",
      "location": {
        "coordinates": [
          -104.605758,
          50.4153189
        ],
        "type": "Point"
      },
      "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
      "tag": "Main Location"
    },
    "images": [
      "https://dev-images.ablsolution.com/FNTCAgzCXNHEffR1szRr.jpg"
    ],
    "title": "poop snacks with Blake ",
    "description": "poop snacks with Blake poop snacks with Blake poop snacks with Blake poop snacks with Blake poop snacks with Blake poop snacks with Blake ",
    "status": "active",
    "widgetOrder": 3,
    "published": true,
    "whatToBring": [],
    "whatIncluded": [],
    "timeZone": "America/Los_Angeles",
    "requirements": [],
    "isListed": false,
    "cutoff": -1,
    "color": "663333",
    "questions": [],
    "charges": [],
    "timeslots": [],
    "operator": {
      "_id": "58ebc70f73b1141f5ed7d028",
      "calendarId": "malt0b7vp4k9q9a9lbc4v0bphg@group.calendar.google.com",
      "companyName": "ABL",
      "domainName": "http://a.ralko.com",
      "email": "adam+10@adventurebucketlist.com",
      "phoneNumber": "+17783023246",
      "location": {
        "_id": "58ebc70f73b1141f5ed7d027",
        "city": "Regina",
        "country": "Canada",
        "countryCode": "CA",
        "state": "Saskatchewan",
        "stateCode": "SK",
        "zipCode": "S4S 4P6",
        "location": {
          "coordinates": [
            -104.60575799999998,
            50.4153189
          ],
          "type": "Point"
        },
        "streetAddress": "40 Gardiner Ave, Regina, SK S4S 4P6, Canada",
        "tag": "Main Location"
      },
      "payment": "58ed5591a812ab7ed02b40d0",
      "lang": "en",
      "isEmailVerified": false,
      "status": "active",
      "stripeId": "cus_AS0lk1FsBd8qF3",
      "stripeSubscriptionId": "sub_AS0l6YOA6jXB4R",
      "social": {},
      "preferences": {
        "tripadvisorReviewEmail": {
          "delay": {
            "period": "hour",
            "number": 0
          },
          "active": false
        },
        "widget": {
          "display": {
            "timeslot": {
              "startTime": true,
              "price": true,
              "duration": true,
              "availability": true
            },
            "theme": "blue",
            "event": {
              "isSiteWide": true,
              "cutoff": 2880
            }
          }
        },
        "customFields": {
          "prior": 15,
          "notes": "Notes"
        },
        "affiliate": {
          "includeAddons": false
        },
        "features": {
          "affiliates": false,
          "questions": false,
          "guides": false,
          "coupons": true
        }
      },
      "companyImage": "",
      "applicationFee": 3,
      "createdDate": "2017-04-10T17:55:27.365Z",
      "fullName": "ABL"
    },
    "image": "https://dev-images.ablsolution.com/FNTCAgzCXNHEffR1szRr.jpg",
    "isTitleChanged": false,
    "isDescriptionChanged": false,
    "$$hashKey": "object:2227"
  }
];
}]);
