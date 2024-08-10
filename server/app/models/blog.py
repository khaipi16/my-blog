from datetime import datetime

class Blog:
    def __init__(self, user_id, title, author, category, content):
        self.user_id = user_id
        self.title = title
        self.author = author
        self.content = content
        self.category = category
        self.date = datetime.utcnow() # time of creation


    # Serves as the structure in which the data will be saved in db
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'title': self.title,
            'author': self.author,
            'category': self.category,
            'content': self.content,
            'date': self.date
        }

    
    