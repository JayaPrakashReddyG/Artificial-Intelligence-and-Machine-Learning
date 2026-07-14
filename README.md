# 🌊 Rising Waters: Smart AI Flood Prediction System

An intelligent **Machine Learning and Flask-based Flood Prediction System** that predicts the likelihood of flood occurrences using historical weather and rainfall data. The application helps disaster management authorities and local governments make informed decisions by providing accurate flood risk predictions through a simple web interface.

The system automates flood prediction using supervised machine learning algorithms, reducing manual analysis while improving the speed and accuracy of early warning systems.

---

## 🚀 Features

- User-friendly web interface
- Weather parameter input form
- Data preprocessing and feature engineering
- Multiple Machine Learning models
- XGBoost selected as the best-performing model
- Real-time Flood / No Flood prediction
- Flask-based web application
- Local deployment support
- Ready for cloud deployment (IBM Cloud/Render)

---

# 📂 Repository Structure

```
Rising-Waters-Flood-Prediction
│
├── 1. Brainstorming & Ideation
│   ├── Brainstorming & Idea Prioritization.pdf
│   ├── Define Problem Statements.pdf
│   └── Empathy Map.pdf
│
├── 2. Requirement Analysis
│   ├── Customer Journey Map.pdf
│   ├── Data Flow Diagram.pdf
│   ├── Solution Requirements.pdf
│   └── Technology Stack.pdf
│
├── 3. Project Design Phase
│   ├── Problem-Solution Fit.pdf
│   ├── Proposed Solution.pdf
│   └── Solution Architecture.pdf
│
├── 4. Project Planning Phase
│   └── Project Planning.pdf
│
├── 5. Project Development Phase
│   ├── Code Layout, Readability and Reusability.pdf
│   ├── Coding & Solution.pdf
│   ├── Functional Features Included.pdf
│   │
│   └── Rising-Waters
│       ├── dataset
│       │   └── floods.csv
│       │
│       ├── static
│       │   ├── css
│       │   └── images
│       │
│       ├── templates
│       │   ├── index.html
│       │   └── result.html
│       │
│       ├── app.py
│       ├── train_model.py
│       ├── floods.save
│       ├── transform.save
│       ├── requirements.txt
│       └── README.md
│
├── 6. Project Testing
│   ├── Performance Testing.pdf
│   └── UAT Report.pdf
│
├── 7. Project Documentation
│   ├── Project Executable Files.pdf
│   └── Project Documentation.pdf
│
├── 8. Project Demonstration
│   ├── Communication.pdf
│   ├── Demonstration of Proposed Features.pdf
│   ├── Project Demo Planning.pdf
│   ├── Scalability & Future Plan.pdf
│   └── Team Involvement.pdf
│
└── README.md
```

---

# 🛠 Technology Stack

## Frontend

- HTML5
- CSS3
- Bootstrap
- JavaScript

## Backend

- Python
- Flask

## Machine Learning

- Scikit-learn
- XGBoost
- Decision Tree
- Random Forest
- K-Nearest Neighbors (KNN)

## Data Processing

- Pandas
- NumPy

## Data Visualization

- Matplotlib
- Seaborn

---

# 📂 Dataset

**Source:** Kaggle

Dataset contains historical weather and flood-related information used for training the prediction model.

Example attributes include:

- Annual Rainfall
- Cloud Visibility
- January Rainfall
- July Rainfall
- Seasonal Rainfall
- Temperature
- Humidity
- Flood Status

---

# 🤖 Machine Learning Models

The following supervised learning algorithms were evaluated:

- Decision Tree
- Random Forest
- K-Nearest Neighbors (KNN)
- XGBoost ✅ (Final Model)

### Best Model

| Model | Accuracy |
|--------|----------|
| Decision Tree | 91.20% |
| Random Forest | 94.87% |
| KNN | 90.15% |
| **XGBoost** | **96.55%** |

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/GovulaJayaPrakashReddy/Rising-Waters-Flood-Prediction.git
```

Move into the project folder

```bash
cd Rising-Waters-Flood-Prediction
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment (Windows)

```bash
venv\Scripts\activate
```

Install Required Packages

```bash
pip install -r requirements.txt
```

---

# ▶ Train the Model

```bash
python train_model.py
```

This will generate

- floods.save
- transform.save

---

# ▶ Run the Application

```bash
python app.py
```

Open Browser

```
http://127.0.0.1:5000/
```

---

# 🔄 Application Workflow

1. Enter weather-related parameters.
2. Click **Predict**.
3. Input data is preprocessed.
4. Data is scaled using the trained StandardScaler.
5. The trained XGBoost model predicts flood occurrence.
6. The application displays:

- 🌊 Flood Likely
- ✅ No Flood

---

# 🌍 Real-World Use Cases

## Scenario 1: Early Flood Warning

Meteorological officers enter current rainfall and cloud visibility data.

The system predicts the probability of flooding and helps authorities issue evacuation alerts before heavy flooding occurs.

---

## Scenario 2: Disaster Management

Emergency response teams monitor multiple flood-prone districts by entering regional weather conditions.

The application instantly classifies flood risk, enabling faster deployment of rescue teams and emergency supplies.

---

## Scenario 3: Government Analysis

Researchers evaluate historical flood records using the trained model.

The XGBoost model achieves **96.55% accuracy**, making it suitable for operational decision support.

---

# 📈 Performance

- Best Accuracy: **96.55%**
- Fast Prediction Time
- Low Memory Consumption
- Scalable Flask Application
- Ready for IBM Cloud Deployment

---

# 💻 Hardware Requirements

- Intel Core i3 Processor or Above
- 4 GB RAM (Minimum)
- 2 GB Free Storage
- Internet Connection

---

# 💾 Software Requirements

- Windows / Linux / macOS
- Python 3.8+
- Flask
- Jupyter Notebook / Anaconda
- Visual Studio Code
- Git

---

# 📦 Python Libraries

- Flask
- pandas
- numpy
- scikit-learn
- xgboost
- matplotlib
- seaborn
- joblib

---

# 📊 Project Statistics

| Item | Count |
|------|-------|
| Epics | 9 |
| Tasks | 24 |
| Subtasks | 0 |

---

# 👥 Team Members

| Name | Role |
|------|------|
| **Govula Jaya Prakash Reddy** | Team Lead |
| Yerukala Madhu | Member |
| V. Yuva Kishore | Member |
| Peddisetty Usharani | Member |
| Y. R. Kiran Kumar | Member |

---

# 🎯 Future Enhancements

- Live weather API integration
- Google Maps flood visualization
- SMS and Email alerts
- Mobile application
- IoT sensor integration
- Deep Learning-based prediction
- Multi-region flood forecasting
- Real-time dashboard

---

# 📄 License

This project is developed for educational and research purposes.

---

# ⭐ Acknowledgements

- Kaggle (Dataset)
- Scikit-learn
- XGBoost
- Flask
- Pandas
- NumPy
- Matplotlib
- Seaborn

---

## 📬 Contact

**Govula Jaya Prakash Reddy**

📧 Email: gjayaprakashreddy019@gmail.com

🌐 GitHub: https://github.com/GovulaJayaPrakashReddy

---

## ⭐ If you found this project helpful, don't forget to star the repository!
