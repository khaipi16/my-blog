


class User:
    def __init__(self, user_id, first_name, last_name, dob, email, password, is_admin=False, max_blogs=None):
        self.user_id = user_id
        self.is_admin = is_admin
        self.first_name = first_name
        self.last_name = last_name
        self.dob = dob
        self.email = email
        self.password = password
        self.max_blogs = max_blogs

    
    def from_dict(cls, data):
        return cls(
            user_id=data.get('user_id'),  # Ensure user_id is handled if required
            first_name = data.get('firstName'),
            last_name = data.get('lastName'),
            dob = data.get('dob'),
            email = data.get('email'),
            password = data.get('password')
        )
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'is_admin': self.is_admin,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'dob': self.dob,
            'email': self.email,
            'password': self.password,
            'max_blogs': self.max_blogs
        }
        