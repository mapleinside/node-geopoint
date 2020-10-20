# GeoPoint

> Geographic point representation for Node.js and the browser

> ❌ Sorry, but this library is no longer maintained. Please find an alternative.

GeoPoint represents a geographic point for Node.js and the browser, and provides distance between points and radius bounding box calculations.

## Usage

```javascript
import GeoPoint from 'geopoint';

const statueOfLiberty = new GeoPoint(40.689604, -74.04455);
```

### Constructor options

* `latitude`
* `longitude`
* `inRadians`: `true` if the latitude and longitude are in radians, defaults to `false`.

### Methods

* `latitude(inRadians)`: return the point's latitude. By default, the latitude is in degrees, unless `inRadians` is `true`.
* `longitude(inRadians)`: return the point's longitude. By default, the longitude is in degrees, unless `inRadians` is `true`.
* `distanceTo(point, inKilometers)`: calculate the distance to another `GeoPoint` instance. By default, the distance is calculated in miles, unless `inKilometers` is `true`.
* `boundingCoordinates(distance, radius, inKilometers)`: calculates the bounding coordinates of `distance` from the point and returns an array with the SW and NE points of the bounding box. If `radius` is not provided, the radius of the Earth will be used. The distance is calculated in miles unless `inKilometers` is `true`.

### Static methods

* `GeoPoint.degreesToRadians(value)`: converts `value` in degrees to radians.
* `GeoPoint.radiansToDegrees(value)`: converts `value` in radians to degrees.
* `GeoPoint.milesToKilometers(value)`: converts `value` in miles to kilometers.
* `GeoPoint.kilometersToMiles(value)`: converts `value` in kilometers to miles.

## License

The MIT License (MIT)

Copyright (c) 2020 Nicolas Cava

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
