// each resource in API will have its own route file

const express = require('express')
const router = express.Router()
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
} = require('../controllers/goalController')
// move funtion to getController file

// router.get('/', (req, res) => {
//     res.status(200).json({message: 'Get goals'})
// })

// after adding {getGoal} variables, we can change the function on the top to the bottom one

// router.get('/', getGoals)

// router.post('/', setGoal)

// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)

// simplify top 4 into bottom

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router 