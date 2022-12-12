"""
Adds rides to the user's account
"""
import sys
import json
import random
import string
from datetime import datetime

def generate_id():
    # initializing size of string
    N = 7

    # using random.choices()
    # generating random strings
    return ''.join(random.choices(string.ascii_uppercase +
                                string.digits, k=N))

if __name__ == "__main__":
    user_id = sys.argv[1]
    rides  = sys.argv[2]
    data = {}
    with open('./examples/_test_user.json', "r") as f:
        data = json.loads(f.read())
        
    # add a ride
    for i in range(0, int(rides)):
        ride = {
            "ride_id": generate_id(),
            "start": datetime.isoformat(datetime.utcnow()),
            "end": datetime.isoformat(datetime.utcnow()),
        }
        
        data['rides'].append(ride)
        
    with open("./examples/_test_user.json", "w") as outfile:
        json.dump(data, outfile)
    
    print(f"Created {rides} rides for user {user_id}")

