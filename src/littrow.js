import {geoProjection} from "d3-geo";

function littrowRaw(lambda, phi) {
  return [
    Math.sin(lambda) / Math.cos(phi),
    Math.tan(phi) * Math.cos(lambda)
  ];
}

littrowRaw.invert = function(x, y) {
  var x2 = x * x,
      y2 = y * y,
      y2_1 = y2 + 1,
      cosPhi = x
        ? Math.SQRT1_2 * Math.sqrt((y2_1 - Math.sqrt(x2 * x2 + 2 * x2 * (y2 - 1) + y2_1 * y2_1)) / x2 + 1)
        : 1 / Math.sqrt(y2_1);
  return [
    asin(x * cosPhi),
    sign(y) * acos(cosPhi)
  ];
};

export default function() {
  return geoProjection(littrowRaw);
}