import { Car, Images, Overview } from "../models";

var haversine = require('haversine');

export const getCoordinates = async (address: string) => {
    const baseUrl = "https://nominatim.openstreetmap.org/search";
    const params = new URLSearchParams({
        q: address,
        format: "json",
        addressdetails: "1",
        limit: "1",
    });

    try {
        const response = await fetch(`${baseUrl}?${params}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            throw new Error("Không tìm thấy kết quả cho địa chỉ này.");
        }

        const { lat, lon } = data[0]; // OpenStreetMap API trả về 'lat' và 'lon'
        return { latitude: lat, longitude: lon }; // Chuyển đổi sang số và trả về
    } catch (error) {
        console.error("Lỗi khi chuyển đổi địa chỉ:", error);
        throw error; // Propagate the error to the caller
    }
};

//cal
interface Coordinate {
    latitude: number;
    longitude: number;
}

export const calculateDistance = async (coord1: Coordinate, coord2: Coordinate) => {
    const from = {
        latitude: coord1.latitude,
        longitude: coord1.longitude
    };

    const to = {
        latitude: coord2.latitude,
        longitude: coord2.longitude
    };

    return haversine(from, to, { unit: 'km' }); // khoảng cách tính bằng km
}

