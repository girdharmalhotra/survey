Overview
===============

This is the Tesla Toolbox front-end engineer take home challenge.  What we are looking for is your ability to deliver
a web-page built on top of this simple python server.  We are using Flask to generate a basic server that has a few
REST endpoints, and a single route to return the index page.

Basic Requirements
---------------

1. You should show a random question from the backend server for the user to answer.  This should show the questions
   and the possible answers for someone to select.

2. Once the user selects an answer, you should update the backend with the new count for the number of times an
   answer has been selected.

3. After that, you should display the total number of times each answer has been given for this question and
   prompt the user to perform another question.

4. If the user chooses to perform another, randomly provide them with a question which they have not yet seen. Continue
   doing this until the user has answered each question once. If the user chooses to continue from there, deliver them a
   random question and repeat until they have answered each twice, three times, etc.

5. There are a few small issues with the back-end server, please correct any that you recognize and add a brief
   comment indicating what the bug had previously been.

What we are looking for
---------------

From here, you have the freedom to choose how to implement the rest of the app.  For consideration for a front-end
role, we are looking for a few things -- how you structure your javascript code, what libraries and frameworks you
choose to use, and how you decide to display information to the end user.  To join our team in the front-end capacity,
it is very important to keep in mind both the user and code maintainability / structure.

You may use any javascript and css libraries you wish, and may modify the server code however you like as well.

Getting Setup
===============

We recommend putting Python code into a virtual environment, however it is not a requirement.  If you do create a
virtualenv, please do not include it with your submission back to us.

To get started with what you need, you will simply need to be in the root directory of this package and run:

    pip install -r requirements.txt
    python server.py

That should install the requried libraries for this project, and then start your web server.  If you run into trouble,
please reference the documentation for:

* pip: https://docs.python.org/3.6/installing/index.html
* flask: http://flask.pocoo.org/

Usage
==============

We have provided a few basic routes to work with.  Once you have started the flask server, you can go to:

    http://127.0.0.1:5000/

This will render the file from the `templates/index.html` file to the web browser.  You can modify that file as you
see fit to accomplish this task.

In addition to this HTTP we have setup the `questions` and `answers` resources.

    GET/POST            /questions
    GET/PUT/DELETE      /questions/:id
    
    GET/POST            /answers
    GEt/PUT/DELETE      /answers/:id

The /questions route will return a list of all available questions and their answers.  The `Question` object will contain
the following fields:

    {
        id: <int>,
        question: <string>,
        answers: [ <Answer Object>, .. ]
    }

And the `Answer` object will contain:

    {
        id: <int>,
        answer: <string>,
        question_id: <int>
        count: 0
    }

You may add any more routes you wish, for this test we are using `flask-restful` as the middleware to generate the routes.

Example Usage with jQuery (provided)
===============

    $.get('/questions', function (questions) { console.log(questions); });
    
    $.ajax({
        method: 'put',
        url: '/answers/1',
        data: JSON.stringify({
            count: 1
        }),
        dataType: 'json',
        contentType: 'application/json',
        success: function (answer) {
            console.log(answer);
        }
    });