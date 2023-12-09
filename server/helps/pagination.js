//lấy dữ liệu phân trang
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = limit ? Math.ceil(totalItems / limit) : 1;

    return { totalItems, posts, totalPages, currentPage };
};

//lấy số lượng limit và offset
const getPagination = (page, size) => {
    const limit = size ? +size : null;
    const offset = page ? page * limit : 0;
    return {
        pagination: { limit, offset }
    };
};

module.exports = {
    getPagingData,
    getPagination,
};
