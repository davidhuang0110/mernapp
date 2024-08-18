// each resource in API will have its own route file

const express = require('express')
const router = express.Router()
const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
} = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

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

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router 