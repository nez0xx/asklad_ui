export function sortDataByDate(data) {
  if(data) {
    return [...data]?.sort((a, b) => {
      const dateA = new Date(a.delivery_date || 0);
      const dateB = new Date(b.delivery_date || 0);
      return dateB - dateA; // Newest first
    });
  } else {
    return []
  }

}