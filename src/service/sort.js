export const sortSearchByKey = (array, key) => {
    return array.concat().sort(function(a, b) {
        var x = a.track[key]; var y = b.track[key];
       
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export const sortTracksByKey = (array, key) => {

    return array.concat().sort(function(a, b) {
        let x = a[key]; let y = b[key];
        if(typeof x === "string") {
            x = x.toLowerCase();
        }
        if(typeof y === "string") {
            y = y.toLowerCase();
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

