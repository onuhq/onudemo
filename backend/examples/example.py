"""
This is just a test python script
"""
import sys

if __name__ == "__main__":
    name = sys.argv[1]
    times = int(sys.argv[2])
    while times > 0:
        print(f"woo {name}")
        times -= 1
