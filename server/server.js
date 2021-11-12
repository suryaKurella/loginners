import express from "express"
import fs from 'fs'
import fileUpload from 'express-fileupload'

import cors from "cors"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import {addOrUpdateAuthFlags, addOrUpdateCharacter, createUser, getAuthFlagsDb} from './dynamo.js'

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));


// here i am posting the frontend Authorization flags so that these get updated into DB
app.post("/testAuthFlags", async (req, res) => {

    try {
        console.log("Hoy")

        // await req.body

        console.log(JSON.stringify(req.body))


        const reqBodyString = JSON.stringify(req.body)

        console.log("the reqBodyString = ")
        console.log(reqBodyString)


        await addOrUpdateAuthFlags("boomer@gmail.com", reqBodyString, "utf8", () => {
            res.send({
                status: true,
                message: "Data received this end"
            })
        })


        // console.log(JSON.stringify(req.body), "utf8", () => {
        //     res.send({
        //         status: true,
        //         message: "Data received this end"
        //     })
        // })
    } catch (error) {
        console.error(error)
    }

})


app.post("/botflags", limiter, async (req, res) => {
    try {
        // await createUser('Hellodude@gmail.com')

        console.log(JSON.stringify(req.body))

        res.send({
            status: true,
            message: "Data is uploaded"
        })
    } catch (e) {
        res.status(500).send(e.message);
    }
});


// app.post("/", limiter, async (req, res) => {
//     try {
//         // await createUser('Hellodude@gmail.com')
//
//         if (req.files && req.files.files) {
//             [req.files.files].flat().map((file) => {
//                 createUser('newEmail@gmail.com', JSON.stringify(req.body), file)
//             });
//         }
//
//         res.send({
//             status: true,
//             message: "Data is uploaded"
//         })
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

app.get('/authFlags', async (req, res) => {
    try {
        const authDBFlags = await getAuthFlagsDb();

        console.log(`authDBFlags = `)
        console.log(authDBFlags)

        res.status(200).json(authDBFlags);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})


try {
    const authDBFlags = getAuthFlagsDb();
    console.log(authDBFlags)
} catch (error) {
}


// app.post("/", limiter, async (req, res) => {
//     try {
//
//         await createUser('mhundi@gmail.com')
//         if (req.files && req.files.files) {
//             console.log('received files')
//
//
//                 // await addOrUpdateCharacter('Surya@djfgv')
//
//
//                 [req.files.files].flat().map((file) => {
//                     console.log(file.name)
//                 file.mv("./uploads/" + file.name);
//
//
//             })
//         }
//
//         fs.writeFile("./uploads/data.json", JSON.stringify(req.body), "utf8", () => {
//             res.send({
//                 status: true,
//                 message: "Data is uploaded",
//             });
//         });
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// })


// app.post("/", limiter, async (req, res) => {
//     try {
//         if (req.files && req.files.files) {
//             [req.files.files].flat().map((file) => {
//                 file.mv("./uploads/" + file.name);
//             });
//         }
//
//         fs.writeFile("./uploads/data.json", JSON.stringify(req.body), "utf8", () => {
//             res.send({
//                 status: true,
//                 message: "Data is uploaded",
//             });
//         });
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
