### **📚 Project Gutenberg Memory Streaming**  
A Node.js script that fetches book texts from the **Gutendex API** and tracks **memory usage** dynamically, ensuring it does not exceed **1GB**.  

---

## **🚀 Features**  
- Fetches book data from the **Gutendex API** (`https://gutendex.com/books/`).  
- Downloads and stores books in memory from the **TXT format** link.  
- Automatically **tracks memory usage** and clears storage when it reaches **1GB**.  
- Supports **pagination** to process books iteratively.  
- Uses **`follow-redirects`** to handle `302` redirects.  

---

## **📦 Installation**  
1️⃣ Clone the repository:  
```bash
git clone https://github.com/yourusername/project-gutenberg.git
cd project-gutenberg
```

2️⃣ Install dependencies:  
```bash
npm install
```

---

## **▶️ Usage**  
Run the script with:  
```bash
npm start
```

---

## **⚙️ Configuration**  
- The script stores books **in memory** until **1GB is used**, then clears storage.  
- Change the **memory limit** in `index.js`:  
  ```js
  const MEMORY_LIMIT = 2 * 1024 * 1024 * 1024; // 2GB
  ```
- Modify the **API URL** if needed:  
  ```js
  const GUTENDEX_API = "https://gutendex.com/books/";
  ```

---

## **🛠 Dependencies**  
This project uses the following NPM packages:  
- **`follow-redirects`** - Handles URL redirects (e.g., `302` status codes).  
- **`axios`** - Fetches data from APIs (not used in the main script but available).  
- **`adm-zip`** - Supports ZIP file handling (if needed in the future).  

Install dependencies manually if needed:  
```bash
npm install follow-redirects axios adm-zip
```

---

## **📜 License**  
This project is licensed under the **ISC License**.  

---

## **📌 Future Improvements**  
- [ ] Add support for **other book formats** (e.g., EPUB, MOBI).  
- [ ] Store books in a **database or file system** instead of memory.  
- [ ] Implement **error handling & retry mechanism** for failed requests.  
---

