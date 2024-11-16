function mergesort(array) {
    var subarraysize = 1;

    while (subarraysize < array.length) {
        for (var start = 0; start < array.length; start += 2 * subarraysize) {
            var midsub = Math.min(start + subarraysize, array.length);
            var endsub = Math.min(start + 2 * subarraysize, array.length);
            
            var a = start, b = midsub;
            while (a < b && b < endsub) {
                if (array[a] <= array[b]) {
                    a++;
                } else {
                    let t = array[b];
                    for (let k = b; k > a; k--) {
                        array[k] = array[k - 1];
                    }
                    array[a] = t;
                    a++;
                    b++;
                }
            }
        }
        subarraysize *= 2;
    }
    return array;
}
