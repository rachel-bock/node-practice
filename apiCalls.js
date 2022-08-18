const coordinatesByZip = (zip) => {

  return fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${process.env.APIKEY}`)
        .then(response => {
          if(!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .catch(err => {
          console.log(err);
        });
}

module.exports = {
  coordinatesByZip
}