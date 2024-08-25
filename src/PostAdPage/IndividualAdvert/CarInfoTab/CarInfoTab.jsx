function CarInfoTab() {
  const carDetails = {
    name: advert?.title || "Unknown",
    color: advert?.color || "Unknown",
    seats: advert?.seats || "Unknown",
    model: advert?.model || "Unknown",
    mileage: advert?.mileage || "Unknown",
    bodyType: advert?.bodyType || "Unknown",
    enginePower: advert?.enginePower || "Unknown",
    topSpeed: advert?.topSpeed || "Unknown",
    fuelConsumption: advert?.fuelConsumption || "Unknown",
    insuranceGroup: advert?.insuranceGroup || "Unknown",
    euroEmissions: advert?.euroEmissions || "Unknown",
  };
}

export default CarInfoTab;
