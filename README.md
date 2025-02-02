<!-- Logo and website link -->
<div align="center">

[![Fridge Master Logo](readme-assets/logo_readme.png)](https://www.thefridgemaster.com)

#
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)](https://github.com/eunyoungKim0728/FridgeMaster/releases/tag/v1.0.0)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)](readme-assets/license)


Manage your kitchen with **Fridge Master**, built with **frontend** (React, JavaScript), **backend** (Python, AWS Lambda), and **database** (PostgreSQL). Easily track your fridge items, get AI-powered recipe suggestions, and reduce food waste.<br>—All within an intuitive and user-friendly interface!—


</div>

<p align="center">
  <video src="https://github.com/user-attachments/assets/608c7a5b-2a32-4d6d-9911-90700b4329ae" width="100%" />
</p>


## ⚡ Quick-Link

🌐 **[Website](https://www.thefridgemaster.com)**  
Access the live version of Fridge Master.

💭 **[Share Your Feedback](https://docs.google.com/forms/d/e/1FAIpQLSfLQGK7IUaecTqFAJ5C7fbwYgTntyiopcf2uMj6LzWM1be-fg/viewform?usp=dialog)**  
Help us improve by sharing your experience!

👆 **[Download v1.0.0](https://github.com/eunyoungKim0728/FridgeMaster/releases/tag/v1.0.0)**  
The initial release of **Fridge Master**, featuring fridge management, expiration date tracking, and recipe suggestions.



## ✨ Features

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/7211c1a9-f62e-4823-a93b-b956b213c208" width="385"/></td>
    <td><img src="https://github.com/user-attachments/assets/8ddae0d5-3bfa-4e17-9c57-ecc3a9494a43" width="385"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/8a343552-a4ab-4f7a-a4c5-3371407073e1" width="385"/></td>
    <td><img src="https://github.com/user-attachments/assets/acc9cff5-85b7-4634-8b2e-b7bee84fc917" width="385"/></td>
  </tr>
</table>


## ⚙️ Tech-Stack
### Frontend
#### Language
- **JavaScript**

#### Library
- **React**: v18.3.1
- **React DOM**: v18.3.1 - For rendering React components to the DOM.

#### Framework
- **Material-UI**: 
  - **@mui/material**: v5.16.7 - Template and UI components.
  - **@mui/icons-material**: v5.16.7 - Icon library for Material-UI.
- **Styled-Components**: v6.1.13 - Styling for React components.

#### Package
- **React Router DOM**: v6.26.2 - For page navigation.
- **React Hook Form**: v7.53.0 - For form handling and validation.
- **React Scroll**: v1.9.0 - For Scrolling between sections.
- **Axios**: v1.7.7 - For making HTTP requests.
- **Day.js**: v1.11.13 - Manipulate date and time.
- **EmailJS**: v4.4.1 - Send emails from the browser.
- **@react-three/fiber**: v8.17.10 - React renderer for 3D objects with Three.js.


### Backend
Provides efficient APIs using **Django** (v4.2) and **Python** (v3.12).
- **AWS Lambda**: Serverless functions for executing backend logic.
- **AWS API Gateway**: Configured as a REST API that manages endpoints and enables seamless communication between the frontend and backend.

#### Database
- **AWS RDS(PostgreSQL)**: v16.3 - Integrated with Django for efficient data management.


#### Deployment
- **AWS S3**: For hosting static assets
- **AWS Route 53**: Configured for domain management and routing.
- **AWS Certificate Manager**: Ensures secure communication via HTTPS.
- **GitHub Actions**: Configured a deployment pipeline. When changes are pushed to the frontend's main branch, the pipeline automatically triggers deployment, ensuring efficient and seamless updates.

#### AI Integration
- **OpenAI API**: Implemented AI-driven recipe recommendations by analyzing user-inputted food items nearing expiration and suggesting recipes to reduce food waste.

## 📐 Design & Methodology
- Project timelines managed using **Agile methodology**, with 2-week sprints tracked via **Azure DevOps Boards**.
- **Use Case Diagrams** and **ERD Diagrams** were used to design and implement the database structure.  
- Designed web layouts using **Figma**, ensuring user-friendly interfaces aligned with the 3-click principle.
  
## 🤝 Contribution 
If you want to say **thank you** or/and support active development of Fridge Mater:
- Add a [GitHub Star](https://github.com/eunyoungKim0728/FridgeMaster) to the project.
- **Bug Report**: Found a bug? Let us know by creating a [GitHub Issue](https://github.com/eunyoungKim0728/FridgeMaster/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=%F0%9F%90%9B+Bug+Report%3A+).
- **Feature Request**: Have an idea to make FridgeMaster better? Submit your suggestions as a [Feature Request](https://github.com/eunyoungKim0728/FridgeMaster/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.yml&title=%F0%9F%92%A1+Feature+Request%3A+). 


## ❤️ Support the author
You can support this project by contributing through Ko-fi. All proceeds will be used to enhance this project and inspire the creation of new tools and articles for the community.

[![Buy Me a Coffee](https://cdn.ko-fi.com/cdn/kofi3.png?v=3)](https://ko-fi.com/eunyoungkim)


## 📃 License
- [Fridge Master](https://github.com/eunyoungKim0728/FridgeMaster) is free for using, viewing, and forking.
- However, modification, redistribution, or commercial use is strictly prohibited without prior written consent from the project owner.
- If you wish to modify, redistribute, or use this project commercially, please contact us at: devs.dolphin@gmail.com.


