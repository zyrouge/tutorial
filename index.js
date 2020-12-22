const express = require("express");

const PORT = 8080;

const users = [
    {
        name: "user1234",
        age: 14,
        level: 10
    },
    {
        name: "user156",
        age: 20,
        level: 15
    },
    {
        name: "user1",
        age: 30,
        level: 5
    }
];

const init = async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    /* Simple Ping */
    app.get("/ping", (req, res) => {
        res.send("Pong!");
    });

    /* Simple JSON */
    app.get("/json-simple", (req, res) => {
        res.json({
            ping: "pong"
        });
    });

    /* Simple Post Request */
    app.post("/post-simple", (req, res) => {
        console.log(req.body);
        res.json(req.body);
    });

    /* Params */
    app.get("/users/:user", (req, res) => {
        const name = req.params.user;
        const user = users.find(x => x.name === name);
        if (!user) return res.send("No User");
        res.send(user);
    });

    /* Query */
    app.get("/users/:user/info", (req, res) => {
        const name = req.params.user;
        const user = users.find(x => x.name === name);
        if (!user) return res.send("No User");
        const key = req.query.key;
        if (!key) return res.send("Specify a key!");
        res.send(`${user[key]}`);
    });

    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    });
}

init();