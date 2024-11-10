function getFirstAndLastDayOfMonth() {
  const now = new Date();

  // First day of the month
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayString = firstDay.toISOString().split("T")[0]; // Format to YYYY-MM-DD

  // Last day of the month
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const lastDayString = lastDay.toISOString().split("T")[0]; // Format to YYYY-MM-DD

  return {
    firstDay: firstDayString,
    lastDay: lastDayString,
  };
}

export default getFirstAndLastDayOfMonth;
