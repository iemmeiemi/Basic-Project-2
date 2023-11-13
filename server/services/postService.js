const { Op } = require('sequelize');
const { Post } = require('../models');

/************ GET *************/
//get all the user post for profile,
const getAllPost = (userId) => {
    
};

const getAPost = (data) => 
    new Promise(async (resolve, reject) => {
        try {
            const response = await Post.findOne({ where: { id: data.id } });
            resolve({
                success: !!response,
                mes: response ? '' : 'cannot get the post which its id is' + data.id,
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

const getDeletedPost = (iduser) => 
    new Promise(async(resolve, reject) => {
        try {
            const response = await Post.findAll({
                where: {
                    userId: iduser,
                    
                },
                paranoid: false,
                
            })  

            resolve({
                success: !!response,
                mes: response ? '' : 'There is no deleted Post!',
                data: response.map(post => post.dataValues)
            })
        } catch (error) {
            reject(error);
        }
        
        
    });



/************ Create / Restore *************/
//up a post (both Individual User and Group)
const createNewPost = (data) => 
    new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            const response = await Post.create(data);
            resolve({
                success: !response,
                mes: response ? 'Post is successfully!' : 'Cannot up post',
            });
        } catch (error) {
            reject(error);
        }
    });

const restoreDeletePost = (pid) => 
    new Promise(async(resolve, reject) => {
        try {
            const response = await Post.restore({
                where: {
                    id: pid,
                },
                paranoid: false,
            })
            resolve({
                success: !!response,
                mes: response ? 'Restored!' : 'Cannot restore this Post!'
            })
        } catch (error) {
            reject(error);
        }
    })



/************ Update *************/
//edit content of the post (only the caption and viewer type)
const editPost = (pid, newData) => 
    new Promise(async (resolve, reject) => {
        try {
            const response = await Post.update(newData, {
                where: {
                    id: pid,
                },
            });

                console.log('succ');
                resolve({
                    success: response,
                    mes: response ? 'Post Updated!' : 'Cannot update Post!',
                });
            
        } catch (error) {
            reject(error);
        }
    });


/************ Delete *************/
//soft delete a post, user can restore
const deletePost = (pid) => 
    new Promise(async (resolve, reject) => {
        try {
            const response = Post.destroy({
                where: {
                    id: pid,
                },
            });

            resolve({
                success: response,
                mess: response !== 0 ? 'Post Deleted!' : 'Cannot delete the post!',
            });
        } catch (error) {
            reject(error);
        }
    });



module.exports = {
    createNewPost,
    getAllPost,
    getAPost,
    getDeletedPost,
    editPost,
    deletePost,
    restoreDeletePost,

}
