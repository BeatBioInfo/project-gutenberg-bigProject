const { https } = require("follow-redirects");

const GUTENDEX_API = "https://gutendex.com/books/";
const MEMORY_LIMIT = 1 * 1024 * 1024 * 1024; // 1GB in bytes
let memoryUsage = 0;
let textStorage = []; 

async function fetchBooks(url = GUTENDEX_API) {
    console.log(`📢 Fetching books from: ${url}`);

    https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", async () => {
            try {
                const json = JSON.parse(data);
                const books = json.results;

                for (const book of books) {
                    const txtUrl = book.formats["text/plain; charset=us-ascii"];
                    
                    if (txtUrl) {
                        console.log(`📖 Fetching TXT content from: ${txtUrl}`);
                        await streamTextFile(txtUrl);
                    }

                    // Log memory usage after processing each book
                    console.log(`📊 Current memory usage: ${(memoryUsage / (1024 * 1024)).toFixed(2)} MB`);

                    if (memoryUsage >= MEMORY_LIMIT) {
                        console.log("⚠️ Memory limit reached! Clearing storage...");
                        textStorage = [];
                        memoryUsage = 0;
                    }
                }

                if (json.next) {
                    fetchBooks(json.next);
                }

            } catch (error) {
                console.error("❌ Error parsing book data:", error.message);
            }
        });

    }).on("error", (error) => {
        console.error("❌ Error fetching books:", error.message);
    });
}

function streamTextFile(url) {
    return new Promise((resolve) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                console.error(`❌ Failed to fetch: ${url} (HTTP ${response.statusCode})`);
                return resolve();
            }

            let bookData = "";
            response.setEncoding("utf-8");

            response.on("data", (chunk) => {
                bookData += chunk;
                memoryUsage += chunk.length;

                if (memoryUsage >= MEMORY_LIMIT) {
                    console.log("⚠️ Memory limit approaching, stopping download...");
                    response.destroy();
                }
            });

            response.on("end", () => {
                textStorage.push(bookData);
                console.log(`✅ Stored book content (${(bookData.length / (1024 * 1024)).toFixed(2)} MB)`);
                resolve();
            });

        }).on("error", (error) => {
            console.error("❌ Error fetching text file:", error.message);
            resolve();
        });
    });
}

// Start the process
fetchBooks();
