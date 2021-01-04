const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Hi everyone!!!</title><head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    };

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Users Page</title><head>');
        res.write('<body><ul><li>User No. 1</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const temp = [];

        req.on('data', chunk => {
            temp.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(temp).toString();
            const username = parsedBody.split('=')[1];

            console.log(username);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
}

module.exports = requestHandler;
