function formatDate(isoString) {
  const date = new Date(isoString);

  // Lấy ngày, tháng và năm
  const day = date.getDate().toString().padStart(2, "0"); // Đảm bảo có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export default formatDate;
