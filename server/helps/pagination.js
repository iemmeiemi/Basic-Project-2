
//lấy dữ liệu phân trang
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, posts, totalPages, currentPage };
};

//lấy số lượng limit và offset
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  

module.exports = {
    getPagingData,
    getPagination,

}