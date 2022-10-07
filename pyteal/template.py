from pyteal import *

# recommended way
def approval():
  return Approve()

def clear():
  return Approve()

if __name__ == '__main__':

  import os

  path = os.path.dirname(os.path.abspath(__file__))

  with open(os.path.join(path, 'approval.teal'), 'w') as f:
    f.write(compileTeal(approval(), mode=Mode.Application, version=6))
    
  with open(os.path.join(path, 'clear.teal'), 'w') as f:
    f.write(compileTeal(clear(), mode=Mode.Application, version=6))