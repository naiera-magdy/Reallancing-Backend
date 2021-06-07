import random
from datetime import datetime
from datetime import timedelta
import json
from types import SimpleNamespace

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
jobIdsIndeces = []
for index, obj in enumerate(jobsJson):
    jobIds.append(obj['_id'])
    jobIdsIndeces.append(index)


x = datetime.now()

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

with open('Proposals.json', 'w') as f:
    f.write("[\n")
    for i in range(20):
        f.write("\t{\n")
        jobIndex = random.randint(0, len(jobIds) - 1)
        jobId = jobIds[jobIndex]
        userId = userIds[random.randint(0, len(userIds) - 1)]
        f.write("\t\t\"user\": \"{}\",\n".format(userId))
        f.write("\t\t\"job\": \"{}\",\n".format(jobId))
        randDay = random.randint(0, 10)
        randWeek = random.randint(0, 20)
        randHour = random.randint(0, 23)
        randMinute = random.randint(0, 59)
        randSecond = random.randint(0, 59)
        y = str(x - timedelta(weeks=randWeek, days=randDay,
                              hours=randHour, minutes=randMinute, seconds=randSecond))
        zIndex = y.rfind(':') + 7
        for it in range(6 - len(y) - y.rfind(':')):
            y = y + "0"
        y = y[:10] + "T" + y[11:zIndex] + "Z"
        rand1, rand4 = random.randint(0, 3), random.randint(0, 3)
        rand2, rand3 = random.randint(0, 2), random.randint(0, 2)
        f.write("\t\t\"coverLetter\": \"{} {} {} {}\",\n".format(
            coverLetterPart1[rand1], coverLetterPart2[rand2], coverLetterPart3[rand3], coverLetterPart4[rand4]))
        f.write("\t\t\"proposedHourlyRate\": {},\n".format(random.randint(jobsJson[jobIndex]['minHourlyRate'], jobsJson[jobIndex]['maxHourlyRate'])))
        f.write("\t\t\"createdAt\": \"{}\"\n".format(y))
        if i != 19:
            f.write("\t},\n")
        else:
            f.write("\t}\n")

    f.write("]\n")
