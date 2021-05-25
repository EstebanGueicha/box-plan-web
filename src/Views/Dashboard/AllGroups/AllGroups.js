import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { GroupCard } from '../GroupCard'
import { NewGroup } from '../ABMGroup/NewGroup'
import { DeleteGroup } from '../ABMGroup/DeleteGroup'
import { AddMember } from '../ABMGroup/ABMMembers/AddMember'
import { DeleteMember } from '../ABMGroup/ABMMembers/DeleteMember'
import './AllGroups.scss'

export const AllGroups = (props) => {
  const { groups, isAdmin, setFetching } = props
  const [deleteGroup, setDeleteGroup] = useState(false)
  const [newGroup, setNewGroup] = useState(false)
  const [deleteGroupModal, setDeleteGroupModal] = useState({
    showModal: false,
    selectedGroup: null,
  })
  const [addMember, setAddMember] = useState({ showModal: false, selectedGroup: null })
  const [deleteMember, setDeleteMember] = useState({ showModal: false, member: null })
  const [fetchingMembers, setFetchingMembers] = useState(false)

  return (
    <Container className="all-groups-container">
      {isAdmin ? (
        <div className="all-groups-buttons">
          <Button onClick={() => setNewGroup((prev) => !prev)}>+ Agregar Grupo</Button>
          <Button variant="outline-primary" onClick={() => setDeleteGroup((prev) => !prev)}>
            {deleteGroup ? 'Me arrepenti' : 'Eliminar Grupo '}
          </Button>
        </div>
      ) : null}
      {groups && groups.length
        ? groups.map((item, index) => (
            <GroupCard
              key={index}
              item={item}
              deleteGroup={deleteGroup}
              isAdmin={isAdmin}
              setAddMember={setAddMember}
              setDeleteMember={setDeleteMember}
              setDeleteGroup={setDeleteGroup}
              setDeleteGroupModal={setDeleteGroupModal}
              fetchingMembers={fetchingMembers}
              setFetching={setFetching}
            />
          ))
        : null}
      {newGroup ? (
        <NewGroup newGroup={newGroup} setNewGroup={setNewGroup} setFetching={setFetching} />
      ) : null}
      {deleteGroupModal.showModal ? (
        <DeleteGroup
          deleteGroupModal={deleteGroupModal}
          setDeleteGroupModal={setDeleteGroupModal}
          setFetching={setFetching}
        />
      ) : null}
      {addMember.showModal ? (
        <AddMember
          addMember={addMember}
          setAddMember={setAddMember}
          setFetchingMembers={setFetchingMembers}
        />
      ) : null}
      {deleteMember.showModal ? (
        <DeleteMember
          deleteMember={deleteMember}
          setDeleteMember={setDeleteMember}
          setFetchingMembers={setFetchingMembers}
        />
      ) : null}
    </Container>
  )
}
