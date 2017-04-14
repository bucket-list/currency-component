//  Build our app module, with a dependency on the new angular module.
var app = angular.module('sampleapp', ['ngAnimate', 'ngMaterial', 'abl-payment-summary']);

app.controller('SampleController', ['$scope', function($scope) {

  var vm = this;

  vm.booking = {
  "checkIn": "2017-04-06",
  "checkOut": "2017-04-06",
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
}]);
