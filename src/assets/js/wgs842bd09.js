var wgs2bd = {
  transformLat: function(x, y) {
    const PI = 3.14159265358979324;
    var ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0;
    ret +=
      ((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  },
  transformLon: function(x, y) {
    const PI = 3.14159265358979324;
    var ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) *
        2.0) /
      3.0;
    return ret;
  },
  delta: function(lat, lon) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    const PI = 3.14159265358979324;
    var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = (lat / 180.0) * PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * PI);
    return { lat: dLat, lng: dLon };
  },
  // WGS-84 to GCJ-02
  wgs2gcj: function(wgsLat, wgsLon) {
    var d = this.delta(wgsLat, wgsLon);
    return { lat: wgsLat + d.lat, lng: wgsLon + d.lng };
  },
  // GCJ-02 to BD-09
  gcj2bd: function(gcjLat, gcjLon) {
    const xPI = (3.14159265358979324 * 3000.0) / 180.0;
    var x = gcjLon;
    var y = gcjLat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPI);
    var bdLon = z * Math.cos(theta) + 0.0065;
    var bdLat = z * Math.sin(theta) + 0.006;
    return { lat: bdLat, lng: bdLon };
  },
  wgs2bd: function(wgsLat, wgsLng) {
    let result = this.gcj2bd(wgsLat, wgsLng);
    let { lat, lng } = this.wgs2gcj(result.lat, result.lng);
    return { lat: lat, lng: lng };
  },

  getbd09xy: function(x, y) {
    var doubles_gcj = this.wgs2gcj(x, y);
    var doubles_bd09 = this.gcj2bd(doubles_gcj.lat, doubles_gcj.lng);

    return doubles_bd09;
  }
};
export default wgs2bd;
