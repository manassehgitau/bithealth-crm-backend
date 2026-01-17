# BitHealth CRM Backend

A comprehensive Customer Relationship Management (CRM) backend system designed for health and fitness tracking applications. This system manages users, employees, customers, products, events, and sales leads with role-based access control.

## 🚀 Features

### User Management
- **Multi-role Authentication**: Support for Admin, Employee, and User roles
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **User Registration & Login**: Complete authentication flow with token generation
- **Account Status Management**: Activate/deactivate user accounts
- **User Statistics**: Comprehensive analytics and reporting

### Customer Management
- **Customer Profiles**: Detailed customer information with health analytics
- **Health Analytics Tracking**: Monitor heart rate, steps, calories burned, and distance covered
- **Product Association**: Link customers to health/fitness products
- **CRUD Operations**: Full create, read, update, and delete capabilities

### Employee Management
- **Employee Profiles**: Extended user profiles with additional employee-specific data
- **Sales Lead Assignment**: Assign and track sales leads for each employee
- **Duty Management**: Assign tasks with status tracking (Pending, In Progress, Completed)
- **Lead Status Tracking**: Monitor lead progress (Contacted, Negotiation, Closed)
- **Account Information**: Store banking details for payment processing

### Product Management
- **Product Catalog**: Manage health and fitness products
- **CRUD Operations**: Full product lifecycle management
- **Product-Customer Linking**: Associate products with customers

### Event Management
- **Event Creation**: Schedule and manage events
- **Role-based Access**: Events accessible to admin, employee, and user roles
- **Event Tracking**: Full CRUD operations for event management

### Sales & Analytics
- **Profit Margins**: Track and manage profit margins
- **Sales Leads**: Comprehensive lead management system
- **Lead Actions**: Record actions taken on each lead
- **User Statistics**: Dashboard-ready analytics

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Cloudinary
- **Email**: Nodemailer
- **CORS**: Enabled for cross-origin requests
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas account)
- Cloudinary account (for image uploads)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/manassehgitau/bithealth-crm-backend.git
cd bithealth-crm-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following variables:

```env
# Database
CONNECTION_STRING=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Port
PORT=3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (for Nodemailer)
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_address
EMAIL_PASSWORD=your_email_password
```

4. **Start the development server**
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your specified PORT).

5. **Start the production server**
```bash
npm start
```

**Note**: The `npm start` script in package.json currently references `node server` which may need to be updated to `node src/index.js` to match the actual entry point.

## 📁 Project Structure

```
bithealth-crm-backend/
├── src/
│   ├── config/
│   │   └── dbConnect.js           # MongoDB connection configuration
│   ├── controllers/
│   │   ├── Admin-Functions/       # Admin-specific controllers
│   │   │   ├── adminUserController.js
│   │   │   ├── adminProductController.js
│   │   │   ├── adminEmployeeController.js
│   │   │   └── adminCustomerController.js
│   │   ├── Employee-Functions/    # Employee-specific controllers
│   │   │   └── EmployeeController.js
│   │   ├── User-Functions/        # User-specific controllers
│   │   │   └── userController.js
│   │   ├── General-Event-Functions/
│   │   │   └── eventController.js
│   │   ├── authController.js      # Authentication logic
│   │   └── uploadImages.js        # Image upload handler
│   ├── middlewares/
│   │   └── authMiddleware.js      # JWT verification & role authorization
│   ├── models/
│   │   ├── userModel.js           # Base user schema
│   │   ├── adminModel.js          # Admin schema
│   │   ├── employeeModel.js       # Employee schema (extends User)
│   │   ├── customerModel.js       # Customer schema (extends User)
│   │   ├── productModel.js        # Product schema
│   │   ├── eventModel.js          # Event schema
│   │   ├── leadModel.js           # Sales lead schema
│   │   ├── dutyModel.js           # Duty/task schema
│   │   ├── orderModels.js         # Order schema
│   │   └── marginStats.js         # Profit margin schema
│   ├── routes/
│   │   ├── Admin-Routes/
│   │   │   └── adminRoutes.js     # Admin API routes
│   │   ├── Event-Routes/
│   │   │   └── eventRoutes.js     # Event API routes
│   │   └── authRoutes.js          # Authentication routes
│   └── index.js                   # Application entry point
├── .env                           # Environment variables (not tracked)
├── .gitignore                     # Git ignore file
├── package.json                   # Project dependencies
├── vercel.json                    # Vercel deployment config
└── README.md                      # This file
```

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user profile | Protected (Admin, User) |

### Event Routes (`/api/events`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all events | Protected (Admin, Employee, User) |
| POST | `/` | Create new event | Protected (Admin, Employee, User) |
| GET | `/:id` | Get event by ID | Protected (Admin, Employee, User) |
| PATCH | `/:id` | Update event | Protected (Admin, Employee, User) |
| DELETE | `/:id` | Delete event | Protected (Admin, Employee, User) |

