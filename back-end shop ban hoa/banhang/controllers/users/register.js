const Users = require("../../model/users")
const { handleBody } = require("./handleBody")
const { startSession } = require('mongoose')
// const bcrypt = require("bcrypt");
const bcrypt = require("bcrypt")
const { commitTransactions, abortTransactions } = require('../../services/transaction')

const register = async (req, res) => {
    let sessions = []
    try {
        const query = {
            $or: [
                { phoneNumber: req.body.phoneNumber },
                { username: req.body.username },
            ],
            isDeleted: false
        } // for oldDocs

        // Handle data
        const { error, body } = handleBody(req.body) // for newDoc
        if (error) {
            return res.status(406).json({
                success: false,
                error: error
            })
        }
        body.role = 'client';
        // Transactions
        let session = await startSession();
        session.startTransaction();
        sessions.push(session);

        // Hash password
        if (body.password != null) {
          body.password = await bcrypt.hashSync(body.password, 10);
        }
        const newDoc = await Users.create(
          [body],
          { session: session }
        );


        // Access DB
        const oldDocs = await Users.find(query,null,{session})


        // Check duplicate
        if (oldDocs.length > 1) {
          await abortTransactions(sessions)
          return res.status(409).json({
            success: false,
            error: "Tên tài khoản hoặc số điện thoại đã được sử dụng!"
          })
        }

        // Success
        await commitTransactions(sessions)
        return res.status(201).json({
          success: true,
          data: newDoc
        });
    } catch (error) {
        await abortTransactions(sessions)
        return res.status(500).json({
          success: false,
          error: error.message
        });
    }
}

module.exports = { register }