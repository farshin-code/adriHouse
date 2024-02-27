# AdriHouse
### AI assistant to search and find your next home.

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

 ### Auth (NodeJS)
 Auth service provides the ability of sign-up / sign-in with both **JWT** and **session**. It also utilizes Google Auth service to add Google login feature to the project. App stores sessions in Redis to share them between microservices.
 ### API (NODEJS)
API service provides different features:

**-**  **Search** to get the conversation and send it as a message to Message-Broker (RabbitMQ), get the SQL answer Back and query the existing data based on it. 

 **-** **New Listing** to get a new entry from signed-in users and add it to list of properties.
 
 **-** **New User** to sign up new user.
  
### File (NODEJS)
File service provides APIs to save / delete files (images)

### Answering (PYTHON/Flask)
**Event-Driven** microservice, which is connected to RabbitMQ, to send prompts to OpenAI and send back SQL statement.
 ### Client (Angular)
 User interface which is implemented by Angular and Bootstrap.

