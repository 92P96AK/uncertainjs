
# UNCERTAINJS

uncertainjs is a Node.js package designed to get random element of an array. random int, floating integer, character, date, boolean, gender, graph, co-ordinate, normal, rgb, hex, hls, password, emoticon, noise, image url. it is also used to generate random string, number, name, sername, fullname, username, short description, long description, age, email, uuid2, uuid3, uuid4 and uuid5.

## Getting Started 
You can install uncertainjs via npm:

```bash
npm install uncertainjs
```
or by using yarn 

````bash
yarn add uncertainjs
````

## Usage

```js client
import { Random , Schema, RelationalSchema} from "uncertainjs";

const random = new Random();
```

## Features


### generateRandomObjectWithRelation

you can generate random relational object with specified schema.

name, username, fullName, firstName,lastName, serName, date,graph, cordinates, age, rgb, hex, hls, emoji, imageUrl, age, gender, email, uuid, shortDescription, longDescription, boolean, string, postalCode, password and  number are supported type.

to generate random object you need to define schema as 

```js client 
  const schema: RelationalSchema = {
    users: {
      id: {
        type: "uuid",
        isPrimary: true,
        required: false,
      },
      country: {
        type: "country",
        callback: (result: any) => {
          return result.name;
        },
      },
      coverImageUrl: { type: "imageUrl" },
      createdAt: { type: "date" },
      updatedAt: { type: "date", required: false },
      deletedAt: { type: "date", required: false },
      disabled: { type: "boolean" },
      dob: { type: "date" },
      email: { type: "email" },
    },
    settings: {
      id: {
        type: "uuid",
        isPrimary: true,
      },
      userId: {
        type: "uuid",
        foreignKey: "users.id",
      },
    },
  };
```
now simply calling 
```js client
  const response = random.generateRandomObjectWithRelation(schema);
```
you can get response as 

```js client 
{
  users: [
    {
      id: '01ef269dae626660-2a63-aa63-d13b7c-d13b7c',
      country: 'Cocos (Keeling) Islands',
      coverImageUrl: 'https://picsum.photos/800/600?random=7027562',
      createdAt: 2014-06-11T21:35:51.206Z,
      updatedAt: null,
      deletedAt: null,
      disabled: false,
      dob: 1974-09-10T08:48:50.055Z,
      email: 'odpb951@mailinator.com'
    }
  ],
  settings: [
    {
      id: '01ef269dae626660-1d3b-9d3b-03f2e3-03f2e3',
      userId: '01ef269dae626660-2a63-aa63-d13b7c-d13b7c'
    }
  ]
}
```


### generateRandomObject

you can generate random object with specified schema.

name, username, fullName, firstName,lastName, serName, date,graph, cordinates, age, rgb, hex, hls, emoji, imageUrl, age, gender, email, uuid, shortDescription, longDescription, boolean, string, postalCode, password and  number are supported type.

to generate random object you need to define schema as 

```js client 
 const schema: Schema = {
    id: "uuid",
    name: {
      firstName: "firstName",
      lastName: "serName",
    },
    password: "password",
    username: "username",
    emai: "email",
    age: "age",
    isActive: "boolean",
    bio: "shortDescription",
    thoughts: "longDescription",
    imageUrl: "imageUrl",
    address: {
      postalCode: "postalCode",
      cordinates: "cordinates",
      city: "string",
    },
    favouriteColor: "hex",
    dob: "date",
  };
```
now simply calling 
```js client
  const response = random.generateRandomObject(schema);
```
you can get response as 

