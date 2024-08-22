const parseListing = JSON.parse(listing);

console.log(parseListing); // Assuming listing is already an object

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center:
    parseListing.geometry.coordinates.length > 0
      ? parseListing.geometry.coordinates
      : [74.314177, 31.565608], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(
    parseListing.geometry.coordinates.length > 0
      ? parseListing.geometry.coordinates
      : [74.314177, 31.565608]
  )
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      ` <h3> ${parseListing.title} </h3> <P> Exact location will be provided after booking.</P>`
    )
  )
  .addTo(map);
