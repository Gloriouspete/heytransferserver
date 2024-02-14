
import express from "express";
import mysql from "mysql2/promise"
const app = express()
const port = process.env.PORT || 3001;
import multer from "multer"
import cors from "cors"
import generateString from "./worker/generatestring.js";
const storage = multer.memoryStorage()
import Insert from "./controller/insert.js"
import FileUpload from "./controller/file.js";
import { error } from "console";
app.use(cors())
const upload = multer()
app.use(upload.any())
app.use(express.urlencoded({ extended: true }))
import sendMessage from './worker/email.js'
import executor from "./model/db.js";

app.get('/', (req, res) => {
    res.send("Express plus typescript")
})
app.post('/upload', async (req, res) => {
    // const files = req.files as Express.Multer.File[]
    const { email, sender, recipient, message, file } = req.body;
    console.log('se file', file)
    const string = file.slice(-6)
    console.log(string)
    try {

        const load = { email, sender, recipient, message, string };
        await sendMessage(email, sender, recipient, message, file)
        const response = await Insert(load);
        if (response === true) {
            return res.json({
                success: true,
                data: string,
                message: "File inserted successfully"
            })
        }
        else {
            console.log('e no set o')
        }


    }
    catch (error) {
        console.log(error)
        return res.json({
            success: false,
            data: string,
            message: "File inserted successfully"
        })
    }
});

app.post('/uploadfile', async (req, res) => {
    const files = req.files
    const random = generateString()
    const fileid = random
    try {
        for (const file of files) {
            const { fieldname, originalname, encoding, mimetype, buffer, size } = file;
            const load = { fieldname, fileid, originalname, encoding, mimetype, buffer, size };
            await FileUpload(load);

            return res.json({
                success: true,
                data: fileid,
                message: "File inserted successfully"
            })
        }

    }
    catch (error) {
        console.log(error)
        return res.json({
            success: false,
            data: fileid,
            message: "File inserted successfully"
        })
    }
});

app.get('/download/:id', async (req, res) => {
    const id = req.params.id
    try {
        if (!id) {
            return res.json({
                success: false,
                data: null,
                message: "Requested Path Not Found,Check Url"
            })
        }
        console.log('fot here', id)
        const query = `SELECT * from files where fileid = ?`
        const response = await executor(query, [id])
        const result = response[0]
        return res.json({
            success: true,
            data: result,
            message: "File retrieved successfully"
        })
    }
    catch (error) {
        console.log(error)
        return ({
            success: false,
            data: null,
            message: "Server Error"
        })
    }
})

app.get('/downloader/:id', async (req, res) => {
    const id = req.params.id
    try {
        if (!id) {
            return res.json({
                success: false,
                data: null,
                message: "Requested Path Not Found,Check Url"
            })
        }
        console.log('fot here', id)
        const query = `SELECT * from files where fileid = ?`
        const response = await executor(query, [id])
        const result = response[0]
        const { mimetype, encoding, originalname, file_data } = result;
        res.setHeader('content-type', mimetype)
        res.setHeader('content-disposition', `attachment; filename="${originalname}"`)
        return res.send(file_data)
    }
    catch (error) {
        console.log(error)
        return res.json({
            success: false,
            data: null,
            message: "Server Error"
        })
    }
})

app.listen(port, () => {
    console.log('server is listening')
});