### Admin Routes (`/api/admin`)

#### User Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/users` | Get all users | Protected (Admin) |
| POST | `/users` | Create new user | Protected (Admin) |
| GET | `/users/:id` | Get user by ID | Protected (Admin) |
| PATCH | `/users/:id` | Update user | Protected (Admin) |
| DELETE | `/users/:id` | Delete user | Protected (Admin) |
| GET | `/stats` | Get user statistics | Protected (Admin) |

#### Customer Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/customers` | Get all customers | Protected (Admin) |
| POST | `/customers` | Create new customer | Protected (Admin) |
| GET | `/customers/:id` | Get customer by ID | Protected (Admin) |
| PATCH | `/customers/:id` | Update customer | Protected (Admin) |
| DELETE | `/customers/:id` | Delete customer | Protected (Admin) |
| PATCH | `/customers/activate/:id` | Activate customer account | Protected (Admin) |
| PATCH | `/customers/deactivate/:id` | Deactivate customer account | Protected (Admin) |

#### Product Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/products` | Get all products | Public |
| POST | `/products` | Create new product | Protected (Admin) |
| GET | `/products/:id` | Get product by ID | Public |
| PATCH | `/products/:id` | Update product | Protected (Admin) |
| DELETE | `/products/:id` | Delete product | Protected (Admin) |

#### Employee Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/employee` | Get all employees | Protected (Admin) |
| POST | `/employee` | Create new employee | Protected (Admin) |
| GET | `/employee/:id` | Get employee by ID | Protected (Admin) |
| PATCH | `/employee/:id` | Update employee | Protected (Admin) |
| DELETE | `/employee/:id` | Delete employee | Protected (Admin) |
| POST | `/employee/assignDuty` | Assign duty to employee | Protected (Admin) |
| GET | `/employee/tasks/:id` | View employee duties | Protected (Admin) |
| POST | `/employee/lead` | Create new sales lead | Protected (Admin) |
| PUT | `/employee/assign-lead` | Assign sales lead to employee | Protected (Admin) |
| GET | `/employee/leads/:employeeId` | Get employee leads | Protected (Admin) |

#### Sales Leads & Analytics
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/allLeads` | Get all sales leads | Protected (Admin) |
| POST | `/employee/lead` | Create new sales lead | Protected (Admin) |
| PUT | `/employee/add-action` | Add action to lead | Protected (Admin) |
| PUT | `/employee/assign-lead` | Assign lead to employee | Protected (Admin) |
| POST | `/stats/margins` | Create profit margins | Protected (Admin) |
| GET | `/stats/margins/:id` | Get profit margins by ID | Protected (Admin) |
| PATCH | `/stats/margins/:id` | Update profit margins | Protected (Admin) |

#### Image Upload
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/uploadImage` | Upload image to Cloudinary | Protected (Admin) |

## 🔑 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Generation
- Tokens are generated upon successful login
- Tokens expire after 7 days
- Token contains the user ID which is used for authorization

### Role-based Access Control
The system supports three user roles:
- **Admin**: Full access to all endpoints
- **Employee**: Access to employee-specific features and events
- **User**: Limited access to user-specific features and events

## 📝 Example API Usage

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": "user",
    "phone": "+1234567890",
    "location": "New York"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Get current user (Protected)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 🗄️ Database Models

### User Schema (Base)
- username, email, password (hashed)
- phone, location, image
- role (admin/employee/user)
- status (active/inactive)
- timestamps

### Customer Schema (extends User)
- analytics (health metrics: heartRate, kmsCovered, steps, caloriesBurned)
- products (array of product references)

### Employee Schema (extends User)
- salesLeads (array with lead status and details)
- duty (array with duty status, details, and deadline)
- AccountNumber, AccountHost

### Product Schema
- Product details for health/fitness items

### Event Schema
- Event information and scheduling

### Lead Schema
- Sales lead information and tracking

## 🚢 Deployment

### Vercel Deployment

This project is configured for Vercel deployment. The `vercel.json` file is included for easy deployment.

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Make sure to configure your environment variables in the Vercel dashboard.

## 🛡️ Security Features

- Password hashing using bcryptjs
- JWT-based authentication
- Role-based access control
- Input validation on all routes
- CORS configuration
- Environment variable protection

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Manasseh Gitau**

- GitHub: [@manassehgitau](https://github.com/manassehgitau)

## 🐛 Issues

If you encounter any issues or have suggestions, please file an issue on the [GitHub Issues](https://github.com/manassehgitau/bithealth-crm-backend/issues) page.

## 📞 Support

For support, email the repository owner or open an issue on GitHub.

---

**Note**: This is a backend API. For the complete application, you'll need to set up a frontend that consumes these endpoints. The CORS configuration currently allows requests from `http://localhost:5173` (typical Vite/React dev server).
