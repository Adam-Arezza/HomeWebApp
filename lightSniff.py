import requests
import json
import time

groups = []
#states = []

def checkForLights(groups):
    r = requests.get("http://192.168.0.3/api/zjMUMakQKZlX-TXwiYioPBF7QBfDvHCMcHzhIxmx/groups")
    myDict = r.json()
    for i in myDict:
        groups.append(myDict[i]['name'])
        #states.append(myDict[i]['state']['all_on'])
    
checkForLights(groups)    


