import React from 'react'
import { useModal } from '../../hooks/useModal'
import PlantsDetailModal from './components/PlantsDetail/PlantsDetailModal'

const PlantsManagerment = () => {
  const { isModalVisible, openModal, closeModal } = useModal()
  const handleDetailPlant = () => {
    openModal(true)
  }
  return (
    <>
      <PlantsDetailModal isOpen={isModalVisible} onClose={closeModal} />
      <button onClick={handleDetailPlant}>click</button>
    </>
  )
}

export default PlantsManagerment
