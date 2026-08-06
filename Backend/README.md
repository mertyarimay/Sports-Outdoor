# 🏆 Sports&Outdoor Backend

A modern and secure **E-Commerce REST API** built with **Spring Boot**, designed for managing an online sports and outdoor shopping platform.

## 📚 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Modules](#-modules)
- [Authentication & Authorization](#-authentication--authorization)
- [Database](#-database)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

- JWT Authentication & Authorization
- Role-Based Access Control (ADMIN / CUSTOMER)
- Product, Category, Brand & Campaign Management
- Product Variant & Stock Management
- Shopping Cart & Wishlist
- Order Management
- Fake Payment Gateway
- Coupon System
- Notification System
- Review & Rating System
- Admin Dashboard
- Swagger / OpenAPI Documentation
- Global Exception Handling

---

## 🛠 Technology Stack

| Technology | Purpose |
|------------|---------|
| Java 17 | Programming Language |
| Spring Boot 4.0.6 | Backend Framework |
| Spring Security | Authentication & Authorization |
| JWT | Stateless Authentication |
| Spring Data JPA | Data Persistence |
| Hibernate | ORM |
| PostgreSQL | Database |
| Maven | Build Tool |
| Lombok | Boilerplate Reduction |
| ModelMapper | DTO Mapping |
| Swagger / OpenAPI | API Documentation |

---

## 📐 Architecture

```text
Client
   │
Controller
   │
Service
   │
Repository
   │
PostgreSQL
```

The project follows a clean layered architecture with DTOs, services, repositories, security, and global exception handling.

---

## 📦 Modules

- Authentication
- User
- Address
- Category
- Brand
- Campaign
- Product
- Product Variant
- Product Image
- Stock
- Cart
- Wishlist
- Order
- Payment
- Coupon
- Coupon Usage
- Review
- Notification
- Admin Dashboard

---

## 🔐 Authentication & Authorization

### CUSTOMER
- Browse products
- Manage addresses
- Shopping cart
- Wishlist
- Orders
- Payments
- Coupons
- Reviews
- Notifications

### ADMIN
- Product Management
- Category Management
- Brand Management
- Campaign Management
- Stock Management
- Coupon Management
- Order Management
- Dashboard Statistics

Public endpoints include authentication, product browsing, reviews and Swagger.

---

## 🗄 Database

Main entities:

- User
- Address
- Category
- Brand
- Campaign
- Product
- ProductVariant
- ProductImage
- Stock
- Cart
- CartItem
- Wishlist
- WishlistItem
- Order
- OrderItem
- Payment
- Coupon
- CouponUsage
- Review
- Notification

Business Rules:

- One coupon can be used only once per customer.
- One review per customer for each purchased product.
- Automatic stock reduction after successful orders.
- One cart and one wishlist per customer.

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/SportsOutdoor.git
cd SportsOutdoor
```

### Configure PostgreSQL

Create a database:

```sql
CREATE DATABASE sports_outdoor;
```

Update `src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sports_outdoor
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

### Build

```bash
mvn clean install
```

### Run

```bash
mvn spring-boot:run
```

Swagger:

`http://localhost:8080/swagger-ui/index.html`

---

## 📂 Project Structure

```text
src
├── config
├── controller
├── dto
├── entity
├── enums
├── exception
├── repository
├── security
├── service
├── util
└── resources
```

---

## 🚀 Future Improvements

- Docker Support
- Cloud Deployment
- Shipment Module
- Email Notifications
- SMS Notifications
- Real Payment Gateway
- Redis Cache
- Elasticsearch
- RabbitMQ
- CI/CD Pipeline
- Unit & Integration Tests

---

## 👨‍💻 Author

Developed by **Mert** as a portfolio-quality Spring Boot backend project.

---

## 📄 License

This project is licensed under the **MIT License**.
