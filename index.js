import express from 'express';
import pg from 'pg';

const app = express()
const port = 3000
const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'abcd1234',
    port: 5432,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// RESPONSE ENVELOPE
function successResponse(res, message, data, status = 200) {
    return res.status(status).json({
        success: true,
        message,
        data,
        error: null,
    })
}

function errorResponse(res, message, status, details = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: details,
    })
}

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})