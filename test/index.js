import assert from 'assert';

import GeoPoint from '../';

const latDeg = 40.689604;
const lonDeg = -74.04455;
const latRad = 0.7101675611326549;
const lonRad = -1.2923211906575673;
const distance = 20;
const swLatMI = 40.40014088820039;
const swLonMI = -74.42630141845927;
const swDistMI = 28.314943918527167;
const neLatMI = 40.97906711179962;
const neLonMI = -73.66279858154073;
const neDistMI = 28.25351161423632;
const swLatKM = 40.50973996113307;
const swLonKM = -74.28175887602288;
const swDistKM = 28.30334049313065;
const neLatKM = 40.86946803886694;
const neLonKM = -73.80734112397712;
const neDistKM = 28.2651684254543;
const radiusKM = 6371.01;
const latDeg2 = 38.890298;
const LON_DEG2 = -77.035238;
const distanceMI = 201.63714020616294;
const distanceKM = 324.503521805324;

describe('latitude()', () => {
  it('should return the latitude in radians if inRadians is true', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    assert.equal(point.latitude(true), latRad);
  });

  it('should return the latitude in degrees if inRadians is false', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    assert.equal(point.latitude(false), latDeg);
  });

  it('should return the latitude in degrees by default', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    assert.equal(point.latitude(), latDeg);
  });
});

describe('longitude()', () => {
  it('should return the longitude in radians if inRadians is true', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    assert.equal(point.longitude(true), lonRad);
  });

  it('should return the longitude in degrees if inRadians is false', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    assert.equal(point.longitude(false), lonDeg);
  });

  it('should return the longitude in degrees by default', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    assert.equal(point.longitude(), lonDeg);
  });
});

describe('boundingCoordinates()', () => {
  it('should throw an error if the distance is not valid', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    ['foo', 0 / 0, undefined, -1, 0].forEach((value) => {
      let error = null;

      try {
        point.boundingCoordinates(value);
      } catch (e) {
        error = e;
      }

      assert.ok(error instanceof Error);
      assert.equal(error.message, 'Invalid distance');
    });
  });

  it('should return an array containing the lower and upper points', () => {
    const point = new GeoPoint(latDeg, lonDeg);
    const coordinates = point.boundingCoordinates(distance);

    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.ok(coordinates[0] instanceof GeoPoint);
    assert.ok(coordinates[1] instanceof GeoPoint);
  });

  it('should calculate the bounding coordinates in miles if `inKilometers` is false', () => {
    const point = new GeoPoint(latDeg, lonDeg);
    const coordinates = point.boundingCoordinates(distance, false);

    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.equal(coordinates[0].latitude(), swLatMI);
    assert.equal(coordinates[0].longitude(), swLonMI);
    assert.equal(point.distanceTo(coordinates[0], false), swDistMI);
    assert.equal(coordinates[1].latitude(), neLatMI);
    assert.equal(coordinates[1].longitude(), neLonMI);
    assert.equal(point.distanceTo(coordinates[1], false), neDistMI);
  });

  it('should calculate the bounding coordinates in kilometers if `inKilometers` is true', () => {
    const point = new GeoPoint(latDeg, lonDeg);
    const coordinates = point.boundingCoordinates(distance, true);

    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.equal(coordinates[0].latitude(), swLatKM);
    assert.equal(coordinates[0].longitude(), swLonKM);
    assert.equal(point.distanceTo(coordinates[0], true), swDistKM);
    assert.equal(coordinates[1].latitude(), neLatKM);
    assert.equal(coordinates[1].longitude(), neLonKM);
    assert.equal(point.distanceTo(coordinates[1], true), neDistKM);
  });

  it('should calculate the bounding coordinates in miles by default', () => {
    const point = new GeoPoint(latDeg, lonDeg);
    const coordinates = point.boundingCoordinates(distance, false);

    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.equal(coordinates[0].latitude(), swLatMI);
    assert.equal(coordinates[0].longitude(), swLonMI);
    assert.equal(point.distanceTo(coordinates[0], false), swDistMI);
    assert.equal(coordinates[1].latitude(), neLatMI);
    assert.equal(coordinates[1].longitude(), neLonMI);
    assert.equal(point.distanceTo(coordinates[1], false), neDistMI);
  });

  it('should accept an optional radius', () => {
    const point = new GeoPoint(latDeg, lonDeg);
    const coordinates = point.boundingCoordinates(distance, radiusKM);

    assert.ok(Array.isArray(coordinates));
    assert.equal(coordinates.length, 2);
    assert.equal(coordinates[0].latitude(), swLatKM);
    assert.equal(coordinates[0].longitude(), swLonKM);
    assert.equal(point.distanceTo(coordinates[0], true), swDistKM);
    assert.equal(coordinates[1].latitude(), neLatKM);
    assert.equal(coordinates[1].longitude(), neLonKM);
    assert.equal(point.distanceTo(coordinates[1], true), neDistKM);
  });
});

