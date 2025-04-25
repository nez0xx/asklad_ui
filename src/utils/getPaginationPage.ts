export function getPaginationPage(currentPage, data, size) {
    if(data.length > currentPage * size) {
        return data.slice((currentPage - 1) * size, currentPage * size)
    } else {
        return data.slice((currentPage - 1) * size)
    }
}