export function sortDataByDate(data) {
  if(data) {
    return [...data]?.sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);
      return dateB - dateA; // Newest first
    });
  } else {
    return []
  }

}