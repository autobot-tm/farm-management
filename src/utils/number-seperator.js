export const formatCustomCurrency = number => {
    if (typeof number === 'number') {
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
        return '0';
    }
};
