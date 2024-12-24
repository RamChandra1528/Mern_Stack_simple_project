const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const { json } = require("stream/consumers");
const { error } = require("console");
const port = 8080;

const index_path = path.join(__dirname, "./public/index.html");
const contact_path = path.join(__dirname, "./public/contact.html");
const about_path = path.join(__dirname, "./public/about.html");
const style_path = path.join(__dirname, "./public/styles.css");

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
    } else if (req.url === "/styles.css") {
        fs.readFile(style_path, "utf-8", (error, data) => {
            if (error) {
                console.error(error);
                res.end("404: Not Found");
            } else {
                // res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data);
            }
        });
    } else if (query.pathname === "/form_submit") {
        console.log("Form Submitted");
        res.writeHead(200, { "Content-Type": "text/plain" });

        // console.log(`Name: ${query.query.name}`);
        // console.log(`Email: ${query.query.email}`);
        // console.log(`Occupation: ${query.query.work}`);

        let parseObj = query.query;
        fs.readFile("users.json", "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data == "") {
                    parseObj = [parseObj];
                    fs.writeFile("users.json", JSON.stringify(parseObj), (error) => {
                        if (error) console.log(error);
                    });
                } else {
                    let parseData = JSON.parse(data);
                    parseData.push(parseObj);
                    fs.writeFile("users.json", JSON.stringify(parseData), (error) => {
                        if (error) console.log(error);
                    });
                }
            }
        });

        res.end("Form submission received");
    }
    else {
        res.end("<h1>404 Not Found</h1>");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
