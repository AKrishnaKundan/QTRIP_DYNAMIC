
# QTrip Dynamic
QTrip is a travel website aimed at travellers looking for a multitude of adventures in different cities. 

**Skills**: HTML, CSS, JavaScript, Bootstrap

**Live link**: https://krishnakundan-qtrip-dynamic.netlify.app/

**Backend link**: https://a-krishnakundan-qtrip-dynamic.onrender.com

During the course of this project,

• Created web pages using HTML and CSS and made them dynamic using JavaScript

• Improved UX with multi-select filters, image carousels

• Implemented conditional rendering of page elements

• Utilized localStorage to persist user preferences at client-side and facilitated reservation form submission using fetch API.

• Deployed the website using Netlify for Frontend and Render for Backend.   

![image](https://github.com/AKrishnaKundan/QTRIP_DYNAMIC/assets/93312488/31d0a20e-2c94-44b3-972a-3cd62a3a1783)


## Fetch data using REST API and dynamically render landing page

• Retrieved cities data from the backend REST API endpoint using Javascript’s Fetch API

• Created HTML for the cities grid with Bootstrap class to add responsiveness

• Implemented logic to dynamically plug in city data to the Landing page’s DOM

## Implement the adventures page with multi-select filters

• Fetched adventures data for the city by invoking the backend API from the page URL’s query parameter

• Inserted HTML populated with API response data to the adventure page’s DOM

• Implemented logic to add both multi-select and single-select filters
 
• Added logic to persist the filters selected by the user in the browser’s localStorage

## Create the Adventure details page with reservation support and the Reservations page to show all reservations

• Added a sleek image carousel using Bootstrap2

• Implemented reservation logic by using Fetch API to send a POST request to the backend, on form submission

• Conditionally rendered the “Sold out” panel and the reservations page based on the API response

## Deploy the QTripDynamic website

• Deployed the QTrip backend to Heroku

• Configured the QTrip dynamic frontend to use the Heroku deployed backend

• Deployed the QTrip dynamic frontend to Netlify
