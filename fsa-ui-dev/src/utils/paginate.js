import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    console.log(startIndex, pageSize);
    return _.slice(items, startIndex, startIndex + pageSize);
}
