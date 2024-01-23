# Bakalari-TS-Api

Typescript connector for accessing Bakalari api

## Client initiaizing

### Using password

-   Auto token refresh

```js
import { BakalariAPI } from 'bakalari-ts-api';

const api = await BakalariApi.initialize({
    baseUrl: 'https://moje.bakalari.cz',
    username: 'pepa',
    password: `12345`,
});
```

### Using Token

```js
import { BakalariAPI } from 'bakalari-ts-api';

const api = new BakalariAPI({
    baseUrl: 'https://moje.bakalari.cz',
    token: TOKEN,
});
```

### Using Refresh Token

-   Auto token refresh

```js
import { BakalariAPI } from 'bakalari-ts-api';

const api = new BakalariAPI({
    baseUrl: 'https://moje.bakalari.cz',
    refreshToken: REFRESH_TOKEN,
});
```

## Subjects

```js
api.subjects();
```

## Timetable

### Actual ( Current week shorthand )

```js
api.timetable();
```

### Actual ( With start date )

```js
api.timetable({
    type: 'actual',
    date: '2023-12-30',
});
```

### Permanent

```js
api.timetable({
    type: 'permanent',
});
```

## Marks

```js
api.marks();
```

## Kommens

### Default

```js
api.kommens();
```

### Noticeboard

```js
api.kommens({
    noticeboard: true,
});
```

## Downloading Attachment

```js
const { data, filename } = await api.attachment({ id: 'id' });

data.pipe(...);
```

## User info

```js
api.user();
```

## Municipality ( Public )

```js
import { BakalariAPI } from 'bakalari-ts-api';

const cities = BakalariAPI.getMunicipality();
const schools = BakalariAPI.getMunicipality('Praha 9');
```
