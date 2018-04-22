export default class GeoPoint {
  /**
   * Check if an object is a valid number
   *
   * @param {Number} value - Value to check
   * @return {Boolean} If a number and not NaN
   */
  static isNumber(value) {
    return toString.call(value) === '[object Number]' && value === +value;
  }

  /**
   * Convert degrees to radians
   *
   * @param {Number} value - Degree value
   * @return {Number} Radian value
   */
  static degreesToRadians(value) {
    if (!GeoPoint.isNumber(value)) throw new Error('Invalid degree value');

    return value * GeoPoint.deg2Rad;
  }

  /**
   * Convert radians to degrees
   *
   * @param {Number} value - Radian value
   * @return {Number} Degree value
   */
  static radiansToDegrees(value) {
    if (!GeoPoint.isNumber(value)) throw new Error('Invalid radian value');

    return value * GeoPoint.rad2Deg;
  }

  /**
   * Convert miles to kilometers
   *
   * @param {Number} value - Miles value
   * @return {Number} Kilometers value
   */
  static milesToKilometers(value) {
    if (!GeoPoint.isNumber(value)) throw new Error('Invalid mile value');

    return value * GeoPoint.mi2Km;
  }

  /**
   * Convert kilometers to miles
   *
   * @param {Number} value - Kilometer value
   * @return {Number} Miles value
   */
  static kilometersToMiles(value) {
    if (!GeoPoint.isNumber(value)) throw new Error('Invalid kilometer value');

    return value * GeoPoint.km2Mi;
  }

  // Degrees to radian conversion
  static deg2Rad = Math.PI / 180;

  // Radians to degrees conversion
  static rad2Deg = 180 / Math.PI;

  // Miles to kilometers conversion
  static mi2Km = 1.6093439999999999;

  // Kilometers to miles conversion
  static km2Mi = 0.621371192237334;

  // Earth's radius in km
  static earthRadiusKM = 6371.01;

  // Earth's radius in miles
  static earthRadiusMI = 3958.762079;

  // 90 degrees
  static maxLat = Math.PI / 2;

  // -90 degrees
  static minLat = -GeoPoint.maxLat;

  // 180 degrees
  static maxLon = Math.PI;

  // -180 degrees
  static minLon = -GeoPoint.maxLon;

  // Full cirle (360 degrees) in radians
  static fullCircleRad = Math.PI * 2;

  /**
   * Constructor
   *
   * @param {Number} lat - Latitude
   * @param {Number} long - Longitude
   * @param {Boolean} inRadians - If latitude and longitude are in radians
   */
  constructor(lat, lon, inRadians) {
    if (!GeoPoint.isNumber(lat)) throw new Error('Invalid latitude');

    if (!GeoPoint.isNumber(lon)) throw new Error('Invalid longitude');

    if (inRadians === true) {
      this.degLat = GeoPoint.radiansToDegrees(lat);
      this.degLon = GeoPoint.radiansToDegrees(lon);
      this.radLat = lat;
      this.radLon = lon;
    } else {
      this.degLat = lat;
      this.degLon = lon;
      this.radLat = GeoPoint.degreesToRadians(lat);
      this.radLon = GeoPoint.degreesToRadians(lon);
    }

    if (this.radLat < GeoPoint.minLat || this.radLat > GeoPoint.maxLat) {
      throw new Error('Latitude out of bounds');
    } else if (this.radLon < GeoPoint.minLon || this.radLon > GeoPoint.maxLon) {
      throw new Error('Longitude out of bounds');
    }
  }

  /**
   * Return the latitude
   *
   * @param {Boolean} inRadians - To return the latitude in radians
   * @param {Number} latitude
   */
  latitude(inRadians) {
    if (inRadians === true) return this.radLat;

    return this.degLat;
  }

  /**
   * Return the longitude
   *
   * @param {Boolean} inRadians - To return the longitude in radians
   * @param {Number} longitude
   */
  longitude(inRadians) {
    if (inRadians === true) return this.radLon;

    return this.degLon;
  }

  /**
   * Calculates the distance between two points
   *
   * @param {Object} point - `GeoPoint` instance
   * @param {Boolean} inKilometers - To return the distance in kilometers
   * @return {Number} Distance between points
   */
  distanceTo(point, inKilometers) {
    if (!(point instanceof GeoPoint)) throw new Error('Invalid GeoPoint');

    const radius = inKilometers === true ? GeoPoint.earthRadiusKM : GeoPoint.earthRadiusMI;
    const lat1 = this.latitude(true);
    const lat2 = point.latitude(true);
    const lon1 = this.longitude(true);
    const lon2 = point.longitude(true);
    const result = (Math.sin(lat1) * Math.sin(lat2)) + (Math.cos(lat1) * Math.cos(lat2) *
      Math.cos(lon1 - lon2));

    return Math.acos(result) * radius;
  }

  /**
   * Calculate the bouding coordinates
   *
   * @param {Number} distance - Distance from the point
   * @param {Number} radius - Optional sphere radius to use
   * @param {Boolean} inKilometers - To return the distance in kilometers
   * @return {Array} Array containing SW and NE points of bounding box
   */
  boundingCoordinates(distance, radius, inKilometers) {
    let mutableInKilometers = inKilometers;
    let mutableRadius = radius;

    if (!GeoPoint.isNumber(distance) || distance <= 0) throw new Error('Invalid distance');

    if (mutableRadius === true || mutableRadius === false) {
      mutableInKilometers = mutableRadius;
      mutableRadius = null;
    }

    if (!GeoPoint.isNumber(mutableRadius) || mutableRadius <= 0) {
      mutableRadius = mutableInKilometers === true ?
        GeoPoint.earthRadiusKM : GeoPoint.earthRadiusMI;
    }

    const lat = this.latitude(true);
    const lon = this.longitude(true);
    const radDist = distance / mutableRadius;

    let minLat = lat - radDist;
    let maxLat = lat + radDist;
    let minLon = null;
    let maxLon = null;
    let deltaLon = null;

    if (minLat > GeoPoint.minLat && maxLat < GeoPoint.maxLat) {
      deltaLon = Math.asin(Math.sin(radDist) / Math.cos(lat));
      minLon = lon - deltaLon;

      if (minLon < GeoPoint.minLon) minLon += GeoPoint.fullCircleRad;

      maxLon = lon + deltaLon;

      if (maxLon > GeoPoint.maxLon) maxLon -= GeoPoint.fullCircleRad;
    } else {
      minLat = Math.max(minLat, GeoPoint.minLat);
      maxLat = Math.min(maxLat, GeoPoint.maxLat);

      // eslint-disable-next-line prefer-destructuring
      minLon = GeoPoint.minLon;

      // eslint-disable-next-line prefer-destructuring
      maxLon = GeoPoint.maxLon;
    }

    return [new GeoPoint(minLat, minLon, true), new GeoPoint(maxLat, maxLon, true)];
  }
}
