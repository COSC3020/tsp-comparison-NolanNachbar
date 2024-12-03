//My local search
function tsp_ls(distance_matrix) {
  let n = distance_matrix.length;
  let minRoute = Array.from({ length: n }, (v, i) => i).sort((a, b) => 0.5 - Math.random());
  let minCost = calcCost(minRoute, distance_matrix);
  let improving = true;
  while (improving) {
    let routePath = [...minRoute]; // Get a deep copy of min route
    let r = Math.floor(Math.random() * (n - 1)) + 1; // Random Number in the range 1 to n - 1
    let l = Math.floor(Math.random() * (n - r - 1)) + (r + 1); // Random number in the range r + 1 to n
    swap(routePath, r, l);
    let newCost = calcCost(routePath, distance_matrix);
    if (newCost < minCost) {
      minCost = newCost;
      minRoute = routePath;
      improving = true;
    } else improving = false; // no improvement
  }
  return minCost;
}

function calcCost(route, distance_matrix){
    let newCost = 0;
    for (let i = 0; i < distance_matrix.length - 1; i++) {
      newCost += distance_matrix[route[i]][route[i + 1]];
    }
    return newCost;
}
function swap(arr, r, l) {
  while (r < l) {
    let temp = arr[r];
    arr[r] = arr[l];
    arr[l] = temp;
    r++;
    l--;
  }
}


//My held karp
function tsp_hk(distance_matrix) {
    let n = distance_matrix.length;
    if (n <= 1) return 0;
    let memo = new Map();
    function heldKarp(citiesLeft, currentCity) {
        const key = `${currentCity}:${citiesLeft.slice().sort((a, b) => a - b).join(',')}`;
        if (memo.has(key)) return memo.get(key);
        if (citiesLeft.length === 1) {
            const cost = distance_matrix[currentCity][citiesLeft[0]];
            memo.set(key, cost);
            return cost;
        }
        let minCost = Infinity;
        for (let i = 0; i < citiesLeft.length; i++) {
            const nextCity = citiesLeft[i];
            const newCitiesLeft = [...citiesLeft.slice(0, i), ...citiesLeft.slice(i + 1)];
            const cost = distance_matrix[currentCity][nextCity] + heldKarp(newCitiesLeft, nextCity);
            minCost = Math.min(minCost, cost);
        }
        memo.set(key, minCost);
        return minCost;
    }
    let minTourCost = Infinity;
    for (let start = 0; start < n; start++) {
        let citiesLeft = Array.from({ length: n }, (_, i) => i);
        citiesLeft = [...citiesLeft.slice(0, start), ...citiesLeft.slice(start + 1)];
        minTourCost = Math.min(minTourCost, heldKarp(citiesLeft, start));
    }
    return minTourCost;
}


