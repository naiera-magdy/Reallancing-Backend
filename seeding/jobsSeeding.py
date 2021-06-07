import random
from bson.objectid import ObjectId
from datetime import datetime
from datetime import timedelta
import json

data = ' '.join(open("users.json", 'r').readlines())

# Parse JSON into an object with attributes corresponding to dict keys.
x = json.loads(data)

clientIds = []
for obj in x:
    if obj['type'] == 'client':
        clientIds.append(obj['_id'])

x = datetime.now()

id = "609f0d3771507f08887d4553"

jobTitles = [
    "Junior", "Mid Level", "Senior"
]
jobDets = [
    "for university portal", "for a multi-national company", "for a private project"
]
jobNames = [
    "Android developer", "Web developer", "ASIC developer", "Dot Net developer", "iOS developer"
]

descriptions = [
    "designing and developing advanced applications for the Android platform",
    "writing well designed, testable, efficient code by using best software development practices",
    "constructing architectural design models of ASIC, optimizing design according to client specifications, making product design specification (PDS) statements, and collaborating with the central ASIC design team to deliver accurate and competitive ASIC design solutions",
    "creating applications from scratch, configuring existing systems and providing user support",
    "designing and coding the base application, ensuring the quality of the application, fixing application bugs, maintaining the code, and implementing application updates",
    "",
    "ensuring current customers have the right products and services, identifying new markets and customer leads, and pitching prospective customers"
]

experienceLevels = ["Entry level", "Intermediate", "Expert"]
minHourlyRates = [20, 40, 80]
maxHourlyRates = [40, 80, 160]

durations = [
    'More than 6 months',
    '3 to 6 months',
    '1 to 3 months',
    'Less than 1 month'
]

skills = {
    "Android Development": [
        "Java", "Kotlin", "MVVM", "MVC", "Android SDK", "Material Design"
    ],
    "iOS Development": [
        "Swift", "Objective-C", "MVVM", "MVC", "SwiftUI", "Core ML", "Core Data"
    ],
    "Web Development": [
        "Javascript", "HTML", "MVVM", "CSS", "Vue.js", "React.js", "Angular.js"
    ],
    "ASIC": [
        "Verilog", "VHDL", "System Verilog"
    ],
    "Dot Net": [
        "C#", "Xamarin", "Windows Forms"
    ]
}
categories = [
    "Android Development", "Front-End Development", 
    "ASIC", "Dot Net", "iOS Development", 
    "Back-End Development"
]

with open('Jobs.json', 'w') as f:
    f.write("[\n")
    for i in range(20):
        f.write("\t{\n")
        clientId = clientIds[random.randint(0, len(clientIds) - 1)]
        job = random.randint(0, len(jobNames) - 1)
        f.write("\t\t\"skills\": [\n")
        rand = random.randint(1, 3)
        startIndex = random.randint(1, 3)
        for j in range(rand):
            if j < rand - 1:
                index = (startIndex + j) % len(skills[categories[job]])
                f.write("\t\t\t\"{}\",\n".format(
                    skills[categories[job]][index]))
            else:
                index = (startIndex + j) % len(skills[categories[job]])
                f.write("\t\t\t\"{}\"\n".format(
                    skills[categories[job]][index]))
                f.write("\t\t],\n")
        randTitle, randDet = random.randint(
            0, len(jobTitles) - 1), random.randint(0, len(jobDets) - 1)
        randDuration = random.randint(0, len(durations) - 1)
        randDay = random.randint(0, 10)
        randWeek = random.randint(20, 100)
        randHour = random.randint(0, 23)
        randMinute = random.randint(0, 59)
        randSecond = random.randint(0, 59)
        createdAt = x - timedelta(weeks=randWeek, days=randDay,
                                  hours=randHour, minutes=randMinute, seconds=randSecond)
        _id = ObjectId(random.randbytes(12))
        y = str(createdAt)
        zIndex = y.rfind(':') + 7
        for it in range(6 - len(y) - y.rfind(':')):
            y = y + "0"
        y = y[:10] + "T" + y[11:zIndex] + "Z"
        f.write("\t\t\"createdAt\": \"{}\",\n".format(y))
        f.write("\t\t\"_id\": \"{}\",\n".format(_id))
        f.write("\t\t\"headline\": \"{} {} {}\",\n".format(
            jobTitles[randTitle], jobNames[job], jobDets[randDet]))
        f.write("\t\t\"description\": \"We are looking for an {} {} who is highly skilled with {} for a {} project. Your primary focus will be {}.\",\n".format(
            experienceLevels[randTitle], jobNames[job], skills[categories[job]][random.randint(0, len(skills[categories[job]]) - 1)], durations[randDuration], descriptions[job]))
        f.write("\t\t\"category\": \"{}\",\n".format(categories[job]))
        f.write("\t\t\"experience\": \"{}\",\n".format(
            experienceLevels[randTitle]))
        f.write("\t\t\"minHourlyRate\": {},\n".format(
            minHourlyRates[randTitle]))
        f.write("\t\t\"maxHourlyRate\": {},\n".format(
            maxHourlyRates[randTitle]))
        f.write("\t\t\"duration\": \"{}\",\n".format(durations[randDuration]))
        f.write("\t\t\"client\": \"{}\"\n".format(clientId))
        if i != 19:
            f.write("\t},\n")
        else:
            f.write("\t}\n")

    f.write("]\n")
