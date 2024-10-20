StyleWebsite - E-Commerce Shopping Cart
How it Works
StyleWebsite is a simple e-commerce platform designed to showcase products and allow users to add them to a shopping cart. The cart keeps track of selected items, quantities, and prices. Users can proceed to checkout where they will be redirected to an Open Payments authorization link, requiring them to authenticate with their banks. The site allows users to log in or register, and remembers the cart items across sessions via local storage.

How to Run
Installation:
Clone this repository to your local machine.
Ensure you have an HTTP server to serve the static files (you can use live-server, or http-server).
Build & Run:
Open your terminal and navigate to the project folder.
Run a local HTTP server by executing:
bash
Copy code
live-server
Alternatively, you can simply open index.html in your browser (though this won't work with fetch for products.json).
Testing:
Add products to the cart, view the cart, and check the total.
Checkout the items, and ensure the Open Payments redirection works.
Team Members
Octocat - GitHub
Alice - GitHub
Learnings
During this project, we deepened our understanding of JavaScript's DOM manipulation, event handling, and localStorage. We also learned how to integrate an external payment service (Open Payments) and ensure a secure, smooth checkout flow.

Achievements
We're most proud of building a functional shopping cart that persists user data using localStorage, and the seamless checkout experience that redirects users to Open Payments for a secure transaction.

What Comes Next?
In the future, we plan to enhance the project by implementing a full backend for managing product data, user authentication, and integrating more payment gateways. We also wish to improve the mobile responsiveness of the site.
