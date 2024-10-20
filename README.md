
# **StyleWebsite - E-Commerce Shopping Cart**

## **How it Works**
StyleWebsite is a simple e-commerce platform designed to showcase products and allow users to add them to a shopping cart. The cart keeps track of selected items, quantities, and prices. Users can proceed to checkout, where they will be redirected to an Open Payments authorization link, requiring them to authenticate with their banks. 

The site includes features like:
- User login and registration.
- Persistent shopping cart across sessions using local storage.

## **How to Run**

### **Installation:**
1. Clone this repository to your local machine.
2. Ensure you have an HTTP server to serve the static files (you can use `live-server` or `http-server`).

### **Build & Run:**
1. Open your terminal and navigate to the project folder.
2. Run a local HTTP server by executing:
   ```bash
   live-server
   ```
   Alternatively, you can open `index.html` directly in your browser (but note that fetch requests for `products.json` won't work in this case).

### **Testing:**
- Add products to the cart, view the cart, and check the total.
- Checkout the items, ensuring the Open Payments redirection works properly.

## **Team Members**
- **Mickey Mpofu**
- **Millicent Lesufi**
- **Phathutshedzo Netshitangani**

## **Learnings**
During this project, we deepened our understanding of:
- JavaScript's DOM manipulation, event handling, and localStorage.
- Integrating an external payment service (Open Payments) and ensuring a secure, smooth checkout flow.

## **Achievements**
We are particularly proud of:
- Building a functional shopping cart that persists user data using localStorage.
- Implementing a seamless checkout experience with redirection to Open Payments for secure transactions.

## **What's Next?**
In the future, we plan to:
- Implement a full backend to manage product data and user authentication.
- Integrate more payment gateways.
- Improve the mobile responsiveness of the site.

---

This version is slightly more structured for ease of reading and clarity while retaining the original information. It would make a great addition to any project documentation or portfolio presentation!.
