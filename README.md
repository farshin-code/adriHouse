# AdriHouse

### AI assistant to search and find your next home.
Instead of using boring advanced search options, Just talk with the app, get your result back, talk again and again until getting your desired result. 

In case demonstrates below:
- **I'm looking for a house with 3 beds and 3 baths**
- Result appears with three houses.
- **Just in Richmond Hill**
- Result hide richmond hill from list.

![AdriHouse-client (1)](https://github.com/farshin-code/adriHouse/assets/76722711/30209103-48ae-4ce1-b9b4-dfde7d69c03a)



Project Consists of five microservices:

- **Auth**
- **API**
- **File**
- **Answering**
- **Client**

And following components :

- **SQL Server**
- **MongoDB**
- **Redis**
- **RabbitMQ**

### Workflow Diagram

![adriHouse drawio](https://github.com/farshin-code/adriHouse/assets/76722711/9aba9e26-2d6e-403a-8919-28df9e1748b6)

### Auth (NodeJS)

Auth service provides the ability of sign-up / sign-in with both **JWT** and **session**. It also utilizes Google Auth service to add Google login feature to the project. App stores sessions in Redis to share them between microservices.

### API (NODEJS)

API service provides different features:

**-** **Search** to get the conversation and send it as a message to Message-Broker (RabbitMQ), get the SQL answer Back and query the existing data based on it.

**-** **New Listing** to get a new entry from signed-in users and add it to list of properties.

**-** **New User** to sign up new user.

Requests to search MSSQL **will be cached** for 10 minutes.

Requests are limited to 10 per IP per Hour.

### File (NODEJS)

File service provides APIs to save / delete files (images)

### Answering (PYTHON/Flask)

**Event-Driven** microservice, which is connected to RabbitMQ, to send prompts to OpenAI and send back SQL statement.

### Client (Angular)

User interface which is implemented by Angular and Bootstrap.
