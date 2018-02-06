import os

from flask import Flask, request, render_template, Response
from flask_restful import Resource, Api

app = Flask(__name__, template_folder='./app/dist')
api = Api(app)

question_id_serial = 2
questions = {
    1: {
        'id': 1,
        'question': 'Is this hard?',
    },
    2: {
        'id': 2,
        'question': 'Who is going to win the SuperBowl in 2018?',
    },
    3: {
        'id': 3,
        'question': 'What is your favorite Tesla vehicle?',
    }
}

answer_id_serial = 10
answers = {
    1: {
        'id': 1,
        'question_id': 1,
        'answer': 'Yes',
        'count': 0
    },
    2: {
        'id': 2,
        'question_id': 1,
        'answer': 'No',
        'count': 0
    },
    3: {
        'id': 3,
        'question_id': 2,
        'answer': 'Eagles',
        'count': 0
    },
    4: {
        'id': 4,
        'question_id': 2,
        'answer': 'Patriots',
        'count': 0
    },
    5: {
        'id': 5,
        'question_id': 2,
        'answer': 'Seahawks',
        'count': 0
    },
    6: {
        'id': 6,
        'question_id': 2,
        'answer': 'Broncos',
        'count': 0
    },
    7: {
        'id': 7,
        'question_id': 3,
        'answer': 'Roadster',
        'count': 0
    },
    8: {
        'id': 8,
        'question_id': 3,
        'answer': 'Model S',
        'count': 0
    },
    9: {
        'id': 9,
        'question_id': 3,
        'answer': 'Model X',
        'count': 0
    },
    10: {
        'id': 10,
        'question_id': 3,
        'answer': 'Model 3',
        'count': 0
    }
}


class Answer(Resource):
    def get(self, answer_id):
        return answers[answer_id]

    def put(self, answer_id):
        answer = answers[answer_id]
        data = request.get_json()
        values = {k: data.get(k, v) for k, v in answer.items()}
        answers[answer_id].update(values)
        return values

    def delete(self, answer_id):
        values = answers[answer_id]
        del answers[answer_id]
        return values

class Answers(Resource):
    def get(self):
        return answers.values()

    def post(self):
        global answer_id_serial
        answer_id_serial += 1
        data = request.get_json()
        values = {
            'id': answer_id_serial,
            'answer': data['answer'],
            'count': data.get('count', 0),
            'question_id': data['question_id']
        }

        answers[answer_id_serial] = values
        return values


class Question(Resource):
    def get(self, question_id):
        data = questions[question_id].copy()
        data['answers'] = [ans for ans in answers.values() if ans['question_id'] == question_id]
        return data

    def put(self, question_id):
        question = questions[question_id]
        data = request.get_json()
        data.pop('answers', [])
        values = {k: data.get(k, v) for k, v in question.items()}
        questions[question_id].update(values)
        values['answers'] = [ans for ans in answers.values() if ans['question_id'] == question_id]
        return values

    def delete(self, question_id):
        values = questions[question_id]
        del questions[question_id]
        values['answers'] = [ans for ans in answers.values() if ans['question_id'] == question_id]
        return values


class Questions(Resource):
    def get(self):
        output = []
        for question in  questions.values():
            question = question.copy()
            question['answers'] = [ans for ans in answers.values() if ans['question_id'] == question['id']]
            output.append(question)
        return output

    def post(self):
        global question_id_serial
        question_id_serial += 1
        data = request.get_json()
        values = {
            'id': question_id_serial,
            'question': data['question']
        }
        questions[question_id_serial] = values
        return values

api.add_resource(Questions, '/questions')
api.add_resource(Question,  '/questions/<int:question_id>')
api.add_resource(Answers,   '/answers')
api.add_resource(Answer,    '/answers/<int:answer_id>')

@app.route('/')
def show_page():
    return render_template('index.html')

@app.route('/assets/<path:path>')
def get_resource(path):
    mimetypes = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.jpg': 'image/jpg',
        '.woff': 'font/opentype',
        '.woff2': 'font/opentype',
        '.ttf': 'font/opentype'
    }

    content = open('app/'+path).read()
    return Response(content, mimetype=mimetypes[os.path.splitext(path)[1]])

if __name__ == '__main__':
    app.run(debug=True)
