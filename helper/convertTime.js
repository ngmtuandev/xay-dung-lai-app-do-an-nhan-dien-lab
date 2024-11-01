const convertToVietnamTime = (isoString) => {
    const date = new Date(isoString); // Chuyển chuỗi ISO thành đối tượng Date

    // Sử dụng Intl.DateTimeFormat để định dạng theo giờ Việt Nam
    const vietnamTime = new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Định dạng 24h
    }).format(date);

    return vietnamTime;
};

export default convertToVietnamTime;