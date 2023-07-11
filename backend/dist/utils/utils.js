"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNearestLocation = exports.toRadians = exports.calculateDistance = exports.mergedAndFormatResult = void 0;
function mergedAndFormatResult(imageAndLocationResult, weatherAndLocationResult) {
    const correctLocations = [];
    let id = 0;
    for (const item of imageAndLocationResult) {
        const nearestLocation = findNearestLocation(item, weatherAndLocationResult);
        correctLocations.push(Object.assign(Object.assign({}, nearestLocation), { id }));
        id++;
    }
    return correctLocations;
}
exports.mergedAndFormatResult = mergedAndFormatResult;
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
}
exports.calculateDistance = calculateDistance;
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
exports.toRadians = toRadians;
function findNearestLocation(target, weatherAndNameList) {
    if (weatherAndNameList.length === 0) {
        return null;
    }
    let nearestLocation = null;
    let minDistance = Infinity;
    for (const item of weatherAndNameList) {
        const { location } = item;
        const distance = calculateDistance(target.location.latitude, target.location.longitude, location.latitude, location.longitude);
        if (distance < minDistance) {
            minDistance = distance;
            nearestLocation = Object.assign(Object.assign({}, item), { location: target.location, image: target.image });
        }
    }
    return nearestLocation;
}
exports.findNearestLocation = findNearestLocation;
//# sourceMappingURL=utils.js.map