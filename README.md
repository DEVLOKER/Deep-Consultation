# Deep Consultation
MERN application for managing consultations, where the clients can publish their 
consultations in order to process them by a consultation manager.
. A consultation can attached with many files with different extensions.
. The consultation manager process the consultation and re-publish it again.
. The client can download the consultation attachments after the process.


## Run the project
## Database
- install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
- install [MongoDB Compass](https://www.mongodb.com/try/download/compass).

### Backend
- configure your `.env` file:

| Key | value |
| --- | --- |
| DB_HOST | `127.0.0.1` |
| DB_PORT | `27017` |
| DB_NAME | `deepconsultation` |
| SERVER_PORT | `4000` |
| SESSION_SECRET | your secret, eg : QdqH71PWFzUlIppyBteu... |
| ADMIN_CONTACT_USERNAME | `admin` |
| ADMIN_CONTACT_EMAIL | your email |
| ADMIN_CONTACT_PASSWORD | your password |
| ADMIN_CONTACT_PHONE | your number |
| DB_PORT | `27017` |

- run `cd backend && npm i`
- run `npm start`
- login with admin username & password `ADMIN_CONTACT_EMAIL`, `ADMIN_CONTACT_PASSWORD` in `.env` file.
- create a client account from `comptes` menu in the header.
![create account](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/create_account.jpg?raw=true "create account")

### Frontend
- `cd frontend && npm i`
- `npm start`
- login with the client account that you create in admin section.

## Screenshots

### Home page
![home page](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/full_home.jpg?raw=true "home page")
![home page](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/home.jpg?raw=true "home page")
![login page](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/login.jpg?raw=true "login page")

### Client `consultation user`
- the client create a consultation, such that it can attached with many files with different extensions.
![create a consultation](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/create_consultation.jpg?raw=true "create a consultation")

### Admin `consultation manager`
- The consultation manager process the consultation and re-publish it again.
![process a consultation](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/admin_process_consultation.jpg?raw=true "process a consultation")
![consultation processed](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/admin_consultation_processed.jpg?raw=true "consultation processed")

### Client `consultation user`
- The client can download the consultation attachments after the process.
![view processed consultation](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/client_processed_consultation.jpg?raw=true "view processed consultation")
![download processed consultation attachments](https://github.com/DEVLOKER/Deep-Consultation/blob/main/screenshots/client_download_consultation.jpg?raw=true "download processed consultation attachments")