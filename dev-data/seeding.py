import random
from sys import argv
from bson.objectid import ObjectId
from datetime import datetime
from datetime import timedelta
import json

jobTitles = [
    "Junior", "Mid Level", "Senior"
]
jobDets = [
    "for university portal", "for a multi-national company", "for a private project"
]
jobNames = [
    "Android developer", "Front-End developer", "ASIC developer", "Dot Net developer", "iOS developer", "Back-End Developer"
]

descriptions = [
    "designing and developing advanced applications for the Android platform",
    "writing well designed, testable, efficient code by using best software development practices",
    "constructing architectural design models of ASIC, optimizing design according to client specifications, making product design specification (PDS) statements, and collaborating with the central ASIC design team to deliver accurate and competitive ASIC design solutions",
    "creating applications from scratch, configuring existing systems and providing user support",
    "designing and coding the base application, ensuring the quality of the application, fixing application bugs, maintaining the code, and implementing application updates",
    "writing the web services and APIs used by front-end developers and mobile application developers"
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

skillsDict = {}

skills = {
    "Android Development": [
        "Java", "Kotlin", "MVVM", "MVC", "Android SDK", "Material Design"
    ],
    "iOS Development": [
        "Swift", "Objective-C", "MVVM", "MVC", "SwiftUI", "Core ML", "Core Data"
    ],
    "Front-End Development": [
        "Javascript", "HTML", "MVVM", "CSS", "Vue.js", "React.js", "Angular.js"
    ],
    "ASIC": [
        "Verilog", "VHDL", "System Verilog"
    ],
    "Dot Net": [
        "C#", "Xamarin", "Windows Forms"
    ],
    "Back-End Development": [
        "Javascript", "Node", "Php", "Java", "Ruby on rails", "Python", "Flask"
    ]
}

categories = [
    "Android Development", "Front-End Development",
    "ASIC", "Dot Net", "iOS Development",
    "Back-End Development"
]


def seedJobs():

    data = ' '.join(open("users.json", 'r').readlines())

    # Parse JSON into an object with attributes corresponding to dict keys.
    x = json.loads(data)

    clientIds = []
    for obj in x:
        if obj['type'] == 'client':
            clientIds.append(obj['_id'])

    x = datetime.now()

    with open('jobs.json', 'w') as f:
        f.write("[\n")
        for i in range(80):
            f.write("\t{\n")
            clientId = clientIds[random.randint(0, len(clientIds) - 1)]
            job = random.randint(0, len(jobNames) - 1)
            f.write("\t\t\"skills\": [\n")
            rand = random.randint(2, 3)
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
            #f.write("\t\t\"_id\": \"{}\",\n".format(_id))
            f.write("\t\t\"createdAt\": \"{}\",\n".format(y))
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
            f.write("\t\t\"clientId\": \"{}\"\n".format(clientId))
            if i != 79:
                f.write("\t},\n")
            else:
                f.write("\t}\n")

        f.write("]\n")


def seedCategories():
    with open('categories.json', 'w') as f:
        f.write("[\n")
        for i, category in enumerate(categories):
            _id = ObjectId(random.randbytes(12))
            f.write("\t{\n")
            #f.write("\t\t\"_id\": \"{}\",\n".format(_id))
            f.write("\t\t\"name\": \"{}\"\n".format(category))
            if i != len(categories) - 1:
                f.write("\t},\n")
            else:
                f.write("\t}\n")
        f.write("]\n")

jobDets = [
    "for university portal", "for a multi-national company", "for a private project"
]
jobNames = [
    "Android developer", "Web developer", "ASIC developer", "Dot Net developer", "iOS developer"
]

coverLetterPart1 = [
    "Hello,",
    "Hi,",
    "Hey there,",
    "Howdy,"
]

coverLetterPart2 = [
    "I would really love to work on this project.",
    "I am extremely excited about this job.",
    "This project is extremely appealing to me."
]

coverLetterPart3 = [
    "I would love the chance to further discuss the position and what skills I'd bring to the job.",
    "Thank you for your time. I look forward to speaking with you about my in-depth experience and passion.",
    "With my extensive accounts payable experience, I believe I can quickly get up to speed in this position."
]

coverLetterPart4 = [
    "Best regards.",
    "Sincerely.",
    "Cheers.",
    "Thank you for your consideration."
]

def seedProposals():
    data = ' '.join(open("users.json", 'r').readlines())

    # Parse JSON into an object with attributes corresponding to dict keys.
    x = json.loads(data)

    userIds = []
    for obj in x:
        if obj['type'] == 'freelancer':
            userIds.append(obj['_id'])

    data = ' '.join(open("Jobs.json", 'r').readlines())

    jobsJson = json.loads(data)

    jobIds = []
    jobDates = []
    jobIdsIndeces = []
    for index, obj in enumerate(jobsJson):
        jobIds.append(obj['_id'])
        jobDates.append(obj['createdAt'])
        jobIdsIndeces.append(index)

    with open('proposals.json', 'w') as f:
        f.write("[\n")
        for i in range(100):
            f.write("\t{\n")
            jobIndex = random.randint(0, len(jobIds) - 1)
            jobId = jobIds[jobIndex]
            userId = userIds[random.randint(0, len(userIds) - 1)]
            f.write("\t\t\"user\": \"{}\",\n".format(userId))
            f.write("\t\t\"job\": \"{}\",\n".format(jobId))
            rand1, rand4 = random.randint(0, 3), random.randint(0, 3)
            rand2, rand3 = random.randint(0, 2), random.randint(0, 2)
            f.write("\t\t\"coverLetter\": \"{} {} {} {}\",\n".format(
                coverLetterPart1[rand1], coverLetterPart2[rand2], coverLetterPart3[rand3], coverLetterPart4[rand4]))
            f.write("\t\t\"proposedHourlyRate\": {},\n".format(random.randint(jobsJson[jobIndex]['minHourlyRate'], jobsJson[jobIndex]['maxHourlyRate'])))
            f.write("\t\t\"createdAt\": \"{}\"\n".format(jobDates[jobIndex]))
            if i != 99:
                f.write("\t},\n")
            else:
                f.write("\t}\n")

        f.write("]\n")

def seedSkills():

    data = ' '.join(open("categories.json", 'r').readlines())
    # Parse JSON into an object with attributes corresponding to dict keys.
    x = json.loads(data)

    for category in categories:
        for skill in skills[category]:
            if skill in skillsDict:
                for obj in x:
                    if obj['name'] == category:
                        skillsDict[skill].append(obj['_id'])
            else:
                skillsDict[skill] = []
                for obj in x:
                    if obj['name'] == category:
                        skillsDict[skill].append(obj['_id'])

    with open('skills.json', 'w') as f:
        f.write("[\n")
        for index, skill in enumerate(skillsDict):
            f.write("\t{\n")
            f.write("\t\t\"name\": \"{}\",\n".format(skill))
            f.write("\t\t\"categories\": [\n")
            for i, category in enumerate(skillsDict[skill]):
                f.write("\t\t\t{\n")
                f.write("\t\t\t\"_id\": \"{}\"\n".format(category))
                if i != len(skillsDict[skill]) - 1:
                    f.write("\t\t\t},\n")
                else:
                    f.write("\t\t\t}\n")
            f.write("\t\t]\n")
            if index != len(skillsDict) - 1:
                f.write("\t},\n")
            else:
                f.write("\t}\n")
        f.write("]\n")

if argv[1] == '1':
    seedCategories()
    seedJobs()
else:
    seedSkills()
    seedProposals()