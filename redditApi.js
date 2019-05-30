//this is like a service file in angular
search = (searchTerm, sortBy, searchLimit) => {
  return (
    fetch(
      `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}$limit=${searchLimit}`
    )
      .then(res => res.json())
      //since what we want is the data object, we can map thru it
      .then(data => data.data.children.map(data => data.data))
      .catch(err => console.log(err))
  );
};

module.exports = search;