```js client 
{
  id: '01ef0a4dc9eb5f20-091d-891d-1edd2b-1edd2b',
  name: { firstName: 'woxezid', lastName: 'jiowuul' },
  password: '/b9>tgR',
  username: 'mytp321',
  emai: 'uajz712@einrot.com',
  age: 48,
  isActive: true,
  bio: 'Charming project that incites your life.',
  thoughts: 'Impeccable creativity that amplifies your creativity and amplifies your Impeccable creativity.Impeccable creativity that amplifies your creativity and amplifies your Impeccable creativity.Rich transition that guides your transition and guides your Rich transition.Impeccable creativity that amplifies your creativity and amplifies your Impeccable creativity.Impeccable creativity that amplifies your creativity and amplifies your Impeccable creativity.Rich transition that guides your transition and guides your Rich transition.Graceful reporting that enriches your reporting and enriches your Graceful reporting.Impeccable creativity that amplifies your creativity and amplifies your Impeccable creativity.Impeccable creativity that amplifies your creativity and amplifies your Impeccable creativity.Rich transition that guides your transition and guides your Rich transition.Impeccable creativity that amplifies your creativity and amplifies your Impeccable creativity.Impeccable creativity that amplifies your creativity and amplifies your Impeccable creativity.Rich transition that guides your transition and guides your Rich transition.Graceful reporting that enriches your reporting and enriches your Graceful reporting.Lively review that sparks your review and sparks your Lively review.',
  imageUrl: 'https://picsum.photos/800/600?random=1671449',
  address: {
    postalCode: 5697,
    cordinates: { latitude: -68.26154457162507, longitude: 42.82423323921353 },
    city: 'F0nmIQ4aGR'
  },
  favouriteColor: '#79e072',
  dob: 1976-01-21T22:17:08.213Z
}

```

### getRandomElement
 get random element of an array.

 ```js client
  const arrays = [1, 2, 3, 4];
  const res = random.getRandomElement({ arrays });

 ```

 you get can response as 
 ```js
 { arrays: 1 }

 ```
 or you can use as 

 ```js client 
  const { arrays: element } = random.getRandomElement({ arrays });

 ```
 and get element as 1. 

 you can pass any type of data unless it is a type of array.

### getRandomInt

```js client 
    const res = random.getRandomInt(1,1000);

```

here 1 is minimum and 1000 is maximum value that you pass and get random in between these min and max as you provided.


### getRandomFloat

```js client 
    const res = random.getRandomFloat(10.00,1000.00)

```

here 10.00 is minimum and 1000.00 is maximum value that you pass and get random in between these min and max as you provided.

### getRandomDate

```js client 
  const res = random.getRandomDate();

```
you can also pass startDate and endDate as range .

### generateRandomBoolean

```js client 
  const res = random.generateRandomBoolean();

```

### generateRandomGender

```js client 
  const res = random.generateRandomGender();

```

### getRandomCharacter

```js client 
  const res = random.getRandomCharacter('randomcharacters');

```

### generateRandomGraph

```js client 
  const res = random.generateRandomGraph();

```

you can also pass number of vertices and density.

### generateRandomCoordinate

```js client 
  const res = random.generateRandomCoordinate();

```
you can also pass  minLat, maxLat, minLng, maxLng to specify location. 

### generateRandomRGBColor

```js client 
  const res = random.generateRandomRGBColor();

```

### generateRandomHEXColor

```js client 
  const res = random.generateRandomHEXColor();

```

### generateRandomHSLColor

```js client 
  const res = random.generateRandomHSLColor();

```

### generateRandomPassword

```js client 
  const res = random.generateRandomPassword();

```
you can also pass props as 

```js 
{
  includeUppercase:true,
  includeNumbers:true,
  includeSpecialChars:true,
  length:7
}

```

### generateRandomEmoticon

```js client 
  const res = random.generateRandomEmoticon();

```

### generateRandomNoise

```js client 
  const res = random.generateRandomNoise();

```
you can also pass props as 
```js 
{
  duration:10,
  sampleRate:44100,
  fileName:"random_noise",
  type:"wav"
}

```

### generateRandomImageUrl

```js client 
  const res = random.generateRandomImageUrl();

```

you can also pass props as 

```js 
{
  height:500,
  width:800
}
```
### generateRandomString

```js client 
  const res = random.generateRandomString();

```

### generateRandomName

```js client 
  const res = random.generateRandomName(7);

```
here 7 is number of length

### generateRandomSerName

```js client 
  const res = random.generateRandomSerName(7);

```
here 7 is number of length

### generateRandomFullName

```js client 
  const res = random.generateRandomFullName();

```

you can also pass props as 

```js 
{
  firstnameLength:7
  lastNameLength:7
}

```

### generateRandomUserName

```js client 
  const res = random.generateRandomUserName();

```
you can also pass props as 

```js 
{
  includeNumbers:true,
  length:9
}

```

### generateRandomShortDescrption

```js client 
  const res = random.generateRandomShortDescrption();

```

### generateRandomLongDescription

```js client 
  const res = random.generateRandomLongDescription();

```

## License
This project is licensed under the MIT License. Feel free to use this repo as you like 👨‍💻.