describe('new GeoPoint()', () => {
  it('should throw and error if latitude is not valid', () => {
    let error = null;

    try {
      // eslint-disable-next-line no-new
      new GeoPoint();
    } catch (e) {
      error = e;
    }

    assert.ok(error instanceof Error);
    assert.equal(error.message, 'Invalid latitude');
  });

  it('should throw and error if longitude is not valid', () => {
    let error = null;

    try {
      // eslint-disable-next-line no-new
      new GeoPoint(latDeg);
    } catch (e) {
      error = e;
    }

    assert.ok(error instanceof Error);
    assert.equal(error.message, 'Invalid longitude');
  });

  it('should convert latitude and longitude in degrees to radians', () => {
    const point = new GeoPoint(latDeg, lonDeg, false);

    assert.equal(point.radLat, latRad);
    assert.equal(point.radLon, -1.2923211906575673);
  });

  it('should convert latitude and longitude in radians to degrees', () => {
    const point = new GeoPoint(latRad, -1.2923211906575673, true);

    assert.equal(point.degLat, latDeg);
    assert.equal(point.degLon, lonDeg);
  });

  it('should default to latitude and longitude in degrees', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    assert.equal(point.radLat, latRad);
    assert.equal(point.radLon, -1.2923211906575673);
  });

  it('should throw an error if the latitude is out of bounds', () => {
    let error = null;

    try {
      // eslint-disable-next-line no-new
      new GeoPoint(200, lonDeg);
    } catch (e) {
      error = e;
    }

    assert.ok(error instanceof Error);
    assert.equal(error.message, 'Latitude out of bounds');
  });

  it('should throw an error if the longitude is out of bounds', () => {
    let error = null;

    try {
      // eslint-disable-next-line no-new
      new GeoPoint(latDeg, 200);
    } catch (e) {
      error = e;
    }

    assert.ok(error instanceof Error);
    assert.equal(error.message, 'Longitude out of bounds');
  });
});

