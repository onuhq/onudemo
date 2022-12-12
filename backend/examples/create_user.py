"""
Creates a new rideshare user
"""
import string
import random
import sys
import json

def generate_id():
    # initializing size of string
    N = 7

    # using random.choices()
    # generating random strings
    return ''.join(random.choices(string.ascii_uppercase +
                                string.digits, k=N))

if __name__ == "__main__":
    email = sys.argv[2]
    user_id = generate_id()
    
    user = {
        "userId": user_id,
        "email": email,
        "rides": [],
        "is_admin": False
    }
    
    with open("./examples/_test_user.json", "w") as outfile:
        json.dump(user, outfile)

    print(f"Created user {user_id}")




