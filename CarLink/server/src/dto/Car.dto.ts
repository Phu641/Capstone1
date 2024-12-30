export interface CreateCarInputs {
    delivery: boolean,
    selfPickUp: boolean,
    listingTitle: string;
    model: string;
    type: string;
    year: Date;
    condition: string;
    stockNumber: number;
    vinNumber: number;
    mileage: number;
    transmission: string;
    driverType: string;
    engineSize: number;
    cylinders: number;
    fuelType: string;
    doors: number;
    color: string;
    seats: number;
    cityMPG: number;
    highwayMPG: number;
    pricePerDay: number;
    address: string;
    description: string;
}
