import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import { Button, Modal } from 'react-bootstrap'
import groupsService from '../../../../../Service/groups'

export const AddMember = (props) => {
  const { addMember, setAddMember, selectedGroup } = props
  const [searchMembers, setSearchMembers] = useState([])
  const [members, setMembers] = useState([])
  const [newMembers, setNewMembers] = useState([])

  useEffect(() => {
    const getGroupMembers = async (groupId) => {
      try {
        const members = await groupsService.getGroupMembers({ groupID: groupId })
        setMembers(members)
      } catch (err) {
        console.log(err)
      }
    }
    if (selectedGroup && addMember) {
      getGroupMembers(selectedGroup.id)
    }
  }, [selectedGroup, addMember])

  const loadOptions = async (searchValue, callback) => {
    try {
      if (searchValue.length % 2 === 0) {
        const results = await groupsService.searchMembers({ key: searchValue, groupID: selectedGroup.id })
        console.log(results)
        if (results.length) {
          setSearchMembers(results)
          const newItems = results.filter(item => !members.some(member => item.id === member.id))
          const items = newItems.map(member => { return { value: member.id, label: member.name + ' , ' + member.mail } })
          callback(items)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const membersHasChanged = (items) => {
    const newItems = items.filter(item => !members.some(member => item.value === member.id))
    const newMember = searchMembers.filter(member => items.some(item => item.value === member.id))

    if (newItems.length) {
      const news = newMembers.concat(newMember)
      const groupMembers = members.concat(newMembers)
      setMembers(groupMembers)
      setNewMembers(news)
    }
  }
  console.log(newMembers)
  return (
    <>
      <Modal show={addMember} onHide={() => setAddMember(prev => !prev)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar miembro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AsyncSelect
            options={searchMembers}
            placeholder='Nombre del atleta'
            isMulti
            loadOptions={loadOptions}
            onChange={opt => membersHasChanged(opt)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={() => setAddMember(prev => !prev)}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => setAddMember(prev => !prev)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
