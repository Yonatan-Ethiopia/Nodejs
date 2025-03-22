const http = require('http');

let users = [
            { id: 1, 
              name: "user1", 
              email: "user1@gmail.com" }
            ];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === "GET" && req.url === "/users") {
        res.writeHead(200);
        res.end(JSON.stringify(users));

    } else if (req.method === "POST" && req.url === "/users") {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { name, email } = JSON.parse(body);
            const newUser = { id: users.length + 1, name, email };
            users.push(newUser);
            res.writeHead(201);
            res.end(JSON.stringify(newUser));
        });

    } else if (req.method === "PUT" && req.url.startsWith("/users/")) {
        const id = parseInt(req.url.split('/')[2]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { name, email } = JSON.parse(body);
            const user = users.find(u => u.id === id);
            if (user) {
                user.name = name;
                user.email = email;
                res.writeHead(200);
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: "User not found" }));
            }
        });

    } else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
        const id = parseInt(req.url.split('/')[2]);
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            res.writeHead(200);
            res.end(JSON.stringify({ message: "User deleted" }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: "User not found" }));
        }

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server running");
});