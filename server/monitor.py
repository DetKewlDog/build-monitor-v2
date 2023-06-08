import os
import time
from threading import Thread

os.chdir(os.path.dirname(__file__))

PATH = os.getenv('LOCALAPPDATA') + 'Low\\Forgescape\\Forgescape\\Player.log'

buffer = []


def t_monitor():
    content = ""
    while True:
        time.sleep(0.5)
        with open(PATH, "r") as f:
            newContent = f.read()
        if content == newContent:continue
        diff = newContent.replace(content, '')
        if diff == '':
            os.system('cls')
        else:
            buffer.append(diff)
        content = newContent

def init():
    Thread(target=t_monitor).start()

def get_msg():
    if len(buffer) == 0:
        return ''
    return buffer.pop(0)