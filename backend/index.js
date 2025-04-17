const app = require("./app")
const PORT = 8000
const connectDB = require("./src/db/connectDB")
const userRoutes = require("./src/routes/user.routes")
const mailRoutes = require("./src/routes/mail.routes")
const workoutRoutes = require("./src/routes/workout.routes")
const activityRoutes = require('./src/routes/activity.routes')
const goalsRoutes = require("./src/routes/goals.routes")

connectDB();


app.use('/', userRoutes)
app.use('/', mailRoutes)
app.use('/', workoutRoutes)
app.use('/', activityRoutes)
app.use('/', goalsRoutes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})