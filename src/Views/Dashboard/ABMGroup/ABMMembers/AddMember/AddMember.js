import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import { Button, Modal, Spinner } from 'react-bootstrap'
import groupsService from '../../../../../Service/groups'

export const AddMember = (props) => {
  const { addMember, setAddMember, setFetchingMembers } = props
  const { selectedGroup, showModal } = addMember
  const [searchMembers, setSearchMembers] = useState([])
  const [members, setMembers] = useState([])
  const [newMembers, setNewMembers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getGroupMembers = async (groupId) => {
      try {
        const { athletes } = await groupsService.getGroupMembers({ groupID: groupId })
        setMembers(athletes)
      } catch (err) {
        console.log(err)
      }
    }
    if (selectedGroup && showModal) {
      getGroupMembers(selectedGroup.id)
    }
  }, [selectedGroup, showModal])

  const loadOptions = async (searchValue, callback) => {
    try {
      if (searchValue) {
        if (searchValue.length % 2 === 0) {
          const results = await groupsService.searchMembers({
            key: searchValue,
            groupID: selectedGroup.id,
          })
          setSearchMembers(results)
          callback(
            results.map((member) => ({
              value: member.id,
              label: member.name + ' , ' + member.mail,
            })),
          )
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const membersHasChanged = (items) => {
    const newItems = items.filter((item) => !members.some((member) => item.value === member.id))
    setNewMembers(newItems)
  }

  const sendData = async () => {
    try {
      setLoading(true)
      const members = newMembers.map((m) => m.value)
      await groupsService.addMembers({ groupID: selectedGroup.id, members })
      setLoading(false)
      setAddMember({ showModal: false, selectedGroup: null })
      setFetchingMembers((prev) => !prev)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setAddMember({ showModal: false, selectedGroup: null })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar miembro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AsyncSelect
            options={searchMembers}
            placeholder="Nombre del atleta"
            isMulti
            loadOptions={loadOptions}
            onChange={(opt) => membersHasChanged(opt)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setAddMember({ showModal: false, selectedGroup: null })}
            disabled={loading}
          >
            Cerrar
          </Button>
          <Button variant="primary" onClick={sendData} disabled={loading}>
            {loading ? (
              <Spinner
                animation="border"
                role="status"
                size="sm"
                style={{ marginRight: '0.5rem' }}
              />
            ) : null}
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
