const InBetweenPlaces = ({ destination }) => {
  const locationsInBetween = [
    "Bardibas",
    "Sindhuli",
    "Nepalthok",
    "Mangaltar",
    "Palekhet",
    "Kavre Bhaynjung",
    "Dhulikhel",
    "Banepa",
    "Sanga",
  ];

  const insertLocationData = () => {
    const fr_loc = [];
    const to_loc = [];
    filteredTrips.forEach((trip) => {
      fr_loc.push(trip.trip.from_location);
      to_loc.push(trip.trip.to_location);
    });
    let check_from_location = false;
    let check_to_location = false;
    // console.log("location", location.from_location, location.to_location);
    console.log(fr_loc, to_loc);
    fr_loc.map((from_location) => {
      if (from_location === "Kathmandu") {
        check_from_location = true;
      } else {
        check_from_location = false;
      }
    });
    to_loc.map((to_location) => {
      if (to_location === "Janakpur") {
        check_to_location = true;
      } else {
        check_to_location = false;
      }
    });

    if (check_from_location && check_to_location) {
      return locationsInBetween;
    }

    return [];
  };

  console.log("location in between", locations_in_between);
  const checkLocationInBetween = (locations, input) => {
    const isInBetween = locations.some(
      (location) => location.toLowerCase() === input.toLowerCase()
    );
    const filteredData = locations.filter(
      (location) => location.toLowerCase() === input.toLowerCase()
    );

    return { filteredData, isInBetween };
  };

  const locations_in_between = insertLocationData();
  const checkLocation = checkLocationInBetween(
    locations_in_between,
    destination
  );

  return (
    <View>
      <Text className="text-lg text-green-400 font-semibold">
        {checkLocation.isInBetween ? "Yes" : ""}
      </Text>
      <Text>{`[${locations_in_between.join(", ")}]`}</Text>
    </View>
  );
};

export default InBetweenPlaces;