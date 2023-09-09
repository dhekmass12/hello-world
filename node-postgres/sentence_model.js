const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'hello_world',
  password: 'root',
  port: 5432,
});

const getSentences = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM sentences ORDER BY id ASC', (error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
      })
    }) 
}

const createSentence = (body) => {
    return new Promise(function(resolve, reject) {
        const { value } = body
        pool.query('INSERT INTO sentences (value) VALUES ($1) RETURNING *', [value], (error, results) => {
        if (error) {
            reject(error)
        }
        resolve(`A new sentence has been added added: ${results.rows[0]}`)
        })
    })
}
const deleteSentence = () => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query('DELETE FROM sentences WHERE id = $1', [id], (error, results) => {
        if (error) {
            reject(error)
        }
        resolve(`sentence deleted with ID: ${id}`)
        })
    })
}
  
module.exports = {
    getSentences,
    createSentence,
    deleteSentence,
}