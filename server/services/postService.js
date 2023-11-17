const { Op } = require('sequelize');
const { Post } = require('../models');
const pagi = require('../helps/pagination');

/************ GET *************/
//get all the user's posts for profile,
const getAllPost = ( pack ) =>
    new Promise(async (resolve, reject) => {
        const response = await Post.findAndCountAll({
            where: {
                userId: pack.userId,
            },
            limit : pack.limit,
            offset: pack.offset,
        });
        resolve(response);
    })
        .then(async (data) => {
            try {
                const res = await pagi.getPagingData(data, pack.page, pack.limit);
                return {
                    success: !!res,
                    mes: res ? '' : 'Cannot get the data!',
                    data: res,
                };
            } catch (error) {
                throw new Error('Cannot get Data!');
            }
        })
        .catch(error => {
            reject(new Error("Cannot get Data!"));
        });

const getAPost = (pid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Post.findOne({ where: { id: pid } });
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
    new Promise(async (resolve, reject) => {
        try {
            const response = await Post.findAll({
                where: {
                    userId: iduser,
                },
                paranoid: false,
            });

            resolve({
                success: !!response,
                mes: response ? '' : 'There is no deleted Post!',
                data: response.map((post) => post.dataValues),
            });
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

const restoreDeletePost = (pid, userID) =>
    new Promise(async (resolve, reject) => {
        try {
            const post = await Post.findOne({
                where: { 
                    id: pid,
                },
                paranoid: false
            })
           
            const { userId } = post;
            if( userId !== userID ) {
                throw new Error('How can you access this route?');
            } else {
                const response = await Post.restore(post);
                resolve({
                    success: !!response,
                    mes: response ? 'Restored!' : 'Cannot restore this Post!',
                });
            }
            
        } catch (error) {
            reject(error);
        }
    });

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

            resolve({
                success: !!response,
                mes: response ? 'Post Updated!' : 'Cannot update Post!',
            });
        } catch (error) {
            reject(error);
        }
    });

/************ Delete *************/
//soft delete a post, user can restore
const deletePost = (pid, userID) =>
    new Promise(async (resolve, reject) => {
        try {
            const post = await Post.findOne({
                where:{
                    id: pid,
                }
            })
            console.log(post);

            const { userId } = post;
            if (userId !== userID) {
               throw new Error('User does not have author to Delete this Post!')
            } else {
                const response = await Post.destroy(post);

                resolve({
                    success: response,
                    mess: response !== 0 ? 'Post Deleted!' : 'Cannot delete the post!',
                });
            }
            
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
};
