"""
Makes the user an admin
"""
import sys
import json


if __name__ == "__main__":
    user_id = sys.argv[1]
    data = {}
    with open('./examples/_test_user.json', "r") as f:
        data = json.loads(f.read())
        
    # add a ride
    if data["is_admin"]:
        print(f"user {user_id} is already an admin")
    else:
        data["is_admin"] = True
        
    with open("./examples/_test_user.json", "w") as outfile:
        json.dump(data, outfile)
    
    print(f"Made user {user_id} an admin")

