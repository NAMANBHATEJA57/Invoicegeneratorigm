# Invoice Generator SaaS (Single User System)

## 1. Product Overview

* **Project Title**: Invoice Generator
* **Version**: 1.0
* **Owner**: Naman
* **Platform**: Web (Desktop + Mobile)

### Description

A mobile-first invoice generation tool that allows a single user to create, manage, and export invoices as PDF with a fixed A4 layout.

---

## 2. Problem Statement

Freelancers and small creators manually create invoices repeatedly using static templates, leading to:

* Time wastage
* Repetitive data entry
* Lack of organization
* No invoice history tracking

---

## 3. Goals & Objectives

### Business Goals

* Reduce invoice creation time by **70%**
* Enable reusable client data
* Provide structured invoice management

### User Goals

* Quickly generate invoices
* Maintain invoice history
* Export professional PDFs

---

## 4. Success Metrics

* Time to create invoice < 2 minutes
* 100% accurate invoice numbering
* Zero manual calculation required
* Reuse clients in < 2 clicks

---

## 5. Target User

### Primary User

* Freelancer / Creator
* Single operator (no team)
* Medium technical familiarity

### Pain Points

* Repetitive work
* Manual calculations
* Disorganized records

---

## 6. Features & Requirements

### P0 (Must Have)

#### 1. Create Invoice

* Dynamic form input
* Auto invoice number generation
* Multi-service rows
* Auto total calculation

#### 2. Invoice Preview

* Fixed A4 layout (210mm × 297mm)
* Pixel-accurate structure
* Matches provided design

#### 3. PDF Export

* Download invoice as PDF
* Layout identical to preview

#### 4. Dashboard

* View all invoices
* Display:

  * Invoice number
  * Client
  * Amount
  * Date

#### 5. Edit Invoice

* Modify existing invoices
* Regenerate PDF

#### 6. Duplicate Invoice

* Clone invoice
* Generate new invoice number

---

### P1 (Should Have)

* Client saving and reuse
* Mobile-friendly form UX
* Preview toggle on mobile

---

### P2 (Nice to Have)

* Payment status (Paid / Unpaid)
* Filters on dashboard
* Search invoices

---

## 7. Out of Scope

* Authentication system
* Multi-user support
* Payment gateway integration
* Email sending
* Multi-currency

---

## 8. Core Logic

### Invoice Numbering

Format:
RB/1026/XX

Rules:

* RB → fixed prefix
* 1026 → fixed code
* XX → auto increment

Example:
RB/1026/01
RB/1026/02

---

## 9. User Flow

### Create Invoice Flow

1. User opens `/new`
2. Fills form:

   * Select/create client
   * Add services
3. System:

   * Calculates total
   * Generates invoice number
4. User clicks save
5. Invoice stored in DB
6. Preview displayed
7. User downloads PDF

---

### Edit Flow

1. User opens `/invoice/:id`
2. Edits data
3. Saves changes
4. PDF updates

---

### Dashboard Flow

1. User opens `/dashboard`
2. Views list of invoices
3. Actions:

   * View
   * Edit
   * Duplicate

---

## 10. Database Schema

### Client

* id
* name
* address
* email
* phone

### Invoice

* id
* invoiceNumber
* clientId
* date
* dueDate
* totalAmount
* notes

### Service

* id
* invoiceId
* description
* qty
* rate
* total

### Meta

* key = "invoice_counter"
* value = number

---

## 11. Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API routes

### Database

* PostgreSQL (Neon)
* Prisma ORM

### PDF

* react-to-pdf

---

## 12. UI/UX Guidelines

### Invoice Preview

* Fixed A4 layout
* Non-responsive
* Print-first design

### Form

* Mobile-first
* Clean input structure
* Dynamic services

### Desktop Layout

* Left → Form
* Right → Preview

---

## 13. Constraints

* Single user system
* No authentication
* Hosted on Vercel
* Must maintain invoice design integrity

---

## 14. Risks

* PDF rendering mismatch
* Layout inconsistency across browsers

### Mitigation

* Use fixed dimensions
* Avoid responsive styles in preview

---

## 15. Future Scope

* Multi-user system
* Payment tracking
* Email invoices
* GST support
* Analytics dashboard

---

## 16. Final Notes

This project prioritizes:

* Simplicity
* Accuracy
* Speed
* Clean UI

The invoice preview should be treated as a **print document**, not a responsive UI.
