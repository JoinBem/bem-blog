// sql语句
var sqlMap = {
    // 
    article: {
        findArticleList: 'select * from article order by date desc',
        findArticleDetails: 'select * from article where id = ?'
    },
    admin: {
    	userLogin: 'select * from auth where username = ? AND userpwd = ?',
    	findUser: 'select * from user where auth_id = ?',
        selectUserMsg: 'select * from user where id = ?',
        saveUser: 'update user set name = ?, motto = ? where id = ?',
        saveUserImg: 'update user set name = ?, motto = ?, head_name = ? where id = ?',
        findArticleList: 'select * from article where user_id = ? order by date desc',
        saveArticle: 'insert into article values (?, ?, ?, NOW(), ?, ?)',
        selectArticle: 'select * from article where id = ?',
        delArticle: 'delete from article where id = ?',
        updateArticle: 'update article set title = ?, content = ?, date = NOW(), state = ? where id = ?',
    	/**测试用，可删除**/
    	regAuth: 'insert into auth values (?, ?, ?)',
    	regUser: 'insert into user (id, auth_id) values (?, ?)'
    }
}

module.exports = sqlMap;