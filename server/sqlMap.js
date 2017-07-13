// sql语句
var sqlMap = {
    // 
    article: {
        findArticleList: 'select * from article',
        findArticleDetails: 'select * from article where id = ?'
    },
    admin: {
    	userLogin: 'select * from auth where username = ? AND userpwd = ?',
    	findUser: 'select * from user where auth_id = ?'
    }
}

module.exports = sqlMap;