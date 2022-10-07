from pyteal import *

global_teacher = Bytes('teacher') # byteslice
local_diploma = Bytes('diploma') # byteslice
local_calification = Bytes('calification') # uint64

def approval():
  # Code block invoked during contract initialization.
  # Sets teacher to be the sender (creator) of this smart contract.
  init_contract = Seq([
    App.globalPut(global_teacher, Txn.sender()),
    Return(Int(1)),
  ])

  # Checks if the sender of the current transaction invoking this
  # smart contract is the current teacher.
  is_teacher = Txn.sender() == App.globalGet(global_teacher)

  # Code block invoked during diploma issuance.
  diploma_receiver = Txn.accounts[1]

  register_diploma = Seq([
    Assert(is_teacher),
    App.localPut(diploma_receiver, local_diploma, Txn.application_args[1]),
    App.localPut(diploma_receiver, local_calification, Btoi(Txn.application_args[2])),
    Return(Int(1)),
  ])

  # Code block invoked during teacher change.
  new_teacher = Txn.accounts[1]

  change_teacher = Seq([
    Assert(is_teacher),
    App.globalPut(global_teacher, new_teacher),
    Return(Int(1)),
  ])

  # Controls execution flow of the smart contract
  program = Cond(
    [Txn.application_id() == Int(0), init_contract],
    [Txn.on_completion() == OnComplete.OptIn, Return(Int(1))],
    [Txn.on_completion() == OnComplete.CloseOut, Return(Int(1))],
    [Txn.application_args[0] == Bytes('register_diploma'), register_diploma],
    [Txn.application_args[0] == Bytes('change_teacher'), change_teacher],
  )

  return program

def clear():
  return Return(Int(1))

if __name__ == '__main__':

  import os

  path = os.path.dirname(os.path.abspath(__file__))

  with open(os.path.join(path, 'approval.teal'), 'w') as f:
    f.write(compileTeal(approval(), mode=Mode.Application, version=6))

  with open(os.path.join(path, 'clear.teal'), 'w') as f:
    f.write(compileTeal(clear(), mode=Mode.Application, version=6))