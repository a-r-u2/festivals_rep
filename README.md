# Festival Explorer 

An interactive and scalable web application that allows users to explore a wide variety of Indian festivals based on state, month, and type. Designed with performance and user experience in mind, the site dynamically loads festival data from a JSON file and displays detailed festival information using modals.

##  Features

-  Explore 50+ Indian festivals with images and descriptions.
-  Filter festivals by:
  - **State** (29 Indian states)
  - **Month** (January to December)
  - **Type** (Cultural, Religious, Harvest, Music, Dance, etc.)
-  Dynamic rendering of festival cards using JavaScript.
-  "Load More" functionality for better performance.
-  Detailed popups (modals) for each festival with additional info.
-  Interactive quiz section to test your festival knowledge (optional feature).
-  Responsive design for all devices using Bootstrap.

##  Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 5
- **Data Source**: JSON file (custom dataset for festivals)
- **Media**: Festival images and icons

##  Folder Structure
```
Indian-Festival-Explorer/
├── assets/
│ ├── css/
│ │ └── styles.css
│ ├── js/
│ │ ├── main.js # Handles UI logic and event listeners
│ │ ├── data-loader.js # Loads and parses festival JSON
│ │ └── quiz.js # (Optional) Quiz logic
│ ├── images/
│ │ └── [Festival Images]
│ └── json/
│ └── festivals.json
├── detail.html # Template for individual festival detail
├── index.html # Main homepage with filters and cards
└── README.md
```


##  How to Run the Project

1. **Clone this repository**  
   ```bash
   git clone https://github.com/yourusername/indian-festival-explorer.git
   cd indian-festival-explorer
   ```

2. **Open index.html in your browser.**
   No server setup is required. The site runs fully on the frontend using local files.

   For best results, use a local web server (like Live Server in VS Code) to avoid CORS issues when loading the JSON file.

**JSON Data Structure**
Each festival entry in festivals.json includes:
```
{
  "id": 1,
  "name": "Diwali",
  "state": "All",
  "month": "November",
  "type": "Religious",
  "description": "Festival of Lights celebrated across India.",
  "image": "images/diwali.jpg"
}
```

## Author
- Jalla Rohith Venkata Ram Sai Arun
 - jallarohith@gmail.com
 - Vijayawada, India
 - LinkedIn: JALLA RVRSARUN