describe('Conversions', () => {
  describe('degreesToRadians()', () => {
    it('should throw an error if the value is not a number', () => {
      ['foo', 0 / 0, undefined].forEach((value) => {
        let error = null;

        try {
          GeoPoint.degreesToRadians(value);
        } catch (e) {
          error = e;
        }

        assert.ok(error instanceof Error);
        assert.equal(error.message, 'Invalid degree value');
      });
    });

    it('should convert degrees to radians', () => {
      assert.equal(GeoPoint.degreesToRadians(0), 0);
      assert.equal(GeoPoint.degreesToRadians(45), Math.PI / 4);
      assert.equal(GeoPoint.degreesToRadians(90), Math.PI / 2);
      assert.equal(GeoPoint.degreesToRadians(135), (3 * Math.PI) / 4);
      assert.equal(GeoPoint.degreesToRadians(180), Math.PI);
      assert.equal(GeoPoint.degreesToRadians(225), (5 * Math.PI) / 4);
      assert.equal(GeoPoint.degreesToRadians(270), (3 * Math.PI) / 2);
      assert.equal(GeoPoint.degreesToRadians(315), (7 * Math.PI) / 4);
      assert.equal(GeoPoint.degreesToRadians(360), 2 * Math.PI);
      assert.equal(GeoPoint.degreesToRadians(450), (Math.PI / 2) + (Math.PI * 2));
      assert.equal(GeoPoint.degreesToRadians(540), Math.PI + (Math.PI * 2));
      assert.equal(GeoPoint.degreesToRadians(810), (Math.PI / 2) + (Math.PI * 2 * 2));
    });
  });

  describe('radiansToDegrees()', () => {
    it('should throw an error if the value is not a number', () => {
      ['foo', 0 / 0, undefined].forEach((value) => {
        let error = null;

        try {
          GeoPoint.radiansToDegrees(value);
        } catch (e) {
          error = e;
        }

        assert.ok(error instanceof Error);
        assert.equal(error.message, 'Invalid radian value');
      });
    });

    it('should convert radians to degrees', () => {
      assert.equal(GeoPoint.radiansToDegrees(0), 0);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI / 4), 45);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI / 2), 90);
      assert.equal(GeoPoint.radiansToDegrees((3 * Math.PI) / 4), 135);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI), 180);
      assert.equal(GeoPoint.radiansToDegrees((5 * Math.PI) / 4), 225);
      assert.equal(GeoPoint.radiansToDegrees((3 * Math.PI) / 2), 270);
      assert.equal(GeoPoint.radiansToDegrees((7 * Math.PI) / 4), 315);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI * 2), 360);
      assert.equal(GeoPoint.radiansToDegrees((Math.PI / 2) + (Math.PI * 2)), 450);
      assert.equal(GeoPoint.radiansToDegrees(Math.PI + (Math.PI * 2)), 540);
      assert.equal(GeoPoint.radiansToDegrees((Math.PI / 2) + (Math.PI * 2 * 2)), 810);
    });
  });

  describe('milesToKilometers()', () => {
    it('should throw an error if the value is not a number', () => {
      ['foo', 0 / 0, undefined].forEach((value) => {
        let error = null;

        try {
          GeoPoint.milesToKilometers(value);
        } catch (e) {
          error = e;
        }

        assert.ok(error instanceof Error);
        assert.equal(error.message, 'Invalid mile value');
      });
    });

    it('should convert miles to kilometers', () => {
      assert.equal(GeoPoint.milesToKilometers(1), 1.6093439999999999);
      assert.equal(GeoPoint.milesToKilometers(5), 8.046719999999999);
    });
  });

  describe('.kilometersToMiles(value)', () => {
    it('should throw an error if the value is not a number', () => {
      ['foo', 0 / 0, undefined].forEach((value) => {
        let error = null;

        try {
          GeoPoint.kilometersToMiles(value);
        } catch (e) {
          error = e;
        }

        assert.ok(error instanceof Error);
        assert.equal(error.message, 'Invalid kilometer value');
      });
    });

    it('should convert miles to kilometers', () => {
      assert.equal(GeoPoint.kilometersToMiles(1), 0.621371192237334);
      assert.equal(GeoPoint.kilometersToMiles(5), 3.1068559611866697);
    });
  });
});

describe('distanceTo()', () => {
  it('should throw an error if the point is not a `GeoPoint`', () => {
    const point = new GeoPoint(latDeg, lonDeg);

    ['foo', 0 / 0, undefined].forEach((value) => {
      let error = null;

      try {
        point.distanceTo(value);
      } catch (e) {
        error = e;
      }

      assert.ok(error instanceof Error);
      assert.equal(error.message, 'Invalid GeoPoint');
    });
  });

  it('should return the distance if inKilometers is false', () => {
    const point = new GeoPoint(latDeg, lonDeg);
    const point2 = new GeoPoint(latDeg2, LON_DEG2);
    const dist = point.distanceTo(point2, false);

    assert.equal(dist, distanceMI);
  });

  it('should return the distance in kilometers if inKilometers is true', () => {
    const point = new GeoPoint(latDeg, lonDeg);
    const point2 = new GeoPoint(latDeg2, LON_DEG2);
    const dist = point.distanceTo(point2, true);

    assert.equal(dist, distanceKM);
  });

  it('should return the distance in miles by default', () => {
    const point = new GeoPoint(latDeg, lonDeg);
    const point2 = new GeoPoint(latDeg2, LON_DEG2);
    const dist = point.distanceTo(point2);

    assert.equal(dist, distanceMI);
  });
});
