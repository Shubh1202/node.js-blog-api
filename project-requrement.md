npm init
npm install express, dotenv, postgressql, prisma, expressjs, helmet, cors, ratelimiter
5432

Winston , Pino , Morgan , Bunyan 

install postgresql
npm install @prisma/client
npm install prisma -D
npx prisma init

npm install pg-promise

# Types of logs and why we create each of them:

## Based on Log Levels

### 1. Error Logs: 
The error logs are generated when a major issue occurs in the application (such as a crash, database connection failure, 
or an unhandled exception).

यह तब बनाए जाते हैं जब एप्लिकेशन में कोई बड़ी समस्या आती है (जैसे- क्रैश होना, डेटाबेस कनेक्शन फेल होना, या अनहैंडल एक्सेप्शन)

### 2. Warn Logs
The Warn logs are logged when a situation arises that is not an immediate error but could become a problem in the future (such as the use of an old or deprecated API, or an increase in memory usage).

यह तब दर्ज होते हैं जब कोई ऐसी स्थिति आती है जो तुरंत एरर तो नहीं है, पर भविष्य में समस्या बन सकती है (जैसे- किसी पुरानी/Deprecate हो चुकी API का इस्तेमाल, या मेमोरी लिमिट का बढ़ना)।


### 3. Info Logs
The Info logs provides information about the application's general activities (such as the port on which the server started, database connection, and user login).

यह एप्लिकेशन की सामान्य गतिविधियों की जानकारी देते हैं (जैसे- सर्वर किस पोर्ट पर शुरू हुआ, डेटाबेस कनेक्ट हो गया, यूज़र ने लॉगइन किया)

### 4. Debug / Verbose Logs
These are intended for developers. They are created to track variable values, function flow, or detailed information during coding.

यह डेवलपर्स के लिए होते हैं। कोडिंग के दौरान वेरिएबल की वैल्यू, फंक्शन फ्लो या डीटेल जानकारी को ट्रैक करने के लिए बनाए जाते हैं।

### --------------------------------------------------------------------------------------

## Logs Based On Uses

### 1. HTTP / Request Logs
This logs contains details of every request sent by the user, such as the HTTP method (GET, POST), URL/route, response status code (200, 404, 500), and the time taken (response time). (Middleware like Morgan or pino-http is used for this).

इसमें यूज़र द्वारा भेजे गए हर रिक्वेस्ट की जानकारी होती है—जैसे HTTP Method (GET, POST), URL/Route, Response Status Code (200, 404, 500), और कितना समय (Response Time) लगा। (इसके लिए Morgan या pino-http मिडलवेयर का उपयोग होता है)।

### 2. Database Query Logs: 
Database Query Logs is used to track queries (SQL or NoSQL) executed in the database, their speed, and slow queries.

डेटाबेस में चलने वाली क्वेरी (SQL या NoSQL), उनकी स्पीड, और स्लो-क्वेरी (Slow queries) को ट्रैक करने वाले लॉग्स।

### 3. Security / Audit Logs: 
This logs is used to Records of user login, logout, password resets, failed login attempts, and admin actions.

यूज़र लॉगिन, लॉगआउट, पासवर्ड रिसेट, गलत पासवर्ड डालने की कोशिश (Failed login attempts), और एडमिन एक्शन्स के रिकॉर्ड्स।

### 4. Exception & Uncaught Rejection Logs: 
This logs is used to System logs capturing errors or unhandled promises that escaped the block.

try-catch ब्लॉक से बाहर छूट गई एरर या अनहैंडल वादों (Promises) को पकड़ने वाले सिस्टम लॉग्स।


\r Cancel command
\l Check the database



Act as a Seniour node.js backend developer to review only the code.

Miane node.js me 3 saal baad khud se API bnayi hai seekhen or smjhne ke liye ki kis trh node.js me asycn operation, error handeling, asynchronous error handeling, logs security, backgound me services kis trh se chalate hai, kis trh se node.js me api design kiya jaata hai


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYzIyZDBiOWE1NWY5ZTc3ZTQ2OGI3NiIsImlhdCI6MTc5MTExNjM1MywiZXhwIjoxNzkxMTE5OTUzfQ.Zr-kqIOFd_KWVe66kxSvnHZJGQTFtAruwqDcHBnOOXM