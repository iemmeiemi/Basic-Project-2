const { Op, QueryTypes } = require('sequelize');
const { Post, User, UserRelationship, sequelize } = require('../models');
const pagi = require('../helps/pagination');

/************ GET *************/
//get all the user's posts for profile,
const getAllPostOfUser = (pack) =>
    new Promise(async (resolve, reject) => {
        const response = await Post.findAndCountAll({
            where: {
                userId: pack.userId,
            },
            order: [['createdAt', 'DESC']],
            ...pack.pagination,
        });
        resolve(response);
    })
        .then(async (data) => {
            try {
                const res = await pagi.getPagingData(data, pack?.page, pagination?.limit);
                return {
                    success: !!res,
                    mes: res ? 'Successfully get posts' : 'Cannot get the data!',
                    data: res,
                };
            } catch (error) {
                throw new Error('Cannot get Data!');
            }
        })
        .catch((error) => {
            throw new Error('Cannot get Data!');
        });

const getAllPostOfUser2 = ({ userId, pagination }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await Post.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: [
                                'password',
                                'passwordChangedAt',
                                'passwordResetExprides',
                                'passwordResetToken',
                                'refreshToken',
                                'interestedUsers',
                            ],
                        },
                    },
                    {
                        model: Post,
                        as: 'shareFromPost',
                    },
                ],
                where: {
                    userId,
                },
                order: [['createdAt', 'DESC']],
                ...pagination,
            });
            resolve({
                success: response.length > 0,
                mes: response.length > 0 ? 'Successfully get posts' : 'Cannot get the data!',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

const getAllPostOfUserByOther = ({ userId, otherId, pagination }) =>
    new Promise(async (resolve, reject) => {
        try {
            let isFriend = false;
            let userId1 = userId;
            let userId2 = otherId;
            if (userId1 > userId2) {
                let tmp = userId;
                userId1 = otherId;
                userId2 = tmp;
            }
            const getRelationship = await UserRelationship.findOne({
                where: { userId1, userId2 },
            });
            if (getRelationship && getRelationship?.dataValues.friend === 'friends') isFriend = true;
            const postViewer = isFriend
                ? {
                      [Op.or]: ['Friends', 'Everyone'],
                  }
                : 'Everyone';
            const response = await Post.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: [
                                'password',
                                'passwordChangedAt',
                                'passwordResetExprides',
                                'passwordResetToken',
                                'refreshToken',
                                'interestedUsers',
                            ],
                        },
                    },
                    {
                        model: Post,
                        as: 'shareFromPost',
                    },
                ],
                where: {
                    userId,
                    postViewer,
                },
                order: [['createdAt', 'DESC']],
                ...pagination,
            });
            resolve({
                success: response.length > 0,
                mes: response.length > 0 ? 'Successfully get posts' : 'Cannot get the data!',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

const getAllPostOfUserByPublish = ({ userId, pagination }) =>
    new Promise(async (resolve, reject) => {
        try {
            const postViewer = 'Everyone';
            const response = await Post.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: [
                                'password',
                                'passwordChangedAt',
                                'passwordResetExprides',
                                'passwordResetToken',
                                'refreshToken',
                                'interestedUsers',
                            ],
                        },
                    },
                    {
                        model: Post,
                        as: 'shareFromPost',
                    },
                ],
                where: {
                    userId,
                    postViewer,
                },
                order: [['createdAt', 'DESC']],
                ...pagination,
            });
            resolve({
                success: response.length > 0,
                mes: response.length > 0 ? 'Successfully get posts' : 'Cannot get the data!',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

const getAllPostNewAndInterest = ({ userId, otherId, pagination }) =>
    new Promise(async (resolve, reject) => {
        try {
            // ===============get following and rela
            const getFollowingAndRela = await UserRelationship.findAll({
                where: {
                    [Op.or]: [
                        {
                            userId1: userId,
                            follow: {
                                [Op.or]: ['fl_both', 'st_fl_nd'],
                            },
                        },
                        {
                            userId2: userId,
                            follow: {
                                [Op.or]: ['fl_both', 'nd_fl_st'],
                            },
                        },
                    ],
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                ...pagination,
            });
            let followingIds = [];
            const friendIds = getFollowingAndRela.map((el) => {
                if (el.friend === 'friends') {
                    return el.userId1 == userId ? el.userId2 : el.userId1;
                }
                followingIds.push(userId ? el.userId2 : el.userId1);
            });

            // test
            const responseFriends = await Post.findAll({
                include: {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: [
                            'password',
                            'passwordChangedAt',
                            'passwordResetExprides',
                            'passwordResetToken',
                            'refreshToken',
                            'interestedUsers',
                        ],
                    },
                },
                where: {
                    userId: friendIds,
                    postViewer: {
                        [Op.or]: ['Friends', 'Everyone'],
                    },
                    createdAt: {
                        [Op.gte]: new Date().setDate(new Date().getDate() - 7),
                    },
                },
                order: [['createdAt', 'DESC']],
            });
            const responseFollowing = await Post.findAll({
                include: {
                    model: User,
                    as: 'user',
                    attributes: {
                        exclude: [
                            'password',
                            'passwordChangedAt',
                            'passwordResetExprides',
                            'passwordResetToken',
                            'refreshToken',
                            'interestedUsers',
                        ],
                    },
                },
                where: {
                    userId: followingIds,
                    postViewer: 'Everyone',
                    createdAt: {
                        [Op.gte]: new Date().setDate(new Date().getDate() - 7),
                    },
                },
                order: [['createdAt', 'DESC']],
            });
            const response = [...responseFriends, ...responseFollowing];
            resolve({
                success: response.length > 0,
                mes: response.length > 0 ? 'Successfully get posts' : 'Cannot get the data!',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

const getAllPostNewAndInterest2 = ({ userId, otherId, pagination }) =>
    new Promise(async (resolve, reject) => {
        try {
            const query = `
  SELECT 
  "Posts"."id",
  "Posts"."caption",
  "Posts"."hashTag",
  "Posts"."postViewer",
  "Posts"."images",
  "Posts"."videos",
  "Posts"."likes",
  "Posts"."shareFrom",
  "Posts"."createdAt",
  "Posts"."updatedAt",
  JSON_BUILD_OBJECT('id', "Posts"."userId", 'fullName', "Users"."fullName", 'avatar', "Users"."avatar") AS user
  FROM "UserRelationships" AS "UserRela"
  INNER JOIN "Posts"
  ON 
  "Posts"."userId" != :userId 
  AND ("Posts"."userId" = "UserRela"."userId1"
  OR "Posts"."userId" = "UserRela"."userId2")
  INNER JOIN "Users"
  ON "Posts"."userId" = "Users"."id" AND "Users"."isBlocked" = false
  WHERE 
  ("UserRela"."userId1" = :userId AND (follow = 'fl_both' OR follow = 'st_fl_nd')) 
  OR
  ("UserRela"."userId2" = :userId AND (follow = 'fl_both' OR follow = 'nd_fl_st'))
  AND 
  (
    (friend = 'friends' AND ("Posts"."postViewer" = 'Everyone' OR "Posts"."postViewer" = 'Friends')) 
    OR
    (friend != 'friends' AND "Posts"."postViewer" = 'Everyone'))
  AND "Posts"."createdAt" >= NOW() - INTERVAL '7 days'
  ORDER BY "Posts"."createdAt" DESC
  LIMIT :limit
  OFFSET :offset
`;
            const response = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: { userId, ...pagination },
            });
            resolve({
                success: response.length > 0,
                mes: response.length > 0 ? 'Successfully get posts' : 'Cannot get the data!',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
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
            const response = await Post.create(data);
            resolve({
                success: !!response,
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
                paranoid: false,
            });

            const { userId } = post;
            if (userId !== userID) {
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
                where: {
                    id: pid,
                },
            });
            console.log(post);

            const { userId } = post.dataValues;
            if (userId !== userID) {
                throw new Error('User does not have author to Delete this Post!');
            } else {
                const response = await Post.destroy({ where: { id: post.dataValues.id } });

                resolve({
                    success: !!response,
                    mes: response !== 0 ? 'Post Deleted!' : 'Cannot delete the post!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });

module.exports = {
    createNewPost,
    getAllPostOfUser,
    getAllPostOfUser2,
    getAllPostOfUserByOther,
    getAllPostOfUserByPublish,
    getAllPostNewAndInterest,
    getAllPostNewAndInterest2,
    getAPost,
    getDeletedPost,
    editPost,
    deletePost,
    restoreDeletePost,
};
