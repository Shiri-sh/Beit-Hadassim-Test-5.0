# 🚀 Hadasim 5.0 – Home Assignment

Welcome to my repository for the **Hadasim 5.0** home assignment. This project covers a wide range of topics, from data processing and system design to full-stack development.

---

## Part A – Data Processing (Python + Pandas)

### A1 – Log File Analysis
* **Objective:** Efficiently process a `logs.txt` file containing millions of rows.
* **Goal:** Identify the **Top N** most frequent error codes.
* **Implementation Strategy:**
    * **Chunking:** Splitting the large file into manageable pieces to prevent memory overflow.
    * **Aggregation:** Counting frequencies per chunk and merging them into a final result.
    * **CLI Support:** Built-in support for user input using `argparse`.
* **Complexity Analysis:**
    * **Time:** $O(n)$
    * **Space:** $O(k)$ (where $k$ = number of unique error codes).

### A2 – Time Series Processing
* **Files:** Handles both `.csv` and `.parquet` formats.
* **Logic:**
    * Data cleaning (removing duplicates, handling missing values).
    * **Aggregation:** Calculating hourly averages using Pandas `groupby`.
    * **Output:** Exporting structured and cleaned CSV files.

---

## Part B – Family Tree Modeling (Python)
Implementation of a first-degree relationship inference engine.
* **Core Logic:** Derived relationship tables from a base `Person` entity.
* **Key Feature:** Automatic **Spouse Link Completion** (inferring missing bidirectional links).
* **Methodology:** Structured data processing and relationship inference rules.

---

## Part C – System & Hardware Concepts
* **Career Interests:** Analysis and ranking of hardware-related roles.
* **AC Remote Case Study:**
    * **Communication:** IR (Infrared) vs. RF (Radio Frequency) analysis.
    * **Architecture:** Component breakdown and signal encoding logic.

---

## Part D – Grocery Management System
A full-stack solution for inventory and order management.

### Tech Stack
* **Backend:** ASP.NET Core Web API (C#)
* **Frontend:** React.js
* **Database:** SQL Server

### System Roles
* **Supplier (Client Side):**
    * Registration & Secure Login.
    * Order management & status updates (e.g., "In Progress").
* **Store Owner (Server Side):**
    * Creating new supply orders.
    * Real-time status tracking & delivery confirmation ("Completed").
    * Comprehensive order history.

---

## ✅ Bonus – Automatic Reordering System
* **Automation Flow:**
    1.  Receives JSON data from a **POS API**.
    2.  Real-time inventory deduction.
    3.  **Smart Sourcing:** If stock < minimum, the system automatically orders from the **cheapest supplier**.
    4.  **Error Handling:** Triggers alerts if no supplier is available for a required product.

---

## 🛠 Technologies Used

| Category | Technology |
| :--- | :--- |
| **Languages** | Python, C#, JavaScript (ES6+) |
| **Data Tools** | Pandas, Parquet |
| **Frameworks** | ASP.NET Core, React.js |
| **Database** | SQL Server |
| **Tools** | Git, Argparse |

---

Developed by [Your Name] 🚀
