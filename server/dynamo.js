import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "1Announce";

export const createUser = async (email, body, file) => {
    console.log("FIle name = ")
    console.log(file.name)
    console.log("This func ois called")
    const params = {
        TableName: TABLE_NAME,
        Item: {
            email: email,
            body: body,
            media: file,
            createdOn: new Date().toString()
        },
        key: {
            "email": email
        }
    }
    console.log(email)
    console.log("Waited before pusher")
    return await dynamoClient.put(params).promise();

}


export const addOrUpdateCharacter = async (email) => {
    const params = {
        TableName: TABLE_NAME,
        Item: email,
        key: {
            email
        }
    }
    return await dynamoClient.put(params).promise();
}


export const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME
    }
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters)
    return characters

}

export const getCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }

    return await dynamoClient.get(params).promise()
}

export const deleteCharacter = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }

    return await dynamoClient.delete(params).promise()
}


// getCharacters()


// addOrUpdateCharacter(hp)
