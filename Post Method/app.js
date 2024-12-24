const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const querystring = require("querystring");
const { json } = require("stream/consumers");
const { error, info } = require("console");
const port = 8081;

const index_path = path.join(__dirname, "./public/index.html");
const contact_path = path.join(__dirname, "./public/contact.html");
const about_path = path.join(__dirname, "./public/about.html");
const users_path = path.join(__dirname, "./public/users.html",)
const style_path = path.join(__dirname, "./public/styles.css");
const users_json_path = path.join(__dirname, "./public/users.json")

const app = http.createServer((req, res) => {
    const query = url.parse(req.url, true); // Parse URL to extract pathname and query
    // console.log(query)
    if (req.url === "/") {
        fs.readFile(index_path, "utf-8", (error, data) => {
            if (error) {
                console.error(error);
                res.end("404: Not Found");
            } else {
                res.end(data);
            }
        });
    } else if (req.url === "/about") {
        fs.readFile(about_path, "utf-8", (error, data) => {
            if (error) {
                console.error(error);
                res.end("404: Not Found");
            } else {
                res.end(data);
            }
        });
    } else if (req.url === "/contact") {
        fs.readFile(contact_path, "utf-8", (error, data) => {
            if (error) {
                console.error(error);
                res.end("404: Not Found");
            } else {
                res.end(data);
            }
        });
    } else if (req.url === "/users.html") {
        fs.readFile(users_path, "utf-8", (error, data) => {
            if (error) {
                console.error(error);
                res.end("404: Not Found");
            } else {
                res.end(data);
            }
        });
    }
    else if (req.url === "/users.json") {
        fs.readFile(users_json_path, "utf-8", (error, data) => {
            if (error) {
                console.error(error);
                res.end("404: Not Found");
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                // res.end(data);
                console.log(res.end(data))
            }
        });
    }
    else if (req.url === "/styles.css") {
        fs.readFile(style_path, "utf-8", (error, data) => {
            if (error) {
                console.error(error);
                res.end("404: Not Found");
            } else {
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data);
            }
        });
    }
    else if (query.pathname === "/form_submit" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
            // console.log(chunk.toString())
        });
        req.on("end", () => {
            let data = querystring.parse(body);
            // console.log(data);

            fs.readFile("./public/users.json", "utf-8", (err, fileData) => {
                if (err) {
                    console.log(err);
                } else {
                    let users = [];

                    if (fileData.trim()) {
                        try {
                            users = JSON.parse(fileData);
                        } catch (error) {
                            console.log("Error parsing JSON:", error);
                        }
                    }
                    // -----------------------------if users do not exist---------------------------//
                    else if (!users || users.length === 0) { // Checks for null, undefined, or empty array
                        res.end(`
        <html>
            <head>
                <title>No Users Found</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                        text-align: center;
                        padding: 50px;
                    }
                    h2 {
                        color: #333;
                    }
                    a {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        font-size: 1rem;
                        color: #fff;
                        background-color: #007bff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    a:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h2>No Users Found!</h2>
                <a href="/">Back to Home</a>
            </body>
        </html>
    `);
                    }


                    users.push(data);
                    fs.writeFile("./public/users.json", JSON.stringify(users, null, 2), (error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            });
        });
        res.end("Successfully submitted form");
    }

    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404: Not Found");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
